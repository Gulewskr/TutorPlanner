import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { Suspense, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
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
import { MONTHS_NOMINATIVE } from '@components/calendar';
import { addMonths, getMonth, getYear, isSameYear, subMonths } from 'date-fns';
import EStyleSheet from 'react-native-extended-stylesheet';
import { $color_primary } from '@styles/colors';
import { usePayments } from '@hooks/usePayments';

export const PaymentsHistory: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'History'>
> = props => {
    const { navigation, route } = props;
    const [controlDate, setControlDate] = useState(new Date());
    const month = getMonth(controlDate);
    const year = getYear(controlDate);

    const { payments, isLoading, fetchData } = usePayments({
        month: month + 1,
        year: year,
    });

    useEffect(() => {
        fetchData({
            month: month + 1,
            year: year,
        });
    }, [controlDate]);

    const handleMonthChange = async (num: number) => {
        setControlDate(addMonths(controlDate, num));
    };

    return (
        <PaymentsLayout {...props}>
            <ScrollView
                styles={{
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
                {!isLoading ? (
                    <ActivityIndicator size="large" color={$color_primary} />
                ) : payments.length ? (
                    payments.map(p => (
                        <PaymentTile
                            key={p.id}
                            payment={p}
                            onClick={function (): void {
                                console.log(
                                    `Open modal - payment edit. ${p.id}`,
                                );
                            }}
                        />
                    ))
                ) : (
                    <Text>Brak płatności</Text>
                )}
            </ScrollView>
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
