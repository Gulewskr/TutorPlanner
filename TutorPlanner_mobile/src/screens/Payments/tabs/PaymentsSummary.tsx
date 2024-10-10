import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { PaymentsTabParamList } from '../Payments';
import { PaymentsLayout } from '../PaymentsLayout';
import { paymentsService } from '@services/payments.service';
import { PaymentDTO } from '@model';
import { PaymentTile } from '../components/PaymentTile';
import { ScrollView } from '@components/scrool-view';
import { Header } from '@components/header';
import { Button } from '@components/button';
import { Tile } from '@components/tile';
import { $color_primary } from '@styles/colors';
import { usePayments } from '@hooks/usePayments';

export const PaymentsSummary: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'Summary'>
> = props => {
    const { navigation, route } = props;
    const { payments, isLoading } = usePayments();
    const [unpaidLessons, setUnpaidLessons] = useState<PaymentDTO[]>([]);
    const numOfUnpaid = unpaidLessons.length;

    return (
        <PaymentsLayout {...props}>
            <ScrollView
                styles={{
                    paddingHorizontal: 10,
                }}
            >
                <Header title="Zaległości" isCentered />
                <Tile color={numOfUnpaid ? 'red' : 'green'} centered>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}
                    >
                        {upnpaidPaymentsText(numOfUnpaid)}
                    </Text>
                </Tile>
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

const upnpaidPaymentsText = (num: number): string =>
    `${num ? num : ''}${num == 0 ? 'Wszystkie zajęcia opłacone 🥰' : num > 5 ? ' nieopłaconych zajęć' : ' nieopłacone zajęcia'}`;
