import { Event, EventSeries, EventType } from '@prisma/client';
import {
    LessonDTO,
    LessonSeriesDTO,
} from '../../../TutorPlanner_shared/LessonDTO';
import { MAX_HOUR } from '../validators/constraints';

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

export interface CreateLessonRequestBody {
    name: string;
    description: string;
    student: number;
    price: number;
    date: Date;
    startHour: number;
    endHour: number;
    weekly: boolean;
}

export { LessonDAO as Lesson, EventType };
export { LessonDTO };
