import { EventSeriesType, EventType, Prisma } from '@prisma/client';
import { EventDTO, toEventDTO } from '../dto/EventDTO';
import { CreateEventRequestBody } from '../models/event';
import { eventRepository } from '../repositories/eventsRepository';
import { EventCreateInputSchema, EventUpdateInputSchema } from '../validators/events/event';
import { eventSeriesRepository } from '../models/eventSeries';
import { addWeeks, getDay } from 'date-fns';
import { CONFIG } from '../config';

class EventsService {
    public async createEvent (
        date: CreateEventRequestBody
    ): Promise<EventDTO> {
        const parsedData = EventCreateInputSchema.parse(date);
        if (!parsedData.weekly) {
            const event = await eventRepository.createEvent({
                name: parsedData.name,
                description: parsedData.description,
                date: parsedData.date,
                eventType: EventType.DEFAULT,
                startHour: parsedData.startHour,
                endHour: parsedData.endHour,
            });
            return toEventDTO(event);
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
            return toEventDTO(event);
        }
    };
    public async getEvent(eventId: number): Promise<EventDTO> {
        const event = await eventRepository.getEventById(eventId);
        return toEventDTO(event);
    };
    public async getEventsInTimeFrame(
        startDate: Date,
        endDate: Date,
    ): Promise<EventDTO[]> {
        const events = await eventRepository.getEventsInTimeFrame(
            startDate,
            endDate,
        );
        return events.map(e => toEventDTO(e));
    };
    public async updateEvent (
        id: number,
        data: CreateEventRequestBody
    ): Promise<EventDTO> {
        const updateData = EventUpdateInputSchema.parse(data);
        const event = await eventRepository.update(id, {
            name: updateData.name,
            date: updateData.date,
            startHour: updateData.startHour,
            endHour: updateData.endHour,
            description: updateData.description,
            isCanceled: false,
            isOverridden: true,
        });
        return toEventDTO(event); 
    };
    public async cancelEvent (
        id: number,
        isCanceled: boolean
    ): Promise<EventDTO> {
        return await eventRepository.update(id, {
            isCanceled,
        });
    };
    public async deleteEvent (id: number): Promise<EventDTO> {
        const eventToDelete = await this.getEvent(id);
        if (!eventToDelete.isCanceled) {
            throw new Error('Only events that are canceled can be deleted.')
        }
        return toEventDTO(await eventRepository.delete(id));
    }
}

export default new EventsService();
