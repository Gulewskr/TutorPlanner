import { EventSeriesType, EventType, Prisma } from '@prisma/client';
import { CreateEventRequestBody } from '../../models/event';
import { eventRepository } from '../../repositories/eventsRepository';
import { eventSeriesRepository } from '../../models/eventSeries';
import {
    addWeeks,
    getDay,
} from 'date-fns';
import { CONFIG } from '../../config';
import { UpdateEventSeries } from '../../models/events/update-eventSeries.schema';
import { toMySQLDate } from '../../utils/utils';
import {
    EventResponseDTO,
    eventToEventResponseDTO,
} from '../../models/events/event-response.dto';
import { EventFilter } from './events.filter';
import { createEventSchema } from '../../models/events/create-event.schema';
import { updateEventSchema } from '../../models/events/update-event.schema';

class EventsService {
    public async createEvent(
        date: CreateEventRequestBody,
    ): Promise<EventResponseDTO> {
        const parsedData = createEventSchema.parse(date);
        if (!parsedData.weekly) {
            const event = await eventRepository.createEvent({
                name: parsedData.name,
                description: parsedData.description,
                date: parsedData.date,
                date_text: toMySQLDate(parsedData.date),
                eventType: EventType.DEFAULT,
                startHour: parsedData.startHour,
                endHour: parsedData.endHour,
            });
            return eventToEventResponseDTO(event);
        } else {
            const series = await eventSeriesRepository.createEventSeries({
                name: parsedData.name,
                description: parsedData.description,
                startHour: parsedData.startHour,
                endHour: parsedData.endHour,
                type: EventSeriesType.WEEKLY,
                eventType: EventType.DEFAULT,
                pattern: JSON.stringify([getDay(parsedData.date)]),
                isCanceled: false,
            });
            const createManyData: Prisma.EventCreateManyInput[] = [];
            let nextEntryDate = parsedData.date;
            while (nextEntryDate < CONFIG.MAX_DATE) {
                createManyData.push({
                    date: nextEntryDate,
                    date_text: toMySQLDate(nextEntryDate),
                    eventType: EventType.DEFAULT,
                    name: parsedData.name,
                    description: parsedData.description,
                    startHour: parsedData.startHour,
                    endHour: parsedData.endHour,
                    eventSeriesId: series.id,
                });
                nextEntryDate = addWeeks(nextEntryDate, 1);
            }
            await eventRepository.bulkCreate(createManyData);
            const event = await eventRepository.getNextBySeriesId(series.id);
            return eventToEventResponseDTO(event);
        }
    }
    public async filterEvents(
        filter: EventFilter,
    ): Promise<EventResponseDTO[]> {
        const events = await eventRepository.getEvents(filter.toPrismaFilter());
        return events.map(event => eventToEventResponseDTO(event));
    }
    public async getEvent(eventId: number): Promise<EventResponseDTO> {
        const event = await eventRepository.getEventById(eventId);
        return eventToEventResponseDTO(event);
    }
    public async getEventsInTimeFrame(
        startDate: Date,
        endDate: Date,
    ): Promise<EventResponseDTO[]> {
        const events = await eventRepository.getEventsInTimeFrame(
            startDate,
            endDate,
        );
        return events.map(e => eventToEventResponseDTO(e));
    }
    public async updateEvent(
        id: number,
        data: CreateEventRequestBody,
    ): Promise<EventResponseDTO> {
        const updateData = updateEventSchema.parse(data);
        const event = await eventRepository.update(id, {
            name: updateData.name,
            date: updateData.date,
            date_text: toMySQLDate(updateData.date),
            startHour: updateData.startHour,
            endHour: updateData.endHour,
            description: updateData.description,
            isCanceled: false,
            isOverridden: true,
        });
        return eventToEventResponseDTO(event);
    }

    public async updateEventSeries(
        eventId: number,
        data: UpdateEventSeries,
    ): Promise<void> {
        await eventRepository.updateSeriesOfEvents(eventId, data);
    }

    public async cancelEvent(
        id: number,
        isCanceled: boolean,
    ): Promise<EventResponseDTO> {
        return await eventRepository.update(id, {
            isCanceled,
        });
    }
    public async cancelEventSeries(
        id: number,
        isCanceled: boolean,
    ): Promise<void> {
        const selectedEvent = await eventRepository.getEventById(id);
        if (!selectedEvent.eventSeriesId) {
            throw Error('Selected event is not part of series');
        }
        await eventRepository.bulkUpdate(
            {
                isCanceled: isCanceled,
            },
            {
                eventSeriesId: {
                    not: null,
                    equals: selectedEvent.eventSeriesId,
                },
                date: {
                    gte: selectedEvent.date,
                },
            },
        );
        await eventSeriesRepository.updateEventSeries(
            selectedEvent.eventSeriesId,
            {
                isCanceled,
            },
        );
    }
    public async deleteEvent(id: number): Promise<EventResponseDTO> {
        const eventToDelete = await this.getEvent(id);
        if (!eventToDelete.isCanceled) {
            throw new Error('Only events that are canceled can be deleted.');
        }
        return eventToEventResponseDTO(await eventRepository.delete(id));
    }
}

export default new EventsService();
