import { TabItem, Tabs } from '@components/tab';
import { StudentProfileTabParamList } from './StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { PropsWithChildren } from 'react';
import { Layout } from 'src/screens/Layout';
import { StudentDTO } from '@model';

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

const getFullName = (student?: StudentDTO): string =>
    student ? `${student.firstname} ${student.surename}` : '-';

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
                    navigation.jumpTo(tabs[index].id, { ...route.params })
                }
            />
            {children}
        </Layout>
    );
};
