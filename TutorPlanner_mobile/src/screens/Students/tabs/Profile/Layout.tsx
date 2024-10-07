import { TabItem, Tabs } from '@components/tab';
import { StudentProfileTabParamList } from './StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { PropsWithChildren } from 'react';
import { Layout } from 'src/screens/Layout';

const tabs: Array<TabItem<keyof StudentProfileTabParamList>> = [
    { id: 'Info', isExpanded: true, text: 'Informacje', icon: 'studentCap' },
    { id: 'Lessons', isExpanded: true, text: 'List zajęć', icon: 'pencil' },
    {
        id: 'Analise',
        isExpanded: true,
        text: 'Analiza',
        icon: 'calendar',
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
            title="Profil ucznia"
            hasHeader
        >
            <Tabs
                tabs={tabs}
                activeTab={route.name}
                changeActiveTab={index =>
                    navigation.jumpTo(tabs[index].id, { ...route.params })
                }
            />
            {children}
        </Layout>
    );
};
