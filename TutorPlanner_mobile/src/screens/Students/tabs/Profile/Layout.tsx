import { TabItem, Tabs } from '@components/tab';
import { StudentProfileTabParamList } from './StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { PropsWithChildren } from 'react';
import { Layout } from 'src/screens/Layout';
import { getFullName } from 'src/utils/utils';

const tabs: Array<TabItem<keyof StudentProfileTabParamList>> = [
    {
        id: 'Info',
        isExpanded: true,
        text: 'Informacje',
        icon: 'studentCap',
        hasHiddenLabel: 'whenNotActive',
    },
    {
        id: 'Lessons',
        isExpanded: true,
        text: 'Lista zajęć',
        icon: 'list',
        hasHiddenLabel: 'whenNotActive',
    },
    {
        id: 'Analise',
        isExpanded: true,
        text: 'Analiza',
        icon: 'calendar',
        hasHiddenLabel: 'whenNotActive',
    },
    {
        id: 'Edit',
        isExpanded: true,
        text: 'Edit',
        icon: 'pencil',
        hasHiddenLabel: 'always',
    },
];

export const StudentsLayout: React.FC<
    PropsWithChildren<
        BottomTabScreenProps<
            StudentProfileTabParamList,
            keyof StudentProfileTabParamList
        >
    >
> = ({ navigation, route, children }) => {
    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Students'}
            title={getFullName(route.params.student)}
            hasHeader
        >
            <Tabs
                tabs={tabs}
                activeTab={route.name}
                changeActiveTab={index =>
                    navigation.jumpTo(tabs[index].id, {
                        ...route.params,
                        inProfile: true,
                    })
                }
            />
            {children}
        </Layout>
    );
};
