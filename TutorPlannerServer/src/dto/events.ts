import { EventDAO } from '../models/event';

export type EventDTO = {
    name: string;
    id: number;
    date: Date;
    isCanceled: boolean;
    isOverridden: boolean;
    type: 'LESSON' | 'DEFAULT';
    eventSeriesId?: number;
    description?: string;
    startHour?: string;
    endHour?: string;
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
    type: data.type,
    eventSeriesId: data.eventSeriesId || undefined,
    description: data.description || '',
    startHour: data.startHour || '00:00',
    endHour: data.endHour || '23:59',
    price: data.price || undefined,
    isPaid: data.isPaid || undefined,
    studentId: data.studentId || undefined,
});
