import { EventSeriesType, Prisma } from '@prisma/client';
import { CONFIG } from '../config';
import { eventSeriesRepository } from '../models/eventSeries';
import {
    CreateLessonRequestBody,
    EventType,
    Lesson,
    LessonDAO,
    LessonDTO,
    LessonFilters,
    toLessonDTO,
} from '../models/lesson';
import { addWeeks, endOfMonth } from 'date-fns';
import { z } from 'zod';
import { lessonRepository } from '../repositories/lessonsRepository';
import { Pagable } from '../../../TutorPlanner_shared/Pagable';
import { parseDate } from '../utils/utils';

const HOUR_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

const isValidHourFormat = (key: string) => {
    if (!HOUR_REGEX.test(key)) {
        throw new Error(`Invalid hour format - 00:00 - ${key}`);
    }
};

const MAX_HOUR = 60 * 24;

const LessonInputSchema = z.object({
    name: z.string(),
    description: z.string().nullish(),
    student: z.number(),
    price: z.number(),
    date: z.date(),
    startHour: z.number().min(0).max(MAX_HOUR),
    endHour: z.number().min(0).max(MAX_HOUR),
    weekly: z.boolean().nullish(),
});

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

    public async getLessons(filters: LessonFilters): Promise<Lesson[]> {
        if (filters.date) {
            const data = parseDate(filters.date);
            return await lessonRepository.getLessonsByDay(data);
        }

        if (filters.month && filters.year) {
            const startOfMonth = new Date(filters.year, filters.month - 1, 1);
            return await lessonRepository.getLessons({
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth(startOfMonth),
                },
            });
        }

        return await lessonRepository.getAllLessons();
    }

    public async getCurrentOverdueLessons(): Promise<
        LessonDTO[] | Pagable<LessonDTO>
    > {
        const lessons = await lessonRepository.getLessons({
            isPaid: false,
            date: {
                lte: new Date(),
            },
        });
        return lessons.map(l => toLessonDTO(l));
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

    public async getNextStudentLessons(
        studentId: number,
    ): Promise<LessonDAO | undefined> {
        return await lessonRepository.getNextLessonByStudentId(studentId);
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
        lesson: CreateLessonRequestBody,
    ): Promise<LessonDTO> {
        return await this.createLesson({
            ...lesson,
            student: studnetId,
        });
    }

    public async createLesson(
        lesson: CreateLessonRequestBody,
    ): Promise<LessonDTO> {
        LessonInputSchema.parse(lesson);
        if (!lesson.weekly) {
            const createdLesson = await lessonRepository.create({
                name: lesson.name,
                description: lesson.description,
                date: lesson.date,
                type: EventType.LESSON,
                price: lesson.price,
                startHour: lesson.startHour,
                endHour: lesson.endHour,
                student: {
                    connect: {
                        id: lesson.student,
                    },
                },
            });
            return {
                id: createdLesson.id,
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
            while (lessonDate < CONFIG.MAX_DATE) {
                inputData.push({
                    date: lessonDate,
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
            await lessonRepository.bulkCreate(inputData);
            const createdLesson =
                await lessonRepository.getNextLessonBySeriesId(series.id);
            return {
                id: createdLesson.id,
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
                eventSeriesId: series.id,
            };
        }
    }

    public async deleteLesson(lessonId: number): Promise<LessonDAO> {
        return await lessonRepository.deleteLesson(lessonId);
    }

    public async updateLesson(
        lessonId: number,
        data: Partial<CreateLessonRequestBody>,
    ): Promise<void> {
        //TODO
        await lessonRepository.update(lessonId, {
            isOverridden: true,
        });
    }

    public async updateLessonSeries(
        lessonId: number,
        data: Partial<CreateLessonRequestBody>,
    ): Promise<void> {
        await lessonRepository.updateLessonSeriesByEventId(lessonId, data);
    }

    public async markLessonAsPaid(lessonId: number): Promise<void> {
        await lessonRepository.update(lessonId, {
            isPaid: true,
        });
    }

    public async cancelLesson(lessonId: number): Promise<void> {
        await lessonRepository.update(lessonId, { isCanceled: true });
    }
}

export default new LessonsService();
