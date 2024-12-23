import { EventSeries, Prisma } from '@prisma/client';
import { prisma } from '../db';
import { LessonDAO } from '../models/lesson';
import { endOfDay, startOfDay } from 'date-fns';

interface Pagable<T> {
    data: T[];
    size: number;
    page: number;
    pageSize: number;
}

//TODO remove not related to Lesson type fucntions
export const lessonRepository = {
    create: async (lesson: Prisma.EventCreateInput): Promise<LessonDAO> => {
        return (await prisma.event.create({
            data: {
                ...lesson,
                eventType: 'LESSON',
            },
        })) as LessonDAO;
    },
    bulkCreate: async (
        inputData: Prisma.EventCreateManyInput[],
    ): Promise<Prisma.BatchPayload> => {
        return await prisma.event.createMany({
            data: inputData,
        });
    },
    getLessonById: async (id: number): Promise<LessonDAO | null> => {
        return (await prisma.event.findFirst({
            where: {
                eventType: 'LESSON',
                id: id,
            },
        })) as LessonDAO;
    },
    getLessonsByStudentId: async (studentId: number): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                eventType: 'LESSON',
                studentId: studentId,
            },
        })) as LessonDAO[];
    },
    getLessonsSeriesByStudentId: async (
        studentId: number,
    ): Promise<EventSeries[]> => {
        return await prisma.eventSeries.findMany({
            where: {
                eventType: 'LESSON',
                studentId: studentId,
            },
        });
    },
    getLessonByEventSeriesId: async (id: number): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                eventType: 'LESSON',
                eventSeriesId: id,
            },
        })) as LessonDAO[];
    },
    getAllLessons: async (): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                eventType: 'LESSON',
            },
            orderBy: {
                date: 'asc',
            },
        })) as LessonDAO[];
    },
    getLessonsInTimeFrame: async (
        startDate: Date,
        endDate: Date,
    ): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                eventType: 'LESSON',
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: {
                date: 'asc',
            },
        })) as LessonDAO[];
    },
    getLessonsByDay: async (date: Date): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                eventType: 'LESSON',
                date: {
                    gte: startOfDay(date),
                    lt: endOfDay(date),
                },
            },
            orderBy: {
                date: 'asc',
            },
        })) as LessonDAO[];
    },
    update: async (
        id: number,
        lesson: Prisma.EventUpdateInput,
    ): Promise<LessonDAO> => {
        return (await prisma.event.update({
            data: lesson,
            where: {
                id: id,
                eventType: 'LESSON',
            },
        })) as LessonDAO;
    },
    //TODO merge 2 functions
    bulkUpdateByFilter: async (
        lesson: Prisma.EventUpdateInput,
        filter: Prisma.EventWhereInput,
    ): Promise<Prisma.BatchPayload> => {
        filter.eventType = 'LESSON';
        return await prisma.event.updateMany({
            data: lesson,
            where: filter,
        });
    },
    bulkUpdate: async (
        lessonsId: number[],
        lesson: Prisma.EventUpdateInput,
    ): Promise<Prisma.BatchPayload> => {
        return await prisma.event.updateMany({
            where: {
                id: {
                    in: lessonsId,
                },
                eventType: 'LESSON',
            },
            data: lesson,
        });
    },
    updateLessonSeriesByEventId: async (
        id: number,
        lesson: {
            name: string;
            description?: string | null;
            startHour: number;
            endHour: number;
            price: number;
            student: number;
        },
    ): Promise<void> => {
        //TODO - transaction
        await prisma.eventSeries.update({
            data: {
                name: lesson.name,
                description: lesson.description,
                startHour: lesson.startHour,
                endHour: lesson.endHour,
                price: lesson.price,
                studentId: lesson.student,
            },
            where: {
                id: id,
            },
        });
        await prisma.event.updateMany({
            data: {
                name: lesson.name,
                description: lesson.description,
                startHour: lesson.startHour,
                endHour: lesson.endHour,
                price: lesson.price,
                studentId: lesson.student,
            },
            where: {
                isOverridden: false,
                eventSeriesId: id,
                date: {
                    gte: new Date(),
                },
            },
        });
    },
    deleteLesson: async (id: number): Promise<LessonDAO> => {
        return (await prisma.event.delete({
            where: {
                id: id,
            },
        })) as LessonDAO;
    },
    getLessons: async (
        filter: Prisma.EventWhereInput,
    ): Promise<LessonDAO[]> => {
        filter.eventType = 'LESSON';

        return (await prisma.event.findMany({
            where: filter,
            orderBy: {
                date: 'asc',
            },
        })) as LessonDAO[];
    },
    getNextLessonByStudentId: async (
        studentId: number,
    ): Promise<LessonDAO | undefined> => {
        try {
            return (await prisma.event.findFirstOrThrow({
                where: {
                    studentId: studentId,
                    eventType: 'LESSON',
                    date: {
                        gte: new Date(),
                    },
                },
                orderBy: {
                    date: 'asc',
                },
            })) as LessonDAO;
        } catch (e: any) {
            if ('code' in e && e.code === 'P2025') {
                return undefined;
            }
            console.log(JSON.stringify(e));
            throw new Error('lesson not found');
        }
    },
    getNextLessonBySeriesId: async (seriesId: number): Promise<LessonDAO> => {
        return (await prisma.event.findFirstOrThrow({
            where: {
                eventSeriesId: seriesId,
                eventType: 'LESSON',
                date: {
                    gte: new Date(),
                },
            },
            orderBy: {
                date: 'asc',
            },
        })) as LessonDAO;
    },
    getPagableLessons: async ({
        pageSize,
        page,
        filter: systemFilter,
    }: {
        pageSize?: number;
        page?: number;
        filter?: Prisma.EventWhereInput;
    }): Promise<Pagable<LessonDAO>> => {
        const filter: Prisma.EventWhereInput = systemFilter || {};
        filter.eventType = 'LESSON';

        const startIndex = page && pageSize ? page * pageSize : undefined;

        const amount = await prisma.event.count({
            where: filter,
        });

        const data = (await prisma.event.findMany({
            skip: startIndex,
            take: pageSize,
            where: filter,
            orderBy: {
                date: 'asc',
            },
        })) as LessonDAO[];

        return {
            data: data,
            size: amount,
            page: page || 0,
            pageSize: pageSize || amount,
        };
    },
    getSumOfPaidLessonsByStudentId: async (
        studentId: number,
    ): Promise<number> => {
        const res = await prisma.event.groupBy({
            where: {
                eventType: 'LESSON',
                studentId: studentId,
                isPaid: true,
                isCanceled: { not: true },
            },
            by: 'studentId',
            _sum: {
                price: true,
            },
        });
        return res[0]?._sum?.price || 0;
    },
    getUnpaidLessonsByStudentId: async (
        studentId: number,
    ): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                eventType: 'LESSON',
                studentId: studentId,
                isPaid: false,
                isCanceled: { not: true },
            },
            orderBy: {
                date: 'asc',
            },
        })) as LessonDAO[];
    },
    getPaidLessonsByStudentId: async (
        studentId: number,
    ): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                eventType: 'LESSON',
                studentId: studentId,
                isPaid: true,
                isCanceled: { not: true },
            },
            orderBy: {
                date: 'desc',
            },
        })) as LessonDAO[];
    },
};
