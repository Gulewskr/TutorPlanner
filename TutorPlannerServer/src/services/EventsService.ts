import { EventDTO } from '../dto/events';
import { eventRepository } from '../repositories/eventsRepository';

class EventsService {
    public async getEventsInTimeFrame(
        startDate: Date,
        endDate: Date,
    ): Promise<EventDTO[]> {
        return (await eventRepository.getEventsInTimeFrame(
            startDate,
            endDate,
        )) as EventDTO[];
    }
}

export default new EventsService();
