import { Prisma } from '@prisma/client';
import { CONFIG } from '../config';
import { eventSeriesRepository } from '../models/eventSeries';
import {
    EventType,
    Lesson,
    LessonDAO,
    lessonRepository,
} from '../models/lesson';
import { addWeeks } from 'date-fns';

interface LessonInput {
    name: string;
    description: string;
    student?: number;
    price: number;
    date: Date;
    startHour: string;
    endHour: string;
    weekly: boolean;
}

interface lessonFilters {
    //TOOD
}

interface PayedLessonsData {
    lessons: LessonDAO[];
    sum: number;
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

    public async getStudentLessons(studnetId: number): Promise<Lesson[]> {
        return await lessonRepository.getLessonsByStudentId(studnetId);
    }

    public async getNotPaidStudentLessons(
        studentId: number,
    ): Promise<LessonDAO[]> {
        return await lessonRepository.getAllLessons({
            isPaid: true,
            studentId: studentId,
            date: {
                lt: new Date(),
            },
        });
    }

    public async getPaidStudentLessons(
        studentId: number,
    ): Promise<PayedLessonsData> {
        const lessons: LessonDAO[] = await lessonRepository.getAllLessons({
            isPaid: true,
            studentId: studentId,
        });
        const sum: number = lessons.reduce((a, b): number => b.price + a, 0);
        return {
            lessons,
            sum,
        };
    }

    public async getNextUnpaidedStudentLessons(
        studentId: number,
    ): Promise<LessonDAO[]> {
        return await lessonRepository.getAllLessons({
            isPaid: false,
            studentId: studentId,
        });
    }

    public async addUserLesson(
        studnetId: number,
        lesson: LessonInput,
    ): Promise<void> {
        return await this.createLssson({
            ...lesson,
            student: studnetId,
        });
    }

    public async createLssson(lesson: LessonInput): Promise<void> {
        if (!lesson.weekly) {
            await lessonRepository.createLesson({
                name: lesson.name,
                date: lesson.date,
                type: 'LESSON',
                price: lesson.price,
                student: {
                    connect: {
                        id: lesson.student,
                    },
                },
            });
        } else {
            const series = await eventSeriesRepository.createEventSeries({
                name: lesson.name,
                description: lesson.description,
                startHour: lesson.startHour,
                endHour: lesson.endHour,
                type: 'WEEKLY',
                isCanceled: false,
            });
            const inputData: Prisma.EventCreateManyInput[] = [];
            let lessonDate = lesson.date;
            while (lessonDate < CONFIG.MAX_LESSONS_DATE) {
                inputData.push({
                    date: lesson.date,
                    type: EventType.LESSON,
                    name: lesson.name,
                    description: lesson.description,
                    startHour: lesson.startHour,
                    endHour: lesson.endHour,
                    price: lesson.price,
                    studentId: lesson.student,
                    eventSeriesId: series.id,
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
        //TODO
        await lessonRepository.updateLesson(lessonId, {
            isOverridden: true,
        });
    }

    public async updateLessonSeries(
        lessonId: number,
        data: Partial<LessonInput>,
    ): Promise<void> {
        await lessonRepository.updateLessonSeriesByEventId(lessonId, data);
    }

    public async markLessonAsPaid(lessonId: number): Promise<void> {
        await lessonRepository.updateLesson(lessonId, {
            isPaid: true,
        });
    }

    public async cancelLesson(lessonId: number): Promise<void> {
        await lessonRepository.updateLesson(lessonId, { isCanceled: true });
    }
}

export default new LessonsService();