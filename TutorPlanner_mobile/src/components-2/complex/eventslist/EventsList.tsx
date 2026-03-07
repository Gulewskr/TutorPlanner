import React from 'react';
import { ScrollView, View } from 'react-native';
import { LessonDTO, EventDTO } from '@model';
import { EventTile, LessonTile } from '@components-new/tile';

interface EventsListProps {
    navigation: any;
    onChange?: () => void;
    events: (LessonDTO | EventDTO)[];
    onEventClick?: (event: EventDTO) => void;
    onLessonClick?: (lesson: LessonDTO) => void;
}

export const EventsList: React.FC<EventsListProps> = ({
    navigation,
    onChange,
    events,
    onEventClick,
    onLessonClick,
}) => {
    return (
        <View style={{ maxHeight: 500, marginBottom: 200 }}>
            <ScrollView nestedScrollEnabled={true}>
                <View style={{ width: 320, gap: 10, paddingBottom: 20 }}>
                    {events.map((event: EventDTO | LessonDTO, i) =>
                        'studentId' in event ? (
                            <LessonTile
                                key={event.id}
                                lesson={event as LessonDTO}
                                onClick={() => onLessonClick?.(event as LessonDTO)}
                                onChange={onChange}
                            />
                        ) : (
                            <EventTile
                                key={event.id}
                                event={event}
                                onClick={() => onEventClick?.(event)}
                                onChange={onChange}
                            />
                        ),
                    )}
                </View>
            </ScrollView>
        </View>
    );
};
