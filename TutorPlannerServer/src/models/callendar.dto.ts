import { Event } from '@prisma/client';
import { eventToEventResponseDTO, EventResponseDTO } from "./events/event-response.dto";

export type CalendarDTO = {
    events: EventResponseDTO[];
};

export const eventsToCalendarDTO = (events: Event[]) => ({
    events: events.map(e => eventToEventResponseDTO(e))
})
