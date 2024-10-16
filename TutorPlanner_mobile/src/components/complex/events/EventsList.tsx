import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { lessonsService } from '@services/lessons.service';
import { Tile } from '@components/tile';
import { LessonDTO } from '@model';
import { $color_primary } from '@styles/colors';
import { useModalContext } from '@contexts/modalContext';
import { LessonModal } from '@components/modals';
import axios from 'axios';
import { LESSONS_URL } from '@services/config';

interface EventsListProps {
    day: Date;
}

export const EventsList: React.FC<EventsListProps> = ({ day }) => {
    const [events, setEvents] = useState<LessonDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setIsOpen, setModalBody } = useModalContext();

    const getEvents = useCallback(async () => {
        console.log(day);
        const response = await lessonsService.getLessonsInDay(day);
        setEvents(response);
        setIsLoading(false);
    }, [day]);

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    const handleDeleteEvent = async (eventId: number) => {
        try {
            const response = await axios.delete(`${LESSONS_URL}/${eventId}`);
            getEvents();
            setIsOpen(false);
            console.log('Event deleted:', response.data.message);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleShowEventModal = (event: LessonDTO) => {
        setModalBody(
            <LessonModal event={event} onDelete={handleDeleteEvent} />,
        );
        setIsOpen(true);
    };

    return (
        <View style={{ maxHeight: 500, marginBottom: 200 }}>
            {isLoading ? (
                <ActivityIndicator size="large" color={$color_primary} />
            ) : events.length ? (
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{ width: 320, gap: 10, paddingBottom: 20 }}>
                        {events.map((event: LessonDTO, i) => (
                            <Tile
                                key={i}
                                color="white"
                                onClick={() => handleShowEventModal(event)}
                            >
                                <View
                                    style={{
                                        paddingVertical: 3,
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {event.name}
                                    </Text>
                                    <Text>
                                        {event.startHour}-{event.endHour}
                                    </Text>
                                </View>
                            </Tile>
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <Text>Brak wydarzeń</Text>
            )}
        </View>
    );
};
