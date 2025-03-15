import { EventDTO } from '@model';
import axios from 'axios';
import { EVENTS_URL } from './config';

interface EventFilters {
    startDate: Date;
    endDate: Date;
}

interface EventCreateRequestBody {
    name: string;
    description: string;
    date: Date;
    startHour: string;
    endHour: string;
    weekly: boolean;
}

class EventsService {
    create = async (data: EventCreateRequestBody): Promise<EventDTO> => {
        if (!data.name || !data.date) {
            throw new Error(`Missing data`);
        }
        const response = await axios.post(EVENTS_URL, data);
        return response.data;
    };
    getEvents = async ({}: Partial<EventFilters>): Promise<EventDTO[]> => {
        return [];
    };
}

export const eventsService = new EventsService();
