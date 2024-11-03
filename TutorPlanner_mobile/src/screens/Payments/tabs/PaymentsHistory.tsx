import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { PaymentsLayout } from '../PaymentsLayout';
import { PaymentTile } from '../components/PaymentTile';
import { Button } from '@components/button';
import { MONTHS_NOMINATIVE } from 'src/screens/Calendar/components/calendar';
import { addMonths, getMonth, getYear, isBefore, isSameYear } from 'date-fns';
import EStyleSheet from 'react-native-extended-stylesheet';
import { $color_primary } from '@styles/colors';
import { usePayments } from '@hooks/usePayments';
import { OverduesTile } from '../components/OverduesTile';
import { useUnpaidLessons } from '@hooks/useUnpaidLessons';
import { PaymentsTabParamList } from '@components/ui/navbar';
import { PaymentDTO } from '@model';
import { useModalContext } from '@contexts/modalContext';
import { PaymentModal } from '@components/modals/PaymentModal';
import { useAlert } from '@contexts/AlertContext';
import { getFullName } from '@utils/utils';
import { paymentsService } from '@services/payments.service';
import { useConfirmModal } from '@contexts/confirmModalContext';
import { LoadWrapper } from '@components/loader';

export const PaymentsHistory: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'History'>
> = props => {
    const { navigation, route } = props;
    const [controlDate, setControlDate] = useState(new Date());
    const [isFutureMonth, setIsFutureMonth] = useState(false);
    const today = useMemo(() => new Date(), []);
    const month = getMonth(controlDate);
    const year = getYear(controlDate);

    const { setIsOpen, setModalBody } = useModalContext();
    const { openModal } = useConfirmModal();
    const { showAlert } = useAlert();

    const {
        unpaidLessons,
        isLoading: unpaidLessonsLoading,
        fetchData: fetchUnpaidLessons,
    } = useUnpaidLessons({
        month: month,
        year: year,
    });
    const { payments, isLoading, fetchPayments } = usePayments({
        month: month,
        year: year,
    });

    const loadData = () => {
        fetchPayments({
            month: month + 1,
            year: year,
        });
        if (
            controlDate.getFullYear() < today.getFullYear() ||
            (controlDate.getFullYear() === today.getFullYear() &&
                controlDate.getMonth() <= today.getMonth())
        ) {
            fetchUnpaidLessons({
                month: month + 1,
                year: year,
            });
            setIsFutureMonth(false);
        } else {
            setIsFutureMonth(true);
        }
    };

    useEffect(() => {
        loadData();
    }, [controlDate]);

    const handleMonthChange = async (num: number) => {
        setControlDate(addMonths(controlDate, num));
    };

    const handlePaymentDelete = async (id: number) => {
        try {
            await paymentsService.delete(id);
            setIsOpen(false);
            loadData();
            showAlert({
                message: 'Usunięto',
                severity: 'info',
            });
        } catch (e) {
            showAlert({
                message: 'Błąd',
                severity: 'danger',
            });
        }
    };

    const handleOpenPaymentModal = (payment: PaymentDTO) => {
        setModalBody(
            <PaymentModal
                payment={payment}
                goToEditForm={() => {
                    navigation.navigate('Edit', {
                        payment: payment,
                    });
                }}
                goToStudentProfile={() => {
                    navigation.getParent()?.navigate('Students', {
                        screen: 'Profile',
                        params: {
                            studentId: payment.student.id,
                        },
                    });
                }}
                onDelete={() => {
                    openModal({
                        message: `Czy na pewno chcesz usunąć płatność ${getFullName(payment.student)}?`,
                        onConfirm: () => handlePaymentDelete(payment.id),
                    });
                }}
            />,
        );
        setIsOpen(true);
    };

    return (
        <PaymentsLayout {...props}>
            <View
                style={{
                    paddingHorizontal: 10,
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Button
                        icon="arrowLeft"
                        type="icon-button"
                        hasShadow={false}
                        severity="warning"
                        onClick={() => {
                            handleMonthChange(-1);
                        }}
                    />
                    <View style={styles.control_text}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {MONTHS_NOMINATIVE[month]}{' '}
                            {!isSameYear(controlDate, new Date()) && year}
                        </Text>
                    </View>
                    <Button
                        icon="arrowRight"
                        type="icon-button"
                        hasShadow={false}
                        severity="warning"
                        onClick={() => {
                            handleMonthChange(1);
                        }}
                    />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            alignItems: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <LoadWrapper loading={!isLoading} size="large">
                            {payments.length ? (
                                payments.map(p => (
                                    <PaymentTile
                                        key={p.id}
                                        payment={p}
                                        onClick={() =>
                                            handleOpenPaymentModal(p)
                                        }
                                    />
                                ))
                            ) : (
                                <Text>Brak płatności</Text>
                            )}
                        </LoadWrapper>
                    </View>
                    {isFutureMonth || (
                        <OverduesTile
                            lessons={unpaidLessons.filter(lesson =>
                                isBefore(lesson.date, new Date()),
                            )}
                            isLoading={unpaidLessonsLoading}
                            navigation={navigation}
                        />
                    )}
                </ScrollView>
            </View>
        </PaymentsLayout>
    );
};

const styles = EStyleSheet.create({
    control_text: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: 40,
        borderWidth: 1,
        borderColor: '$color_black',
        borderRadius: 10,
        backgroundColor: '$color_white',
        paddingHorizontal: 10,
    },
});
