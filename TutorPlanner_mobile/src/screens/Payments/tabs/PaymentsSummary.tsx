import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { PaymentsTabParamList } from '../Payments';
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

export const PaymentsSummary: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'Summary'>
> = props => {
    const { navigation, route } = props;
    const { payments, isLoading } = usePayments();
    const [unpaidLessons, setUnpaidLessons] = useState<LessonDTO[]>([]);
    const numOfUnpaid = unpaidLessons.length;

    const loadData = async () => {
        const res = await lessonsService.getOverdues();
        setUnpaidLessons(res);
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
                <OverduesTile numOfUnpaid={numOfUnpaid} isLoading={false} />
                <Header title="Podsumowanie" isCentered />
                <Header title="Ostatnie płatności" isCentered />
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
