import { endOfMonth } from 'date-fns';
import { eventRepository } from '../repositories/eventsRepository';
import { CalendarDTO, eventsToCalendarDTO } from '../models/callendar.dto';

class CalendarService {
    public async getCalendarData(
        month: number,
        year: number,
    ): Promise<CalendarDTO> {
        const startOfMonth = new Date(year, month - 1, 1);
        const events = await eventRepository.getEventsInTimeFrame(
            startOfMonth,
            endOfMonth(startOfMonth),
        );
        return eventsToCalendarDTO(events);
    }
}

export default new CalendarService();
