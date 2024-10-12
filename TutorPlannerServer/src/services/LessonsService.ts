import { EventSeriesType, Prisma } from '@prisma/client';
import { CONFIG } from '../config';
import { eventSeriesRepository } from '../models/eventSeries';
import { EventType, Lesson, LessonDAO, toLessonDTO } from '../models/lesson';
import { addWeeks, endOfMonth } from 'date-fns';
import { LessonDTO } from '../dto/lessons';
import { z } from 'zod';
import { lessonRepository } from '../repositories/lessonsRepository';
import { Pagable } from '../../../TutorPlanner_shared/Pagable';

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

const LessonInputSchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    student: z.number(),
    price: z.number(),
    date: z.date(),
    startHour: z.string(),
    endHour: z.string(),
    weekly: z.boolean(),
});

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

    public async getOverdueLessons({
        studentId,
        month,
        year,
        page,
        pageSize,
    }: {
        studentId?: number;
        month?: number;
        year?: number;
        page?: number;
        pageSize?: number;
    }): Promise<LessonDTO[] | Pagable<LessonDTO>> {
        const filter: Prisma.EventWhereInput = {};
        if (studentId !== undefined) {
            filter.studentId = studentId;
        }
        if (year && month) {
            const startOfMonth = new Date(year, month - 1, 1);
            filter.date = {
                gte: startOfMonth,
                lte: endOfMonth(startOfMonth),
            };
        }
        if (page !== undefined || pageSize !== undefined) {
            const pageResults = await lessonRepository.getPagableLessons({
                page,
                pageSize,
                filter,
            });
            return {
                page: pageResults.page,
                pageSize: pageResults.pageSize,
                size: pageResults.size,
                data: pageResults.data.map(v => toLessonDTO(v)),
            };
        }
        const lessons = await lessonRepository.getLessons(filter);
        return lessons.map(l => toLessonDTO(l));
    }

    public async getStudentLessons(studnetId: number): Promise<Lesson[]> {
        return await lessonRepository.getLessonsByStudentId(studnetId);
    }

    public async getNotPaidStudentLessons(
        studentId: number,
    ): Promise<LessonDAO[]> {
        return await lessonRepository.getLessons({
            studentId: studentId,
            date: {
                lt: new Date(),
            },
            isPaid: false,
        });
    }

    public async getPaidStudentLessons(
        studentId: number,
    ): Promise<PayedLessonsData> {
        const lessons: LessonDAO[] = await lessonRepository.getLessons({
            studentId: studentId,
            isPaid: true,
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
        return await lessonRepository.getLessons({
            studentId: studentId,
            isPaid: false,
        });
    }

    public async addUserLesson(
        studnetId: number,
        lesson: LessonInput,
    ): Promise<LessonDTO> {
        return await this.createLssson({
            ...lesson,
            student: studnetId,
        });
    }

    public async createLssson(lesson: LessonInput): Promise<LessonDTO> {
        LessonInputSchema.parse(lesson);
        if (!lesson.weekly) {
            const createdLesson = await lessonRepository.createLesson({
                name: lesson.name,
                date: lesson.date,
                type: EventType.LESSON,
                price: lesson.price,
                student: {
                    connect: {
                        id: lesson.student,
                    },
                },
            });
            return {
                name: createdLesson.name,
                date: createdLesson.date,
                isCanceled: createdLesson.isCanceled,
                isOverridden: createdLesson.isOverridden,
                description: createdLesson.description || '',
                startHour: createdLesson.startHour,
                endHour: createdLesson.endHour,
                price: createdLesson.price,
                isPaid: false,
                studentId: createdLesson.studentId,
            };
        } else {
            const series = await eventSeriesRepository.createEventSeries({
                name: lesson.name,
                description: lesson.description,
                startHour: lesson.startHour,
                endHour: lesson.endHour,
                type: EventSeriesType.WEEKLY,
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
            return {
                name: lesson.name,
                date: lesson.date,
                isCanceled: false,
                isOverridden: false,
                description: lesson.description || '',
                startHour: series.startHour || lesson.startHour,
                endHour: series.endHour || lesson.endHour,
                price: lesson.price,
                isPaid: false,
                studentId: lesson.student,
                eventSeriesId: series.id,
            };
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
