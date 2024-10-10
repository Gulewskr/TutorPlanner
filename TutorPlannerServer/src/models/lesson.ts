import { Event, EventType } from '@prisma/client';

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

export { LessonDAO as Lesson, EventType };
