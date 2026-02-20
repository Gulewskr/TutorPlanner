import { EventSeriesType, Prisma } from '@prisma/client';
import { addWeeks, endOfMonth, getDay } from 'date-fns';
import { CONFIG } from '../config';
import {
    EventType,
    Lesson,
    LessonDAO,
    LessonDTO,
    LessonFilters,
    mapEventSeriesToLessonSeriesDTO,
    toLessonDTO,
} from '../models/lessons/lesson';
import { parseDate, toMySQLDate } from '../utils/utils';

// repositories
import { eventSeriesRepository } from '../models/eventSeries';
import { lessonRepository } from '../repositories/lessonsRepository';
import { eventRepository } from '../repositories/eventsRepository';

import StudentPaymentsService from './StudentPaymentsService';
import EventsService from './events/EventsService';
import { CreateLesson, createLessonSchema } from '../models/lessons/create-lesson.schema';
import { updateLessonSchema } from '../models/lessons/update-lesson.schema';
import { updateLessonSeriesSchema } from '../models/lessons/update-lessonSeries.schema';

export type LessonSeriesDTO = {
    id: number;
    daysOfWeek: number[];
    name: string;
    description: string;
    startHour: number;
    endHour: number;
    price: number;
    studentId: number;
};

interface Pagable<T> {
    data: T[];
    size: number;
    page: number;
    pageSize: number;
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
            isCanceled: { not: true },
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
        filter.isPaid = { not: true };
        filter.isCanceled = { not: true };
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
                data: pageResults.data.map((v: LessonDAO) => toLessonDTO(v)),
            };
        }
        const lessons = await lessonRepository.getLessons(filter);
        return lessons.map((l: Lesson) => toLessonDTO(l));
    }

    public async getStudentLessons(studentId: number): Promise<Lesson[]> {
        return await lessonRepository.getLessonsByStudentId(studentId);
    }

    public async getStudentWeeklyLessons(
        studentId: number,
    ): Promise<LessonSeriesDTO[]> {
        const res =
            await lessonRepository.getLessonsSeriesByStudentId(studentId);
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

    public async createLesson(
        data: CreateLesson,
    ): Promise<LessonDTO> {
        const lesson = createLessonSchema.parse(data);
        if (!lesson.weekly) {
            const createdLesson = await lessonRepository.create({
                name: lesson.name,
                description: lesson.description,
                date: lesson.date,
                date_text: toMySQLDate(lesson.date),
                price: lesson.price,
                startHour: lesson.startHour,
                endHour: lesson.endHour,
                studentId: lesson.student
            });
            return toLessonDTO(createdLesson);
        } else {
            const series = await eventSeriesRepository.createEventSeries({
                name: lesson.name,
                description: lesson.description,
                startHour: lesson.startHour,
                endHour: lesson.endHour,
                type: EventSeriesType.WEEKLY,
                pattern: JSON.stringify([getDay(lesson.date)]),
                studentId: lesson.student,
                isCanceled: false,
            });
            const inputData: Prisma.EventCreateManyInput[] = [];
            let lessonDate = lesson.date;
            while (lessonDate < CONFIG.MAX_DATE) {
                inputData.push({
                    date: lessonDate,
                    date_text: toMySQLDate(lessonDate),
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
            await eventRepository.bulkCreate(inputData);
            const createdLesson =
                await lessonRepository.getNextLessonBySeriesId(series.id);
            const lessonDTO = toLessonDTO(createdLesson);
            lessonDTO.isPaid = false;
            lessonDTO.eventSeriesId = series.id;
            return lessonDTO;
        }
    }

    public async deleteLesson(id: number): Promise<LessonDAO> {
        const updatedLesson = await lessonRepository.update(id, {
            isDeleted: true,
        });
        return updatedLesson;
    }

    public async updateLesson(
        lessonId: number,
        data: Partial<CreateLesson>,
    ): Promise<LessonDTO> {
        const updateData = updateLessonSchema.parse(data);
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
            isCanceled: false,
            isOverridden: true,
        });
        return toLessonDTO(createdLesson);
    }

    public async updateLessonsTypeSeries(
        seriesId: number,
        data: Partial<CreateLesson>,
    ): Promise<void> {
        const updateData = updateLessonSeriesSchema.parse(data);
        await lessonRepository.updateLessonSeriesBySeriesId(
            seriesId,
            updateData,
        );
    }

    public async updateSeriesOfLesson(
        lessonId: number,
        data: Partial<CreateLesson>,
    ): Promise<void> {
        const updateData = updateLessonSeriesSchema.parse(data);
        await eventRepository.updateSeriesOfEvents(
            lessonId,
            updateData,
        );
    }

    public async markLessonAsPaid(lessonId: number): Promise<void> {
        await lessonRepository.update(lessonId, {
            isPaid: true,
        });
    }

    public async updateLessonCancelationStatus(
        lessonId: number,
        isCancelled: boolean,
    ): Promise<void> {
        const updatedLesson = await EventsService.cancelEvent(lessonId, isCancelled);
        if (updatedLesson.studentId == undefined) {
            throw new Error(`MISSING 'studentId' field for LESSON with id: ${lessonId}`)
        }
        await StudentPaymentsService.recalculateStudentBalance(
            updatedLesson.studentId,
        );
    }

    public async updateLessonsSeriesCancelationStatus(
        lessonId: number,
        isCancelled: boolean,
    ): Promise<void> {
        const lesson = await lessonRepository.getLessonById(lessonId);
        if (!lesson || !lesson.eventSeriesId) {
            throw new Error('Event is not part of series');
        }
        //TODO -> transaction
        await eventSeriesRepository.updateEventSeries(
            lesson.eventSeriesId,
            {
                isCanceled: isCancelled,
            },
        );
        await lessonRepository.bulkUpdateByFilter(
            {
                isCanceled: isCancelled,
            },
            {
                eventSeriesId: lesson.eventSeriesId,
                date: {
                    gte: lesson.date,
                },
            },
        );
        await StudentPaymentsService.recalculateStudentBalance(
            lesson.studentId,
        );
    }

    public async deleteLessonsSeries(
        lessonId: number
    ): Promise<void> {
        const lesson = await lessonRepository.getLessonById(lessonId);
        if (!lesson || !lesson.eventSeriesId) {
            throw new Error('Event is not part of series');
        }
        const eventSeries = await eventSeriesRepository.getEventSeriesById(lesson.eventSeriesId);
        if (!eventSeries || !eventSeries.isCanceled) {
            throw new Error('Event series needs to be canceled before delete.');
        }
        //TODO -> transaction
        await eventSeriesRepository.updateEventSeries(
            lesson.eventSeriesId,
            {
                isDeleted: true,
            },
        );
        await lessonRepository.bulkUpdateByFilter(
            {
                isDeleted: true,
            },
            {
                eventSeriesId: lesson.eventSeriesId,
                date: {
                    gte: lesson.date,
                },
                isCanceled: true
            },
        );
        await StudentPaymentsService.recalculateStudentBalance(
            lesson.studentId,
        );
    }
}

export default new LessonsService();
