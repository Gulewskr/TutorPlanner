import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { PaymentsLayout } from '../PaymentsLayout';
import { PaymentTile } from '../components/PaymentTile';
import { Button } from '@components/button';
import {
    addMonths,
    compareDesc,
    getMonth,
    getYear,
    isBefore,
    isSameYear,
} from 'date-fns';
import EStyleSheet from 'react-native-extended-stylesheet';
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
import { getMonthName } from '@screens/Calendar/components/calendar/utils';
import { $border_width } from '@styles/global';

export const PaymentsHistory: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'History'>
> = props => {
    const { navigation, route } = props;
    const [controlDate, setControlDate] = useState(new Date());
    const [isFutureMonth, setIsFutureMonth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const today = useMemo(() => new Date(), []);
    // In app we use 1-12 month system
    const month = getMonth(controlDate) + 1;
    const year = getYear(controlDate);

    const { setIsOpen, setModalBody } = useModalContext();
    const { openModal } = useConfirmModal();
    const { showAlert } = useAlert();

    const {
        unpaidLessons,
        fetchData: fetchUnpaidLessons,
    } = useUnpaidLessons({
        month: month,
        year: year,
    });
    const { payments, fetchPayments } = usePayments({
        month: month,
        year: year,
    });

    const loadData = () => {
        fetchPayments({
            month: month,
            year: year,
        });
        if (
            controlDate.getFullYear() < today.getFullYear() ||
            (controlDate.getFullYear() === today.getFullYear() &&
                controlDate.getMonth() <= today.getMonth())
        ) {
            fetchUnpaidLessons({
                month: month,
                year: year,
            });
            setIsFutureMonth(false);
        } else {
            setIsFutureMonth(true);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 250);
    };

    useEffect(() => {
        loadData();
    }, [controlDate]);

    const handleMonthChange = async (num: number) => {
        setControlDate(addMonths(controlDate, num));
        setIsLoading(true);
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
                        width: '100%',
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
                                {getMonthName(month)}{' '}
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
                    <View
                        style={{
                            display: 'flex',
                            alignContent: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 20,
                            width: '100%',
                            marginBottom: 10,
                        }}
                    >
                        {isLoading ?
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        borderBottomWidth: 1,
                                    }}
                                >
                                    Ładowanie...
                                </Text>
                         : 
                         <>
                         {payments.length ? (
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        borderBottomWidth: 1,
                                    }}
                                >
                                    Przychody:{' '}
                                    {payments.reduce(
                                        (acc, v) => acc + v.price,
                                        0,
                                    )}
                                    zł
                                </Text>
                                /*
                                TODO dodać ilość lekcji
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        borderBottomWidth: 1,
                                    }}
                                >
                                    Lekcje:  
                                </Text>*/
                        ) : (
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    borderBottomWidth: 1,
                                }}
                            >
                                Brak płatności
                            </Text>
                        )}
                        {unpaidLessons.length ? (
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    borderBottomWidth: 1,
                                }}
                            >
                                Zaległości: {unpaidLessons.length}
                            </Text>
                        ) : (
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    borderBottomWidth: 1,
                                }}
                            >
                                Brak Zaległości
                            </Text>
                        )}
                        </>
                    }
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            alignItems: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <LoadWrapper loading={isLoading} size="large">
                            {payments.sort((a, b) => compareDesc(a.date, b.date))
                                    .map(p => (
                                        <PaymentTile
                                            key={p.id + 1}
                                            payment={p}
                                            onClick={() =>
                                                handleOpenPaymentModal(p)
                                            }
                                        />
                                    ))}
                        </LoadWrapper>
                    </View>
                    {isFutureMonth || (
                        <OverduesTile
                            lessons={unpaidLessons.filter(lesson =>
                                isBefore(lesson.date, new Date()),
                            )}
                            isLoading={isLoading}
                            navigation={navigation}
                            hasHeader={false}
                        />
                    )}
                    <View
                        style={{
                            height: 200,
                        }}
                    />
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
        borderWidth: $border_width,
        borderColor: '$color_black',
        borderRadius: 10,
        backgroundColor: '$color_white',
        paddingHorizontal: 10,
    },
});
