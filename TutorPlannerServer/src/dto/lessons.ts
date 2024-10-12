import { EventDTO } from './events';

type LessonDTO = Omit<EventDTO, 'type'> & {
    price: number;
    isPaid: boolean;
    studentId: number;
    eventSeriesId?: number;
};

export { LessonDTO };
