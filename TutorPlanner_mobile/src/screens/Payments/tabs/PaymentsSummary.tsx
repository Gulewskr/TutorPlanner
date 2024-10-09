import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { PaymentsTabParamList } from '../Payments';
import { PaymentsLayout } from '../PaymentsLayout';
import { paymentsService } from '@services/payments.service';
import { PaymentDTO } from '@model';
import { PaymentTile } from '../components/PaymentTile';
import { ScrollView } from '@components/scrool-view';
import { Header } from '@components/header';
import { Button } from '@components/button';

export const PaymentsSummary: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'Summary'>
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
                <Header title="Zaległości" isCentered />
                <Text>TODO - dodać zaległości</Text>
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
