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
import { mapHourValueToText } from '@utils/dateUtils';
import { LessonTile } from '@screens/Lessons/components/LessonTile';

interface EventsListProps {
    day: Date;
    navigation: any;
}

export const EventsList: React.FC<EventsListProps> = ({ day, navigation }) => {
    const [events, setEvents] = useState<LessonDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setIsOpen, setModalBody } = useModalContext();

    const getEvents = async () => {
        const response = await lessonsService.getLessonsInDay(day);
        setEvents(
            response.sort((a, b) => {
                const start = a.startHour - b.startHour;
                if (start === 0) {
                    return a.endHour - b.endHour;
                }
                return start;
            }),
        );
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        const intervalId = setInterval(getEvents, 5000);
        getEvents();
        return () => clearInterval(intervalId);
    }, [day]);

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

    const handleShowEventModal = (lesson: LessonDTO) => {
        setModalBody(
            <LessonModal
                lesson={lesson}
                onDelete={handleDeleteEvent}
                goToStudentProfile={() => {
                    navigation.navigate('Students', {
                        screen: 'Profile',
                        params: {
                            studentId: lesson.studentId,
                        },
                    });
                }}
                goToEditForm={() => {
                    navigation.navigate('Lessons', {
                        screen: 'Edit',
                        params: {
                            lessonId: lesson.id,
                        },
                    });
                }}
            />,
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
                            <LessonTile
                                key={event.id}
                                lesson={event}
                                onClick={() => handleShowEventModal(event)}
                            />
                            /*
                            TODO - add handling both events and lessons in single list
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
                                        {mapHourValueToText(event.startHour)}-
                                        {mapHourValueToText(event.endHour)}
                                    </Text>
                                </View>
                            </Tile>
                            */
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <Text>Brak wydarzeń</Text>
            )}
        </View>
    );
};
