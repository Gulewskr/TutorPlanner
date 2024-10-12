import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { PaymentsSummary } from './tabs/PaymentsSummary';
import { PaymentCreate } from './tabs/PaymentCreate';
import { PaymentsHistory } from './tabs/PaymentsHistory';
import {
    PaymentsTabParamList,
    RootStackParamList,
} from '@components/ui/navbar';

const Tab = createBottomTabNavigator<PaymentsTabParamList>();

export const Payments: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Payments'>
> = ({ navigation, route }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    display: 'none',
                },
            }}
            backBehavior="history"
        >
            <Tab.Screen name="Summary" component={PaymentsSummary} />
            <Tab.Screen name="History" component={PaymentsHistory} />
            <Tab.Screen name="Create" component={PaymentCreate} />
        </Tab.Navigator>
    );
};
