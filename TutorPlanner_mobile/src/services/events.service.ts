import { EventDTO } from '@model';

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
