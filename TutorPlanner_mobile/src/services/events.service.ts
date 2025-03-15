import { EventDTO } from '@model';
import axios from 'axios';
import { EVENTS_URL } from './config';
import { formatToDayInCalendar } from '@utils/dateUtils';

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
    getEventsInDay = async (date: Date): Promise<EventDTO[]> => {
        try {
            if (!date) throw new Error('Missing data');
            const formattedDate = formatToDayInCalendar(date);
            const response = await axios.get(EVENTS_URL, {
                params: {
                    date: formattedDate,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    cancel = async (eventId: number, isCanceled: boolean = true): Promise<EventDTO> => {
        try {
            const response = isCanceled ? await axios.post(
                `${EVENTS_URL}/${eventId}/cancel`,
            ) : await axios.delete(
                `${EVENTS_URL}/${eventId}/cancel`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    delete = async (eventId: number): Promise<EventDTO> => {
        try {
            const response = await axios.delete(
                `${EVENTS_URL}/${eventId}`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };
}

export const eventsService = new EventsService();
