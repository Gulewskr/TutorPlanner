import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { lessonsService } from '@services/lessons.service';
import { LessonDTO, EventDTO } from '@model';
import { $color_primary } from '@styles/colors';
import { useModalContext } from '@contexts/modalContext';
import { LessonModal } from '@components/modals';
import axios from 'axios';
import { LESSONS_URL } from '@services/config';
import { LessonTile } from '@screens/Lessons/components/LessonTile';
import { eventsService } from '@services/events.service';
import { useAlert } from '@contexts/AlertContext';
import { EventTile } from '@screens/Events/components/EventTile';
import { EventModal } from '@components/modals/EventModal';

interface EventsListProps {
    day: Date;
    navigation: any;
}

export const EventsList: React.FC<EventsListProps> = ({ day, navigation }) => {
    const [events, setEvents] = useState<(LessonDTO | EventDTO)[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const { setIsOpen, setModalBody } = useModalContext();
    const { showAlert } = useAlert();

    const getEvents = async () => {
        try {
            const response = await lessonsService.getLessonsInDay(day);
            const eventsDTO = await eventsService.getEventsInDay(day);
            setEvents(
                [...response, ...eventsDTO].sort((a, b) => {
                    if (!a.startHour || !a.endHour) {
                        return -1;
                    }
                    if (!b.startHour || !b.endHour) {
                        return 1;
                    }
                    const start = a.startHour - b.startHour;
                    if (start === 0) {
                        return a.endHour - b.endHour;
                    }
                    return start;
                }),
            );
        } catch (err) {
            showAlert({
                message: 'Błąd wczytywania danych',
                severity: 'danger',
            });
            setError("BŁĄD 😔");
        }
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
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleShowLessonModal = (lesson: LessonDTO) => {
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

    const handleShowEventModal = (event: EventDTO) => {
        setModalBody(
            <EventModal
                event={event}
                goToEditForm={() => {
                    navigation.navigate('Events', {
                        screen: 'Edit',
                        params: {
                            event: event,
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
                        {events.map((event: EventDTO | LessonDTO, i) => (
                            'studentId' in event ? 
                            <LessonTile
                                key={event.id}
                                lesson={event as LessonDTO}
                                onClick={() => handleShowLessonModal(event as LessonDTO)}
                            />
                            : <EventTile
                                key={event.id}
                                event={event}
                                onClick={() => handleShowEventModal(event)}
                            />
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <Text>{error || 'Brak wydarzeń'}</Text>
            )}
        </View>
    );
};
