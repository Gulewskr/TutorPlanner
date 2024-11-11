import { endOfMonth } from 'date-fns';
import { eventRepository } from '../repositories/eventsRepository';
import { EventDTO, toEventDTO } from '../dto/events';

export type CalendarDTO = {
    events: EventDTO[];
};

class CalendarService {
    public async getCalendarData(
        month: number,
        year: number,
    ): Promise<CalendarDTO> {
        const startOfMonth = new Date(year, month - 1, 1);
        const data = await eventRepository.getEventsInTimeFrame(
            startOfMonth,
            endOfMonth(startOfMonth),
        );
        return {
            events: data.map(e => toEventDTO(e)),
        };
    }
}

export default new CalendarService();
