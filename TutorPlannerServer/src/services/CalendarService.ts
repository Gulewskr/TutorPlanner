import { endOfMonth } from 'date-fns';
import { CalendarDTO } from '../../../TutorPlanner_shared/CalendarDTO';
import { eventRepository } from '../repositories/eventsRepository';
import { toEventDTO } from '../dto/events';

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
