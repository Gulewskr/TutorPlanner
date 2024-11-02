import { eventsService } from '@services/events.service';
import { useEffect, useState } from 'react';
import { EventDTO } from '../../../TutorPlanner_shared/EventDTO';

interface Timeframe {
    startDate: Date;
    endDate: Date;
}

export const useEvents = (timeframe?: Timeframe) => {
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async (timeframe?: Timeframe) => {
        const response = await eventsService.getEvents({
            startDate: timeframe?.startDate,
            endDate: timeframe?.endDate,
        });
        setEvents(response);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData(timeframe);
    }, []);

    const fetchEvents = (props?: Timeframe) => {
        setIsLoading(true);
        loadData(props);
    };

    return { events, isLoading, fetchEvents };
};
