import React, { useEffect, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { PaymentsLayout } from '../PaymentsLayout';
import { PaymentTile } from '../components/PaymentTile';
import { ScrollView } from '@components/ui/scrool-view';
import { Header } from '@components/header';
import { Button } from '@components/button';
import { $color_primary } from '@styles/colors';
import { usePayments } from '@hooks/usePayments';
import { lessonsService } from '@services/lessons.service';
import { OverduesTile } from '../components/OverduesTile';
import { PaymentsTabParamList } from '@components/ui/navbar';
import { Tile } from '@components/tile';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getMonth, getYear } from 'date-fns';
import { useOverdues } from '@hooks/useOverdues';
import { useModalContext } from '@contexts/modalContext';
import { PaymentDTO } from '@model';
import { PaymentModal } from '@components/modals/PaymentModal';
import { useConfirmModal } from '@contexts/confirmModalContext';
import { getFullName } from '@utils/utils';
import { paymentsService } from '@services/payments.service';
import { useAlert } from '@contexts/AlertContext';
import { setLoadingPage } from '@contexts/NavbarReducer';

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
            income: 0,
            paymentsNumber: payments.length
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

    const handleShowEventModal = (payment: PaymentDTO) => {
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
            <ScrollView
                styles={{
                    paddingHorizontal: 10,
                    marginBottom: 100,
                }}
            >
                <Header
                    title="Bieżący miesiąc"
                    isCentered
                    styles={{ height: 30, marginBottom: 10 }}
                />
                <Tile color='white'>
                    <View style={{ padding: 5 }}>
                        <View style={styles.fullWidthRow}>
                            <Text style={styles.headText}>Zarobki</Text>
                            <Text>
                                {summaryData.income
                                    ? `${summaryData.income}zł`
                                    : '-'}
                            </Text>
                        </View>
                        <View style={styles.fullWidthRow}>
                            <Text style={styles.headText}>Liczba płatności</Text>
                            <Text>
                                {summaryData.paymentsNumber}
                            </Text>
                        </View>
                        <View style={styles.fullWidthRow}>
                            <Text style={styles.headText}>Liczba zajęć</Text>
                            <Text>
                                {summaryData.lessonsNumber}
                            </Text>
                        </View>
                    </View>
                </Tile>
                <View style={{ height: 20 }} />
                <OverduesTile
                    lessons={overdueLessons}
                    isLoading={isLoading}
                    navigation={navigation}
                />
                <View style={{ height: 20 }} />
                <Header
                    title={
                        payments.length > 5
                            ? 'Ostatnie 5 płatności'
                            : 'Ostatnie płatności'
                    }
                    isCentered
                    styles={{ height: 30, marginBottom: 10 }}
                />
                {isLoading ? (
                    <ActivityIndicator size="large" color={$color_primary} />
                ) : payments.length ? (
                    <>
                        {payments.slice(0, 5).map(p => (
                            <PaymentTile
                                key={p.id}
                                payment={p}
                                onClick={() => handleShowEventModal(p)}
                            />
                        ))}
                    </>
                ) : (
                    <Text>Brak płatności</Text>
                )}
                <View style={{ marginTop: 10 }}>
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
        fontSize: 20,
        fontWeight: 'bold',
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
