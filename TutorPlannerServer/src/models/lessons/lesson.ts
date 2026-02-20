import { Event, EventSeries, EventType } from '@prisma/client';
import { MAX_HOUR } from '../../config';

export type LessonDTO = {
    id: number;
    date: Date;
    name: string;
    description: string;
    startHour: number;
    endHour: number;
    isCanceled: boolean;
    isOverridden: boolean;
    price: number;
    isPaid: boolean;
    studentId: number;
    eventSeriesId?: number;
};

export type LessonSeriesDTO = {
    id: number;
    daysOfWeek: number[];
    name: string;
    description: string;
    startHour: number;
    endHour: number;
    price: number;
    studentId: number;
};

export type LessonDAO = Event & {
    startHour: number;
    endHour: number;
    price: number;
    isPaid: boolean;
    studentId: number;
};

export const toLessonDTO = (data: LessonDAO): LessonDTO => {
    return {
        id: data.id,
        date: data.date,
        name: data.name,
        description: data.description || '',
        startHour: data.startHour,
        endHour: data.endHour,
        isCanceled: data.isCanceled,
        isOverridden: data.isOverridden,
        price: data.price,
        isPaid: data.isPaid,
        studentId: data.studentId,
        eventSeriesId: data.eventSeriesId || undefined,
    };
};

export const mapEventSeriesToLessonSeriesDTO = (
    data: EventSeries,
): LessonSeriesDTO => {
    if (!data.studentId) {
        throw new Error('Missing student data');
    }
    if (!data.pattern) {
        throw new Error('Missing data data');
    }
    const days = JSON.parse(data.pattern);
    if (!Array.isArray(days)) {
        throw new Error('Wrong data pattern');
    }
    return {
        id: data.id,
        daysOfWeek: days,
        name: data.name,
        description: data.description || '',
        startHour: data.startHour || 0,
        endHour: data.endHour || MAX_HOUR,
        price: data.price || 0,
        studentId: data.studentId,
    };
};

export interface LessonFilters {
    date?: string; // Opcjonalna właściwość date
    month?: number;
    year?: number;
}

export { LessonDAO as Lesson, EventType };
