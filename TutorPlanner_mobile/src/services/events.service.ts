import { EVENTS_URL } from './config';
import { axios } from './baseService';
import { EventDTO } from '../../../TutorPlanner_shared/EventDTO';

interface EventFilters {
    startDate: Date;
    endDate: Date;
}

class EventsService {
    getEvents = async ({}: Partial<EventFilters>): Promise<EventDTO[]> => {
        return [];
    };
}

export const eventsService = new EventsService();
