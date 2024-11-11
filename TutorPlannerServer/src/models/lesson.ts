import { Event, EventType } from '@prisma/client';

export type LessonDTO = {
    id: number;
    date: Date;
    name: string;
    description: string;
    startHour: string;
    endHour: string;
    isCanceled: boolean;
    isOverridden: boolean;
    price: number;
    isPaid: boolean;
    studentId: number;
    eventSeriesId?: number;
};

export type LessonDAO = Event & {
    startHour: string;
    endHour: string;
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
    startHour: string;
    endHour: string;
    weekly: boolean;
}

export { LessonDAO as Lesson, EventType };
