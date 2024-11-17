import { EventDTO, toEventDTO } from '../dto/events';
import { eventRepository } from '../repositories/eventsRepository';

class EventsService {
    public async getEventsInTimeFrame(
        startDate: Date,
        endDate: Date,
    ): Promise<EventDTO[]> {
        const events = await eventRepository.getEventsInTimeFrame(
            startDate,
            endDate,
        );
        return events.map(e => toEventDTO(e));
    }
}

export default new EventsService();
