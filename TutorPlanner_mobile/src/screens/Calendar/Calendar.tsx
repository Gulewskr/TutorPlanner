import { Text, View } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from '@components/button';
import { Calendar } from '@components/calendar';
import axios from 'axios';
import { lessonsService } from '@services/lessons.service';
import { ScrollView } from '@components/scrool-view';
import { EventWrapper } from '@components/events';
import { DailyViewWrapper } from '@components/daily calendar';

export type CalendarTabParamList = {
    MonthlyCalendar: undefined;
    DailyCalendar: undefined;
    Create: undefined;
    Event: { id: string };
};

const Tab = createBottomTabNavigator<CalendarTabParamList>();

export const RootCalendar: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Calendar'>
> = ({ navigation, route }) => {
    return (
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
            <Tab.Screen name="MonthlyCalendar" component={MonthlyCalendar} />
            <Tab.Screen name="DailyCalendar" component={DailyCalendar} />
            <Tab.Screen name="Event" component={EventDetails} />
            <Tab.Screen name="Create" component={CreateEvent} />
        </Tab.Navigator>
    );
};

const MonthlyCalendar: React.FC<
    NativeStackScreenProps<CalendarTabParamList, 'MonthlyCalendar'>
> = ({ navigation, route }) => {
    const [selectedDay, setSelectedDay] = useState(new Date());
    const handleChangeDay = (newDay: Date) => {
        setSelectedDay(newDay);
    };
    return (
        <Layout
            navigation={navigation}
            route={'Calendar'}
            title="Kalendarz"
            hasHeader
        >
            <ScrollView>
                <View
                    style={{
                        paddingHorizontal: 15,
                        gap: 15,
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Button
                        onClick={() => navigation.navigate('DailyCalendar')}
                        hasShadow
                        icon="calendar"
                        label="Przełącz na widok dzienny"
                    />
                    <Calendar
                        day={selectedDay}
                        handleChangeDay={handleChangeDay}
                    />
                    <EventWrapper day={selectedDay} />
                </View>
            </ScrollView>
        </Layout>
    );
};

const DailyCalendar: React.FC<
    NativeStackScreenProps<CalendarTabParamList, 'DailyCalendar'>
> = ({ navigation, route }) => {
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());

    const handleChangeDay = (day: Date) => {
        setSelectedDay(day);
    };
    return (
        <Layout
            navigation={navigation}
            route={'Calendar'}
            title="Kalendarz"
            hasHeader
        >
            <View style={{ width: '95%' }}>
                <DailyViewWrapper day={selectedDay} onClick={handleChangeDay} />
            </View>
            <EventWrapper day={selectedDay} />
        </Layout>
    );
};

const CreateEvent: React.FC<
    NativeStackScreenProps<CalendarTabParamList, 'Create'>
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
    NativeStackScreenProps<CalendarTabParamList, 'Event'>
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
