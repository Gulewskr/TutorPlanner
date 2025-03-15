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

    update = async (
        id: number,
        data: EventCreateRequestBody,
        series = false,
    ): Promise<EventDTO> => {
        if (!id || !data.name || !data.date) {
            throw new Error(`Missing data`);
        }
        const requestUrl = series
            ? `${EVENTS_URL}/${id}/series`
            : `${EVENTS_URL}/${id}`;
        const response = await axios.put(requestUrl, data);
        return response.data;
    };

    cancel = async (
        eventId: number,
        isCanceled: boolean = true,
        series = false,
    ): Promise<EventDTO> => {
        const requestUrl = series
            ? `${EVENTS_URL}/${eventId}/series/cancel`
            : `${EVENTS_URL}/${eventId}/cancel`;

        const response = isCanceled
            ? await axios.post(requestUrl)
            : await axios.delete(requestUrl);
        return response.data;
    };
    delete = async (eventId: number): Promise<EventDTO> => {
        const response = await axios.delete(`${EVENTS_URL}/${eventId}`);
        return response.data;
    };
}

export const eventsService = new EventsService();
