import { EventDTO } from '../../../TutorPlanner_shared/EventDTO';
import { EventDAO } from '../models/event';

export const toEventDTO = (data: EventDAO): EventDTO => ({
    name: data.name,
    id: data.id,
    date: data.date,
    isCanceled: data.isCanceled,
    isOverridden: data.isOverridden,
    eventType: data.eventType,
    eventSeriesId: data.eventSeriesId || undefined,
    description: data.description || '',
    startHour: data.startHour || 0,
    endHour: data.endHour || 24 * 60 - 1,
    price: data.price || undefined,
    isPaid: data.isPaid || undefined,
    studentId: data.studentId || undefined,
});

export { EventDTO };
