import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Layout } from 'src/screens/Layout';
import { PaymentsTabParamList } from '../Payments';
import { PaymentsLayout } from '../PaymentsLayout';
import { PaymentDTO } from '@model';
import { paymentsService } from '@services/payments.service';
import { Header } from '@components/header';
import { PaymentTile } from '../components/PaymentTile';
import { ScrollView } from '@components/scrool-view';
import { Button } from '@components/button';
import { Tile } from '@components/tile';

export const PaymentsHistory: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'History'>
> = props => {
    const { navigation, route } = props;
    const [payments, setPayments] = useState<PaymentDTO[]>([]);

    const loadData = async () => {
        const response = await paymentsService.getAll();
        if (response) {
            setPayments(response);
        }
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
                <Text>TODO - dodać sterowanie</Text>
                <Header title="Podsumowanie" isCentered />
                {payments.map(p => (
                    <PaymentTile
                        key={p.id}
                        payment={p}
                        onClick={function (): void {
                            console.log(`Open modal - payment edit. ${p.id}`);
                        }}
                    />
                ))}
                <View style={{ height: 20 }} />
                <Tile color="red" centered>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}
                    >
                        0 Nieopłacone zajęcia
                    </Text>
                </Tile>
            </ScrollView>
        </PaymentsLayout>
    );
};
