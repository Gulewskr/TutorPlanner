import { eventsService } from '@services/events.service';
import { useEffect } from 'react';
import { EventDTO, LessonDTO } from '@model';
import { useQuery } from '@tanstack/react-query';
import { useAlert } from '@contexts/AlertContext';

interface UseDayEvents {
    events: (EventDTO | LessonDTO)[];
    isLoading: boolean;
    refetch: () => void;
}

export const useDayEvents = (day: Date): UseDayEvents => {
    const { showAlert } = useAlert();

    const {
        data: events,
        isError,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['calendar-events-day', day],
        queryFn: () => eventsService.getEventsInDay(day),
    });
    useEffect(() => {
        if (isError) {
            showAlert({
                message: 'Błąd ładowania widoku kwartalnego',
                severity: 'danger',
            });
        }
    }, [isError]);

    const sortedEvents = (events || []).sort((a, b) => {
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
    });

    return { events: sortedEvents, isLoading, refetch };
};
