import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { PaymentsLayout } from '../PaymentsLayout';
import { PaymentForm } from '../components/PaymentForm';
import { PaymentsTabParamList } from '@components/ui/navbar';

export const PaymentCreate: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'Create'>
> = props => {
    const { navigation, route } = props;
    return (
        <PaymentsLayout {...props}>
            <View style={{ padding: 15, width: '100%' }}>
                <PaymentForm
                    onCancel={navigation.goBack}
                    cb={navigation.goBack}
                />
            </View>
        </PaymentsLayout>
    );
};
