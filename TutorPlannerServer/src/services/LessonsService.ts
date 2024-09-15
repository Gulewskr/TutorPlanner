import { CONFIG } from '../config';
import { eventRepository } from '../models/event';
import { Lesson, lessonRepository } from '../models/lesson';
import { addWeeks } from 'date-fns';

interface LessonInput {
    name: string;
    description: string;
    student: number;
    price: number;
    date: Date;
    startHour: string;
    endHour: string;
    weekly: boolean;
}

interface lessonFilters {
    //TOOD add filters
}

class LessonsService {
    public async getLesson(id: number): Promise<Lesson> {
        const lesson = await lessonRepository.getLessonById(id);
        if (lesson == null) {
            throw new Error(`Could not find lesson`);
        }
        return lesson;
    }

    public async getLessons(filters?: lessonFilters): Promise<Lesson[]> {
        return await lessonRepository.getAllLessons();
    }

    public async createLssson(lesson: LessonInput): Promise<void> {
        const event = await eventRepository.createEvent({
            name: lesson.name,
            description: lesson.description,
            startHour: lesson.startHour,
            endHour: lesson.endHour,
            type: lesson.weekly ? 'WEEKLY' : 'SINGLE',
            isCanceled: false,
        });
        if (event.type === 'SINGLE') {
            await lessonRepository.createLesson({
                studentId: lesson.student,
                price: lesson.price,
                isPaid: false,
                date: lesson.date,
                description: lesson.description,
                startHour: lesson.startHour,
                endHour: lesson.endHour,
                isCanceled: false,
                event: {
                    connect: {
                        id: event.id,
                    },
                },
            });
        } else {
            const inputData = [];
            let lessonDate = lesson.date;
            while (lessonDate < CONFIG.MAX_LESSONS_DATE) {
                inputData.push({
                    studentId: lesson.student,
                    price: lesson.price,
                    isPaid: false,
                    date: lesson.date,
                    description: lesson.description,
                    startHour: lesson.startHour,
                    endHour: lesson.endHour,
                    isCanceled: false,
                    eventId: event.id,
                });
                lessonDate = addWeeks(lessonDate, 1);
            }
            await lessonRepository.createLessons(inputData);
        }
    }

    public async updateLesson(
        lessonId: number,
        data: Partial<LessonInput>,
    ): Promise<void> {
        await lessonRepository.updateLesson(lessonId, data);
    }

    public async updateLessonSeries(
        lessonId: number,
        data: Partial<LessonInput>,
    ): Promise<void> {
        await lessonRepository.updateLessonSeries(lessonId, data);
    }

    public async markLessonAsPaid(lessonId: number): Promise<void> {
        await lessonRepository.updateLesson(lessonId, { isPaid: true });
    }

    public async cancelLesson(lessonId: number): Promise<void> {
        await lessonRepository.updateLesson(lessonId, { isCanceled: true });
    }
}

export default new LessonsService();
