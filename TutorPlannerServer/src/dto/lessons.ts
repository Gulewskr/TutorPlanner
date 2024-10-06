import { EventDTO } from './events';

type LessonDTO = Omit<EventDTO, 'type'> & {
    price: number;
    isPaid: boolean;
    studentId: number;
    eventSeriesId?: number;
};

type LessonsDTO = {
    data: LessonDTO[];
    size: number;
};

export { LessonDTO, LessonsDTO };
