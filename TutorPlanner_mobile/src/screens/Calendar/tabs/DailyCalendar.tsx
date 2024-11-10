import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { DaySelector } from '../components/DaySelector';
import { Layout } from '@screens/Layout';
import { CalendarTabParamList } from '../calendarTabs';
import { useCalendarContext } from '../CalendarContext';
import { EventsList } from '@components/complex/eventslist';

export const DailyCalendar: React.FC<
    BottomTabScreenProps<CalendarTabParamList, 'DailyCalendar'>
> = props => {
    const { navigation } = props;
    const [controlDate, setControlDate] = useState(new Date());

    const {
        calendarData,
        selectedDate,
        loading,
        selectDate,
        fetchMonthlyCalendarData,
    } = useCalendarContext();

    useEffect(() => {
        fetchMonthlyCalendarData(controlDate);
    }, [controlDate.getMonth()]);

    return (
        <Layout
            navigation={navigation as any}
            route={'Calendar'}
            title="Kalendarz"
            hasHeader
        >
            <DaySelector
                day={selectedDate}
                onClick={selectDate}
                calendarData={calendarData}
            />
            <EventsList
                day={selectedDate}
                navigation={navigation.getParent()}
            />
        </Layout>
    );
};
