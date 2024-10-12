import { Event, EventType } from '@prisma/client';
import { LessonDTO } from '../dto/lessons';

export type LessonDAO = Event & {
    startHour: string;
    endHour: string;
    price: number;
    isPaid: boolean;
    studentId: number;
};

export type UpdateLessonInput = {
    name: string;
    description: string;
    startHour: string;
    endHour: string;
    price: number;
    isPaid: boolean;
    date: Date;
    isCanceled: boolean;
    studentId: number;
};

export const toLessonDTO = (data: LessonDAO): LessonDTO => {
    return {
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

export { LessonDAO as Lesson, EventType };
