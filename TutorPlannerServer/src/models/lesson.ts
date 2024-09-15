import { PrismaClient, Prisma, Event, EventType } from '@prisma/client';

const prisma = new PrismaClient();

export type LessonDAO = Event & {
    lessonData: {
        id: number;
        price: number;
        isPaid: boolean;
        studentId: number;
    } | null;
};

type UpdateLessonInput = {
    name: string;
    description: string;
    startHour: string;
    endHour: string;
    price: number;
    isPaid: boolean;
    date: Date;
    isCanceled: boolean;
    studentId: number;
};

const lessonRepository = {
    createLesson: async (
        lesson: Prisma.EventCreateInput,
    ): Promise<LessonDAO> => {
        return await prisma.event.create({
            data: {
                ...lesson,
                type: 'LESSON',
            },
            include: {
                lessonData: true,
            },
        });
    },
    getLessonById: async (id: number): Promise<LessonDAO | null> => {
        return await prisma.event.findFirst({
            include: {
                lessonData: true,
            },
            where: {
                id: id,
            },
        });
    },
    getLessonByEventSeriesId: async (id: number): Promise<LessonDAO[]> => {
        return await prisma.event.findMany({
            include: {
                lessonData: true,
            },
            where: {
                NOT: {
                    lessonData: null,
                },
                eventSeriesId: id,
            },
        });
    },
    getAllLessons: async (
        filter?: Prisma.EventWhereInput,
    ): Promise<LessonDAO[]> => {
        return await prisma.event.findMany({
            where: {
                ...filter,
                NOT: {
                    lessonData: null,
                },
            },
            include: {
                lessonData: true,
            },
            orderBy: {
                date: 'asc',
            },
        });
    },
    getLessonsInTimeFrame: async (
        startDate: Date,
        endDate: Date,
    ): Promise<LessonDAO[]> => {
        return await prisma.event.findMany({
            where: {
                NOT: {
                    lessonData: null,
                },
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                lessonData: true,
            },
            orderBy: {
                date: 'asc',
            },
        });
    },
    createLessons: async (
        inputData: Prisma.EventCreateManyInput[],
    ): Promise<Prisma.BatchPayload> => {
        return await prisma.event.createMany({
            data: inputData,
        });
    },
    updateLesson: async (
        id: number,
        lesson: Prisma.EventUpdateInput,
    ): Promise<LessonDAO> => {
        return await prisma.event.update({
            data: lesson,
            where: {
                id: id,
            },
            include: {
                lessonData: true,
            },
        });
    },
    updateLessonData: async (
        eventId: number,
        lesson: Prisma.LessonDataUpdateInput,
    ): Promise<LessonDAO> => {
        await prisma.lessonData.update({
            data: lesson,
            where: {
                eventId: eventId,
            },
        });
        return await prisma.event.findFirstOrThrow({
            include: {
                lessonData: true,
            },
            where: {
                id: eventId,
            },
        });
    },
    updateLessonSeriesByEventId: async (
        id: number,
        lesson: Partial<UpdateLessonInput>,
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
        await prisma.lessonData.updateMany({
            data: lesson,
            where: {
                event: {
                    eventSeriesId: eventSeries.eventSeriesId,
                },
            },
        });
    },
    deleteLesson: async (id: number): Promise<LessonDAO> => {
        return await prisma.event.delete({
            where: {
                id: id,
            },
            include: {
                lessonData: true,
            },
        });
    },
};

export { lessonRepository, LessonDAO as Lesson, EventType };
