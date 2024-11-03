import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { PaymentsLayout } from '../PaymentsLayout';
import { LessonDTO } from '@model';
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

export const PaymentsSummary: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'Summary'>
> = props => {
    const { navigation, route } = props;
    const { payments, isLoading } = usePayments();
    const [unpaidLoading, setUnpaidLoading] = useState(true);
    const [summaryData, setSummaryDate] = useState<{
        income: number;
        expectedIncome: number;
        lessonsNumber: number;
    }>({
        income: 0,
        expectedIncome: 0,
        lessonsNumber: 0,
    });

    const { overdueLessons } = useOverdues();
    const numOfUnpaid = overdueLessons.length;

    const loadData = async () => {
        const todayDate = new Date();
        setUnpaidLoading(false);

        const lessons = await lessonsService.getLessons({
            month: getMonth(todayDate) + 1,
            year: getYear(todayDate),
        });
        setSummaryDate({
            lessonsNumber: lessons.length,
            income: lessons.reduce(
                (acc, c) => (c.isPaid ? acc + c.price : acc),
                0,
            ),
            expectedIncome: lessons.reduce((acc, c) => c.price + acc, 0),
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <PaymentsLayout {...props}>
            <ScrollView
                styles={{
                    paddingHorizontal: 10,
                }}
            >
                <Header
                    title="Bieżący miesiąc"
                    isCentered
                    styles={{ height: 30, marginBottom: 10 }}
                />
                <Tile color="secondary">
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
                            <Text style={styles.headText}>Liczba zajęć</Text>
                            <Text>
                                {summaryData.lessonsNumber}
                                {summaryData.lessonsNumber
                                    ? `(${summaryData.expectedIncome}zł)`
                                    : ''}
                            </Text>
                        </View>
                    </View>
                </Tile>
                <View style={{ height: 20 }} />
                <OverduesTile
                    numOfUnpaid={numOfUnpaid}
                    isLoading={unpaidLoading}
                />
                <View style={{ height: 20 }} />
                <Header
                    title="Ostatnie płatności"
                    isCentered
                    styles={{ height: 30, marginBottom: 10 }}
                />
                {!isLoading ? (
                    <ActivityIndicator size="large" color={$color_primary} />
                ) : payments.length ? (
                    <>
                        {payments.slice(0, 5).map(p => (
                            <PaymentTile
                                key={p.id}
                                payment={p}
                                onClick={function (): void {
                                    console.log(
                                        `Open modal - payment edit. ${p.id}`,
                                    );
                                }}
                            />
                        ))}
                        {payments.length > 5 && <Text>...</Text>}
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
