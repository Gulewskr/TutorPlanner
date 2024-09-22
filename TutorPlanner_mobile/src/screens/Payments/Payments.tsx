import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type PaymentsTabParamList = {
    List: undefined;
    Summary: undefined;
    History: undefined;
    Create: undefined;
};

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
            <Tab.Screen name="List" component={PaymentsRoot} />
            <Tab.Screen name="Create" component={CreatePayments} />
        </Tab.Navigator>
    );
};

export const PaymentsRoot: React.FC<
    NativeStackScreenProps<PaymentsTabParamList, 'List'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Payments'}
            title="Finanse"
            hasHeader
        >
            <Text>This is Payments</Text>
        </Layout>
    );
};

export const PaymentsSummary: React.FC<
    NativeStackScreenProps<PaymentsTabParamList, 'Summary'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Payments'}
            title="Finanse"
            hasHeader
        >
            <Text>Podsumowanie</Text>
        </Layout>
    );
};

export const PaymentsHistory: React.FC<
    NativeStackScreenProps<PaymentsTabParamList, 'History'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Payments'}
            title="Finanse"
            hasHeader
        >
            <Text>Historia płatności</Text>
        </Layout>
    );
};

const CreatePayments: React.FC<
    NativeStackScreenProps<PaymentsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Payments'}
            title="Dodaj płatność"
            hasHeader
        >
            <Text>TODO - formularz</Text>
        </Layout>
    );
};
