import { Text } from 'react-native';
import { Layout } from '../Layout';
import React from 'react';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DailyCalendar } from './tabs/DailyCalendar';
import { MonthlyCalendar } from './tabs/MonthlyCalendar';
import { CalendarTabParamList } from './calendarTabs';
import { NavbarNavigationScreens, RootStackParamList } from '@components/ui/navbar';
import { CalendarProvider } from './CalendarContext';
import { updateCurrentRoute } from '@contexts/NavbarReducer';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator<CalendarTabParamList>();

export const RootCalendar: React.FC<
    BottomTabScreenProps<RootStackParamList, 'Calendar'>
> = ({ navigation, route }) => {

    useFocusEffect(() => {
        updateCurrentRoute('Calendar' as NavbarNavigationScreens)
    });

    return (
        <CalendarProvider>
            <Tab.Navigator
                initialRouteName="MonthlyCalendar"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        display: 'none',
                    },
                }}
                backBehavior="history"
            >
                <Tab.Screen
                    name="MonthlyCalendar"
                    component={MonthlyCalendar}
                />
                <Tab.Screen name="DailyCalendar" component={DailyCalendar} />
                <Tab.Screen name="Event" component={EventDetails} />
                <Tab.Screen name="Create" component={CreateEvent} />
            </Tab.Navigator>
        </CalendarProvider>
    );
};

const CreateEvent: React.FC<
BottomTabScreenProps<CalendarTabParamList, 'Create'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Calendar'}
            title="Dodaj wydarzenie"
            hasHeader
        >
            <Text>TODO</Text>
        </Layout>
    );
};

const EventDetails: React.FC<
BottomTabScreenProps<CalendarTabParamList, 'Event'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Calendar'}
            title="Szczegóły wydarzenia"
            hasHeader
        >
            <Text>TODO</Text>
        </Layout>
    );
};

export { RootCalendar as Calendar };
