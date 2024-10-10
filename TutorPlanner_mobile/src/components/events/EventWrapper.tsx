import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { lessonsService } from '@services/lessons.service';
import { ScrollView } from '@components/scrool-view';
import { Tile } from '@components/tile';

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
            <View style={{ width: 320, gap: 10 }}>
                {events.map((event: Lesson, i) => (
                    <Tile key={i} color="white">
                        <Text>
                            {event.name}
                            {'\n'}
                            {event.startHour}-{event.endHour}
                        </Text>
                    </Tile>
                ))}
            </View>
        </ScrollView>
    );
};
