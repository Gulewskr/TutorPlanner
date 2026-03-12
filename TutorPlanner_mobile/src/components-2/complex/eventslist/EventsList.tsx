import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import { LessonDTO, EventDTO } from '@model';
import { EventTile, LessonTile } from '@components-new/tile';
import { DEFAULT } from '@styles/theme';

interface EventsListProps {
    onChange?: () => void;
    events: (LessonDTO | EventDTO)[];
    onEventClick?: (event: EventDTO) => void;
    onLessonClick?: (lesson: LessonDTO) => void;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const EventsList: React.FC<EventsListProps> = ({
    onChange,
    events,
    onEventClick,
    onLessonClick,
    onScroll,
}) => {
    return (
        <ScrollView nestedScrollEnabled={true} onScroll={onScroll}>
            <View
                style={{
                    width: 320,
                    gap: DEFAULT.SPACING.S,
                    paddingBottom: DEFAULT.SPACING.M,
                    marginBottom: DEFAULT.SPACING.M,
                    flex: 1,
                    backgroundColor: 'transparent'
                }}
            >
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
    );
};
