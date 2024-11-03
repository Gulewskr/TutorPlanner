import { Event, EventType } from '@prisma/client';
import { LessonDTO } from '../../../TutorPlanner_shared/LessonDTO';

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
