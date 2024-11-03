import { EventSeriesType, Prisma } from '@prisma/client';
import { addWeeks, endOfMonth, getDay } from 'date-fns';
import { CONFIG } from '../config';
import { eventSeriesRepository } from '../models/eventSeries';
import {
    CreateLessonRequestBody,
    EventType,
    Lesson,
    LessonDAO,
    LessonDTO,
    LessonFilters,
    mapEventSeriesToLessonSeriesDTO,
    toLessonDTO,
} from '../models/lesson';
import { lessonRepository } from '../repositories/lessonsRepository';
import { Pagable } from '../../../TutorPlanner_shared/Pagable';
import { parseDate } from '../utils/utils';
// validators
import {
    LessonCreateInputSchema,
    LessonUpdateInputSchema,
} from '../validators/lessons/lesson';
import { LessonSeriesUpdateInputSchema } from '../validators/lessons/lessonSeries';
import { LessonSeriesDTO } from '../../../TutorPlanner_shared/LessonDTO';

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

    public async getStudentWeeklyLessons(
        studnetId: number,
    ): Promise<LessonSeriesDTO[]> {
        const res =
            await lessonRepository.getLessonsSeriesByStudentId(studnetId);
        return res.map(l => mapEventSeriesToLessonSeriesDTO(l));
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
        const lessonInputData = LessonCreateInputSchema.parse(lesson);
        if (!lessonInputData.weekly) {
            const createdLesson = await lessonRepository.create({
                name: lessonInputData.name,
                description: lessonInputData.description,
                date: lessonInputData.date,
                eventType: EventType.LESSON,
                price: lessonInputData.price,
                startHour: lessonInputData.startHour,
                endHour: lessonInputData.endHour,
                student: {
                    connect: {
                        id: lessonInputData.student,
                    },
                },
            });
            return toLessonDTO(createdLesson);
        } else {
            const series = await eventSeriesRepository.createEventSeries({
                name: lessonInputData.name,
                description: lessonInputData.description,
                startHour: lessonInputData.startHour,
                endHour: lessonInputData.endHour,
                type: EventSeriesType.WEEKLY,
                pattern: JSON.stringify([getDay(lesson.date)]),
                studentId: lessonInputData.student,
                isCanceled: false,
            });
            const inputData: Prisma.EventCreateManyInput[] = [];
            let lessonDate = lesson.date;
            while (lessonDate < CONFIG.MAX_DATE) {
                inputData.push({
                    date: lessonDate,
                    eventType: EventType.LESSON,
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
            const lessonDTO = toLessonDTO(createdLesson);
            lessonDTO.isPaid = false;
            lessonDTO.eventSeriesId = series.id;
            return lessonDTO;
        }
    }

    public async deleteLesson(lessonId: number): Promise<LessonDAO> {
        return await lessonRepository.deleteLesson(lessonId);
    }

    public async updateLesson(
        lessonId: number,
        data: Partial<CreateLessonRequestBody>,
    ): Promise<LessonDTO> {
        const updateData = LessonUpdateInputSchema.parse(data);
        const createdLesson = await lessonRepository.update(lessonId, {
            name: updateData.name,
            date: updateData.date,
            startHour: updateData.startHour,
            endHour: updateData.endHour,
            price: updateData.price,
            student: {
                connect: {
                    id: updateData.student,
                },
            },
            description: updateData.description,
            isOverridden: true,
        });
        return toLessonDTO(createdLesson);
    }

    public async updateLessonSeries(
        lessonId: number,
        data: Partial<CreateLessonRequestBody>,
    ): Promise<void> {
        const updateData = LessonSeriesUpdateInputSchema.parse(data);
        await lessonRepository.updateLessonSeriesByEventId(
            lessonId,
            updateData,
        );
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
