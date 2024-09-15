import { PrismaClient, Prisma, Lesson } from '@prisma/client';

const prisma = new PrismaClient();

const lessonRepository = {
    getLessonById: async (id: number): Promise<Lesson | null> => {
        return await prisma.lesson.findFirst({
            where: {
                id: id,
            },
        });
    },
    getLessonByEventId: async (id: number): Promise<Lesson[]> => {
        return await prisma.lesson.findMany({
            where: {
                eventId: id,
            },
        });
    },
    getAllLessons: async (
        filter?: Prisma.LessonWhereInput,
    ): Promise<Lesson[]> => {
        return await prisma.lesson.findMany({
            where: filter,
        });
    },
    getLessonsInTimeFrame: async (
        startDate: Date,
        endDate: Date,
    ): Promise<Lesson[]> => {
        return await prisma.lesson.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
    },
    createLesson: async (lesson: Prisma.LessonCreateInput): Promise<Lesson> => {
        return await prisma.lesson.create({
            data: lesson,
        });
    },
    createLessons: async (
        inputData: Prisma.LessonCreateManyInput[],
    ): Promise<Prisma.BatchPayload> => {
        return await prisma.lesson.createMany({
            data: inputData,
        });
    },
    updateLesson: async (
        id: number,
        lesson: Prisma.LessonUpdateInput,
    ): Promise<Lesson> => {
        return await prisma.lesson.update({
            data: lesson,
            where: {
                id: id,
            },
        });
    },
    updateLessonSeries: async (
        id: number,
        lesson: Prisma.LessonUpdateInput,
    ): Promise<void> => {
        const eventSeries = await prisma.lesson.findFirst({
            select: {
                eventId: true,
            },
            where: {
                id: id,
            },
        });
        if (eventSeries == null) {
            throw new Error('Bad Input event not found');
        }
        await prisma.event.update({
            data: lesson,
            where: {
                id: eventSeries.eventId,
            },
        });
        await prisma.lesson.updateMany({
            data: lesson,
            where: {
                eventId: eventSeries.eventId,
                date: {
                    gte: new Date(),
                },
            },
        });
    },
    deleteLesson: async (id: number): Promise<Lesson> => {
        return await prisma.lesson.delete({
            where: {
                id: id,
            },
        });
    },
};

export { lessonRepository, Lesson };
