import React, { createContext, useContext, useState } from 'react';
import { useEvents } from '@hooks/useEvents';
import { DayEventsData } from './components/calendar/model';
import { calendarService } from '@services/calendar.service';
import { format } from 'date-fns';
import { EventDTO } from '@model';

interface CalendarContextProps {
    events: EventDTO[];
    calendarData: { [dateKey: string]: DayEventsData };
    selectedDate: Date;
    selectDate: (date: Date) => void;
    fetchMonthlyCalendarData: (date: Date) => void;
    loading: boolean;
}

// 1. Create Context
const CalendarContext = createContext<CalendarContextProps>({
    events: [],
    calendarData: {},
    selectedDate: new Date(),
    selectDate: function (date: Date): void {
        throw new Error('Function not implemented.');
    },
    fetchMonthlyCalendarData: function (date: Date): void {
        throw new Error('Function not implemented.');
    },
    loading: false,
});

interface CalendarState {
    events: EventDTO[];
    selectedMonth: Date;
    selectedEvent?: EventDTO;
}

// 4. Initial State
const initialState: CalendarState = {
    events: [],
    selectedMonth: new Date(),
    selectedEvent: undefined,
};

// 5. Provider Component
export const CalendarProvider = ({ children }: React.PropsWithChildren) => {
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [calendarData, setCalendarData] = useState({});
    const [calendarLoading, setCalendarLoading] = useState(false);
    const { events, isLoading, fetchEvents } = useEvents();

    const selectDay = (newDay: Date) => {
        setSelectedDay(newDay);
    };

    const selectEvent = (selectedEvent: EventDTO) => {};

    const fetchMonthlyCalendarData = async (controlDate: Date) => {
        setCalendarLoading(true);
        const data = await calendarService.getMonthlyData(
            controlDate.getMonth() + 1,
            controlDate.getFullYear(),
        );

        const calendarData = data.events.reduce<{
            [key: string]: DayEventsData;
        }>((acc, event) => {
            const dateKey = format(event.date, 'yyyy-MM-dd');
            acc[dateKey] = acc[dateKey] || {
                amount: 0,
            };
            acc[dateKey].amount++;
            return acc;
        }, {});
        setCalendarData(data => ({
            ...data,
            ...calendarData,
        }));
        setCalendarLoading(false);
    };

    return (
        <CalendarContext.Provider
            value={{
                events: events,
                selectDate: selectDay,
                selectedDate: selectedDay,
                calendarData: calendarData,
                fetchMonthlyCalendarData,
                loading: calendarLoading,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};

// 6. Custom Hook for easier use
export const useCalendarContext = () => {
    return useContext(CalendarContext);
};
