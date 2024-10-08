import { PrismaClient, Prisma, Event, EventType } from '@prisma/client';

const prisma = new PrismaClient();

export type LessonDAO = Event & {
    startHour: string;
    endHour: string;
    price: number;
    isPaid: boolean;
    studentId: number;
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

//TODO remove not related to Lesson type fucntions
const lessonRepository = {
    createLesson: async (
        lesson: Prisma.EventCreateInput,
    ): Promise<LessonDAO> => {
        return (await prisma.event.create({
            data: {
                ...lesson,
                type: 'LESSON',
            },
        })) as LessonDAO;
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
    getAllLessons: async (
        filter?: Prisma.EventWhereInput,
    ): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                ...filter,
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
    getLessonsByDay: async (date: string): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                type: 'LESSON',
                date: {
                    gte: new Date(`${date}T00:00:00.000Z`), // Początek dnia
                    lt: new Date(`${date}T23:59:59.999Z`), // Koniec dnia
                },
            },
            orderBy: {
                date: 'asc',
            },
        })) as LessonDAO[];
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
        return (await prisma.event.update({
            data: lesson,
            where: {
                id: id,
                type: 'LESSON',
            },
        })) as LessonDAO;
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
    },
    deleteLesson: async (id: number): Promise<LessonDAO> => {
        return (await prisma.event.delete({
            where: {
                id: id,
            },
        })) as LessonDAO;
    },
};

export { lessonRepository, LessonDAO as Lesson, EventType };
