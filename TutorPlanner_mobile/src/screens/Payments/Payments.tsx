import React from 'react';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaymentsSummary } from './tabs/PaymentsSummary';
import { PaymentCreate } from './tabs/PaymentCreate';
import { PaymentsHistory } from './tabs/PaymentsHistory';
import {
    NavbarNavigationScreens,
    PaymentsTabParamList,
    RootStackParamList,
} from '@components/ui/navbar';
import { PaymentEdit } from './tabs/PaymentEdit';
import { updateCurrentRoute } from '@contexts/NavbarReducer';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator<PaymentsTabParamList>();

export const Payments: React.FC<
BottomTabScreenProps<RootStackParamList, 'Payments'>
> = ({ navigation, route }) => {

    useFocusEffect(() => {
        updateCurrentRoute('Payments' as NavbarNavigationScreens)
    });

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
            <Tab.Screen name="Edit" component={PaymentEdit} />
        </Tab.Navigator>
    );
};
