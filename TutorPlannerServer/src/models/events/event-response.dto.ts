import { Event } from '@prisma/client';

export type EventResponseDTO = {
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

export const eventToEventResponseDTO = (event: Event) => ({
    name: event.name,
    id: event.id,
    date: event.date,
    isCanceled: event.isCanceled,
    isOverridden: event.isOverridden,
    eventType: event.eventType,
    eventSeriesId: event.eventSeriesId || undefined,
    description: event.description || '',
    startHour: event.startHour || 0,
    endHour: event.endHour || 24 * 60 - 1,
    price: event.price || undefined,
    isPaid: event.isPaid || undefined,
    studentId: event.studentId || undefined,
})
