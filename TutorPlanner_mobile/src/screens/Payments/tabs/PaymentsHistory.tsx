import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TextStyle, View } from 'react-native';
import { PaymentsLayout } from '../PaymentsLayout';
import { PaymentTile } from '../components/PaymentTile';
import { Button } from '@components/button';
import { addMonths, compareDesc, getMonth, getYear, isBefore, isSameYear } from 'date-fns';
import EStyleSheet from 'react-native-extended-stylesheet';
import { usePayments } from '@hooks/usePayments';
import { OverduesTile } from '../components/OverduesTile';
import { useUnpaidLessons } from '@hooks/useUnpaidLessons';
import { PaymentsTabParamList } from '@components/ui/navbar';
import { useModalContext } from '@contexts/modalContext';
import { PaymentModal } from '@components/modals/PaymentModal';
import { useAlert } from '@contexts/AlertContext';
import { getFullName } from '@utils/utils';
import { paymentsService } from '@services/payments.service';
import { useConfirmModal } from '@contexts/confirmModalContext';
import { getMonthName } from '@screens/Calendar/components/calendar/utils';
import { $border_width } from '@styles/global';
import { PaymentsList } from '../components/PaymentsList';
import { Payment } from '@model';
import { PageNavigation } from '../components/PageNavigation';
import { lessonsService } from '@services/lessons.service';
import { useQuery } from '@tanstack/react-query';

const BOLD_UNDERLINE_TEXT_STYLES: TextStyle = {
    fontWeight: 'bold',
    borderBottomWidth: 1,
};

export const PaymentsHistory: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'History'>
> = props => {
    const { navigation, route } = props;
    const [controlDate, setControlDate] = useState(new Date());
    const [isFutureMonth, setIsFutureMonth] = useState(false);
    //const [isLoading, setIsLoading] = useState(false);
    const today = useMemo(() => new Date(), []);
    // In app we use 1-12 month system
    const month = getMonth(controlDate) + 1;
    const year = getYear(controlDate);

    const { setIsOpen, setModalBody } = useModalContext();
    const { openModal } = useConfirmModal();
    const { showAlert } = useAlert();

    const unpaidLessonsQuery = useQuery({
        queryKey: ['unpaid-lessons', { month, year }],
        queryFn: () =>
            lessonsService.getNotPaidLessonsByMonthAndYear({
                month: month,
                year: year,
            }),
    });
    const lessonsQuery = useQuery({
        queryKey: ['lessons', { month, year }],
        queryFn: () =>
            lessonsService.getLessons({
                month: month,
                year: year,
            }),
    });
    const paymentsQuery = useQuery({
        queryKey: ['payments', { month, year }],
        queryFn: () =>
            paymentsService.getList({
                month: month,
                year: year,
            }),
    });

    const isLoading =
        unpaidLessonsQuery.isLoading || lessonsQuery.isLoading || paymentsQuery.isLoading;
    const payments = paymentsQuery.data || [];
    const currentIncome = payments.reduce((acc, p) => acc + p.value, 0);
    const expectedIncome = lessonsQuery.data?.reduce((acc, lesson) => acc + lesson.price, 0) || 0;

    useEffect(() => {
        if (
            controlDate.getFullYear() < today.getFullYear() ||
            (controlDate.getFullYear() === today.getFullYear() &&
                controlDate.getMonth() <= today.getMonth())
        ) {
            setIsFutureMonth(false);
        } else {
            setIsFutureMonth(true);
        }
    }, [controlDate]);

    const handleMonthChange = async (num: number) => {
        setControlDate(addMonths(controlDate, num));
    };

    const handlePaymentDelete = async (id: number) => {
        try {
            await paymentsService.delete(id);
            setIsOpen(false);
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

    const handleOpenPaymentModal = (payment: Payment) => {
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
                    <PageNavigation
                        onPrev={() => {
                            handleMonthChange(-1);
                        }}
                        onNext={() => {
                            handleMonthChange(1);
                        }}
                        title={`${getMonthName(month)} ${!isSameYear(controlDate, new Date()) ? year : ''}`}
                    />
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
                        {isLoading ? (
                            <Text
                                style={BOLD_UNDERLINE_TEXT_STYLES}
                            >
                                Ładowanie...
                            </Text>
                        ) : (
                            <>
                                <Text
                                    style={BOLD_UNDERLINE_TEXT_STYLES}
                                >
                                    {currentIncome
                                        ? `Zarobki: ${currentIncome} zł`
                                        : 'Brak płatności'}
                                </Text>
                                <Text
                                    style={BOLD_UNDERLINE_TEXT_STYLES}
                                >
                                    Przewidywania: {expectedIncome}
                                    zł
                                </Text>
                            </>
                        )}
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            alignItems: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <PaymentsList
                            isLoading={isLoading}
                            payments={payments}
                            onSelect={handleOpenPaymentModal}
                        />
                    </View>
                    {isFutureMonth ||
                        (!unpaidLessonsQuery.isLoading && (
                            <OverduesTile
                                lessons={unpaidLessonsQuery.data?.filter(lesson =>
                                    isBefore(lesson.date, new Date()),
                                )}
                                isLoading={isLoading}
                                navigation={navigation}
                                hasHeader={false}
                            />
                        ))}
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
