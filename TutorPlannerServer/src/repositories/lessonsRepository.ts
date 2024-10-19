import { Prisma } from '@prisma/client';
import { prisma } from '../db';
import { CreateLessonRequestBody, LessonDAO } from '../models/lesson';
import { Pagable } from '../../../TutorPlanner_shared/Pagable';
import { endOfDay, startOfDay } from 'date-fns';

//TODO remove not related to Lesson type fucntions
export const lessonRepository = {
    create: async (lesson: Prisma.EventCreateInput): Promise<LessonDAO> => {
        return (await prisma.event.create({
            data: {
                ...lesson,
                type: 'LESSON',
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
                type: 'LESSON',
                id: id,
            },
        })) as LessonDAO;
    },
    getLessonsByStudentId: async (studentId: number): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                type: 'LESSON',
                studentId: studentId,
            },
        })) as LessonDAO[];
    },
    getLessonByEventSeriesId: async (id: number): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                type: 'LESSON',
                eventSeriesId: id,
            },
        })) as LessonDAO[];
    },
    getAllLessons: async (): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                type: 'LESSON',
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
                type: 'LESSON',
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
                type: 'LESSON',
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
                type: 'LESSON',
            },
        })) as LessonDAO;
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
                type: 'LESSON',
            },
            data: lesson,
        });
    },
    //TODO move to EventSeriesService
    updateLessonSeriesByEventId: async (
        id: number,
        lesson: Partial<CreateLessonRequestBody>,
    ): Promise<void> => {
        //TODO - transaction
        const eventSeries = await prisma.event.findFirst({
            select: {
                eventSeriesId: true,
            },
            where: {
                id: id,
            },
        });
        if (eventSeries == null || eventSeries.eventSeriesId == null) {
            throw new Error('Bad Input event not found');
        }
        await prisma.eventSeries.update({
            data: lesson,
            where: {
                id: eventSeries.eventSeriesId,
            },
        });
        await prisma.event.updateMany({
            data: {
                ...lesson,
            },
            where: {
                isOverridden: false,
                eventSeriesId: eventSeries.eventSeriesId,
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
        filter.type = 'LESSON';

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
                    type: 'LESSON',
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
                type: 'LESSON',
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
        filter.type = 'LESSON';

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
    getSumLessonsPriceByStudentId: async (
        studentId: number,
    ): Promise<number> => {
        const res = await prisma.event.groupBy({
            where: {
                type: 'LESSON',
                studentId: studentId,
                date: {
                    lte: new Date(),
                },
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
                type: 'LESSON',
                studentId: studentId,
                isPaid: false,
                date: {
                    lte: new Date(),
                },
            },
            orderBy: {
                date: 'asc',
            },
        })) as LessonDAO[];
    },
};
