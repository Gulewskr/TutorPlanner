import { Text, View } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
    BottomTabScreenProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { TabItem, Tabs } from '@components/tab';
import React, { PropsWithChildren } from 'react';
import { toNativeStackNavigationProp } from 'src/utils/mapper';

export type PaymentsTabParamList = {
    List: undefined;
    Summary: undefined;
    History: undefined;
    Create: undefined;
};

const Tab = createBottomTabNavigator<PaymentsTabParamList>();

const tabs: Array<TabItem<keyof PaymentsTabParamList>> = [
    { id: 'Summary', isExpanded: true, text: 'Podsumowanie', icon: 'plus' },
    { id: 'History', isExpanded: true, text: 'Historia', icon: 'minus' },
    {
        id: 'Create',
        hasHiddenLabel: true,
        isExpanded: true,
        text: 'Tab',
        icon: 'addPayment',
    },
];

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
            <Tab.Screen name="Create" component={CreatePayment} />
        </Tab.Navigator>
    );
};

//TODO - maybe not needed
export const PaymentsRoot: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'List'>
> = props => {
    const { navigation, route } = props;
    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Payments'}
            title="Finanse"
            hasHeader
        >
            <PaymentsLayout {...props}>
                <Text>This is Payments</Text>
            </PaymentsLayout>
        </Layout>
    );
};

export const PaymentsSummary: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'Summary'>
> = props => {
    const { navigation, route } = props;
    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Payments'}
            title="Finanse"
            hasHeader
        >
            <PaymentsLayout {...props}>
                <Text>Podsumowanie</Text>
            </PaymentsLayout>
        </Layout>
    );
};

export const PaymentsHistory: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'History'>
> = props => {
    const { navigation, route } = props;
    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Payments'}
            title="Finanse"
            hasHeader
        >
            <PaymentsLayout {...props}>
                <Text>Historia płatności</Text>
            </PaymentsLayout>
        </Layout>
    );
};

const CreatePayment: React.FC<
    BottomTabScreenProps<PaymentsTabParamList, 'Create'>
> = props => {
    const { navigation, route } = props;
    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Payments'}
            title="Dodaj płatność"
            hasHeader
        >
            <PaymentsLayout {...props}>
                <Text>TODO - formularz</Text>
            </PaymentsLayout>
        </Layout>
    );
};

const PaymentsLayout: React.FC<
    PropsWithChildren<
        BottomTabScreenProps<PaymentsTabParamList, keyof PaymentsTabParamList>
    >
> = ({ navigation, route, children }) => {
    return (
        <>
            <Tabs
                tabs={tabs}
                activeTab={route.name}
                changeActiveTab={index => navigation.jumpTo(tabs[index].id)}
            />
            {children}
        </>
    );
};
