import React, { useEffect, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { PaymentsLayout } from '../PaymentsLayout';
import { PaymentTile } from '../components/PaymentTile';
import { ScrollView } from '@components-new/ui/scrool-view';
import { Header } from '@components-new/header';
import { Button } from '@components-new/button';
import { $color_primary } from '@styles/colors';
import { usePayments } from '@hooks/usePayments';
import { lessonsService } from '@services/lessons.service';
import { OverduesTile } from '../components/OverduesTile';
import { PaymentsTabParamList } from '@components-new/ui/navbar';
import { Tile } from '@components-new/tile';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getMonth, getYear } from 'date-fns';
import { useOverdues } from '@hooks/useOverdues';
import { useModalContext } from '@contexts/modalContext';
import { Payment } from '@model';
import { PaymentModal } from '@components-new/modals/PaymentModal';
import { useConfirmModal } from '@contexts/confirmModalContext';
import { getFullName } from '@utils/utils';
import { paymentsService } from '@services/payments.service';
import { useAlert } from '@contexts/AlertContext';
import { setLoadingPage } from '@contexts/NavbarReducer';
import { DEFAULT, STYLES } from '@styles/theme';

export const PaymentsSummary: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'Summary'>
> = props => {
    const { navigation, route } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [summaryData, setSummaryDate] = useState<{
        income: number;
        paymentsNumber: number;
        lessonsNumber: number;
    }>({
        income: 0,
        paymentsNumber: 0,
        lessonsNumber: 0,
    });

    const isFocused = useIsFocused();
    const { payments, isLoading: paymentsLoading, fetchPayments } = usePayments();
    const { overdueLessons } = useOverdues();
    const { setIsOpen, setModalBody } = useModalContext();
    const { openModal } = useConfirmModal();
    const { showAlert } = useAlert();

    const loadData = async () => {
        setIsLoading(true);
        fetchPayments();
        const todayDate = new Date();

        const month = getMonth(todayDate) + 1;
        const year = getYear(todayDate);

        const payments = await paymentsService.getList({
            month: month,
            year: year,
        });
        const lessons = await lessonsService.getLessons({
            month: month,
            year: year,
        });

        setSummaryDate({
            lessonsNumber: lessons.length,
            income: payments.map(v => v.value).reduce((acc, v) => acc + v, 0),
            paymentsNumber: payments.length,
        });
        setIsLoading(false);
    };

    const handlePaymentDelete = async (id: number) => {
        try {
            await paymentsService.delete(id);
            setIsOpen(false);
            loadData();
            showAlert({
                message: 'Usunięto',
                severity: 'danger',
            });
        } catch (e) {
            showAlert({
                message: 'Błąd',
                severity: 'danger',
            });
        }
    };

    const handleShowEventModal = (payment: Payment) => {
        setModalBody(
            <PaymentModal
                payment={payment}
                goToEditForm={() => {
                    console.log(payment)
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

    useEffect(() => {
        if (isFocused) {
            loadData();
        }
    }, [isFocused]);

    if (isFocused && !isLoading) {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1000);
    }

    return (
        <PaymentsLayout {...props}>
            <ScrollView styles={{paddingHorizontal: DEFAULT.SPACING.M}}>
                <Header
                    title="Bieżący miesiąc"
                    isCentered
                    noBackground
                    size='s'
                />
                <View style={[
                    STYLES.tile,
                    {
                        width: '100%',
                        height: 100
                    }
                ]}>
                    <View style={{ padding: 5 }}>
                        <View style={styles.fullWidthRow}>
                            <Text style={styles.headText}>Zarobki</Text>
                            <Text>{summaryData.income ? `${summaryData.income}zł` : '-'}</Text>
                        </View>
                        <View style={styles.fullWidthRow}>
                            <Text style={styles.headText}>Liczba płatności</Text>
                            <Text>{summaryData.paymentsNumber}</Text>
                        </View>
                        <View style={styles.fullWidthRow}>
                            <Text style={styles.headText}>Liczba zajęć</Text>
                            <Text>{summaryData.lessonsNumber}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 20 }} />
                <OverduesTile
                    lessons={overdueLessons}
                    isLoading={isLoading}
                    navigation={navigation}
                />
                <View style={{ height: 20 }} />
                <Header
                    title={payments.length > 5 ? 'Ostatnie 5 płatności' : 'Ostatnie płatności'}
                    isCentered
                    noBackground
                    size='s'
                />
                {isLoading ? (
                    <ActivityIndicator size="large" color={$color_primary} />
                ) : payments.length ? (
                    <View style={{gap: 10, width: '100%'}}>
                        {payments
                            .slice(-5)
                            .reverse()
                            .map(p => (
                                <PaymentTile
                                    key={p.id}
                                    payment={p}
                                    onClick={() => handleShowEventModal(p)}
                                />
                            ))}
                    </View>
                ) : (
                    <Text>Brak płatności</Text>
                )}
                <View style={{ marginTop: 10, height: 40 }}>
                    <Button
                        onClick={() => navigation.jumpTo('History')}
                        icon="diagram"
                        label="Pełna historia płatności"
                    />
                </View>
            </ScrollView>
        </PaymentsLayout>
    );
};

const styles = EStyleSheet.create({
    headText: {
        ...STYLES.h3,
        width: '50%',
        textAlign: 'right',
        paddingRight: 10,
    },
    fullWidthRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
});
