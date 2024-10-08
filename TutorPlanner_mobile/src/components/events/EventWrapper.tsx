import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { EventTile } from './EventTile';
import { lessonsService } from '@services/lessons.service';
import { ScrollView } from '@components/scrool-view';

export interface Lesson {
    name: string;
    description: string;
    student: number;
    price: number;
    date: Date;
    startHour: string;
    endHour: string;
    weekly: boolean;
}
interface EventWrapperProps {
    day: Date;
}

export const EventWrapper: React.FC<EventWrapperProps> = ({ day }) => {
    const [events, setEvents] = useState([]);

    const getEvents = useCallback(async () => {
        const response = await lessonsService.getLessonsInDay(day);
        setEvents(response);
    }, [day]);

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    return (
        <ScrollView>
            {events.map((event: Lesson) => (
                <EventTile event={event}></EventTile>
            ))}
        </ScrollView>
    );
};
