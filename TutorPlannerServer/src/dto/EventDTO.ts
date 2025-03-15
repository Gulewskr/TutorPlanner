import { EventDAO } from '../models/event';

export type EventDTO = {
    name: string;
    id: number;
    date: Date;
    isCanceled: boolean;
    isOverridden: boolean;
    eventType: 'LESSON' | 'DEFAULT';
    eventSeriesId?: number;
    description?: string;
    startHour?: number;
    endHour?: number;
    price?: number;
    isPaid?: boolean;
    studentId?: number;
};

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
