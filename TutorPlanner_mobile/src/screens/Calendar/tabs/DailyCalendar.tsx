import { EventWrapper } from '@components/complex/events';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { DaySelector } from '../components/DaySelector';
import { Layout } from 'src/screens/Layout';
import { CalendarTabParamList } from '../calendarTabs';

export const DailyCalendar: React.FC<
    BottomTabScreenProps<CalendarTabParamList, 'DailyCalendar'>
> = props => {
    const { navigation, route } = props;
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());

    const handleChangeDay = (day: Date) => {
        setSelectedDay(day);
    };
    return (
        <Layout
            navigation={navigation as any}
            route={'Calendar'}
            title="Kalendarz"
            hasHeader
        >
            <DaySelector day={selectedDay} onClick={handleChangeDay} />
            <EventWrapper day={selectedDay} />
        </Layout>
    );
};
