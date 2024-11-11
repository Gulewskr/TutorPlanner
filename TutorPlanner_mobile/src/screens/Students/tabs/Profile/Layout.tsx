import { TabItem, Tabs } from '@components/tab';
import { StudentProfileTabParamList } from './StudentProfile';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { PropsWithChildren } from 'react';
import { Layout } from '@screens/Layout';
import { getFullName } from '@utils/utils';
import { StudentDTO } from '@model';

const tabs: Array<TabItem<keyof StudentProfileTabParamList>> = [
    {
        id: 'Info',
        isExpanded: true,
        text: 'Informacje',
        icon: 'studentCap',
    },
    {
        id: 'Lessons',
        isExpanded: true,
        text: 'Lista zajęć',
        icon: 'list',
    },
    /*
    // Przeniesione do v2
    {
        id: 'Analise',
        isExpanded: true,
        text: 'Analiza',
        icon: 'calendar',
        hasHiddenLabel: 'whenNotActive',
    },
    */
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
        > & {
            student: StudentDTO;
        }
    >
> = ({ navigation, route, children, student }) => {
    return (
        <Layout
            navigation={navigation.getParent()}
            route={'Students'}
            title={getFullName(student)}
            hasHeader
        >
            <Tabs
                tabs={tabs}
                activeTab={route.name}
                changeActiveTab={index =>
                    navigation.jumpTo(tabs[index].id, {
                        ...route.params,
                        inProfile: true,
                        student: student,
                    })
                }
            />
            {children}
        </Layout>
    );
};
