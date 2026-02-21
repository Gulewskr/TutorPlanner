import { TabItem, Tabs } from '@components/tab';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { PropsWithChildren } from 'react';
import { Layout } from '../Layout';
import { PaymentsTabParamList } from '@components/ui/navbar';

const tabs: Array<TabItem<keyof PaymentsTabParamList>> = [
    {
        id: 'Summary',
        hasHiddenLabel: 'whenNotActive',
        isExpanded: true,
        text: 'Podsumowanie',
        icon: 'payments',
    },
    {
        id: 'QuarterDetails',
        hasHiddenLabel: 'whenNotActive',
        isExpanded: true,
        text: 'Szczegóły',
        icon: 'diagram',
    },
    {
        id: 'History',
        hasHiddenLabel: 'whenNotActive',
        isExpanded: true,
        text: 'Historia',
        icon: 'diagram',
    },
    {
        id: 'Create',
        hasHiddenLabel: 'always',
        isExpanded: true,
        text: 'Tab',
        icon: 'addPayment',
    },
];

export const PaymentsLayout: React.FC<
    PropsWithChildren<
        BottomTabScreenProps<PaymentsTabParamList, keyof PaymentsTabParamList>
    >
> = ({ navigation, route, children }) => {
    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Payments'}
            title="Finanse"
            hasHeader
        >
            <Tabs
                tabs={tabs}
                activeTab={route.name}
                changeActiveTab={index => navigation.jumpTo(tabs[index].id)}
            />
            {children}
        </Layout>
    );
};
