import { PrismaClient, Prisma, SingleEvent as Event } from '@prisma/client';

const prisma = new PrismaClient();

const eventRepository = {
    getEventById: async (id: number): Promise<Event | null> => {
        return await prisma.singleEvent.findFirst({
            where: {
                id: id,
            },
        });
    },
    getAllEvents: async (): Promise<Event[]> => {
        return await prisma.singleEvent.findMany();
    },
    getEventsInTimeFrame: async (
        startDate: Date,
        endDate: Date,
    ): Promise<Event[]> => {
        return await prisma.singleEvent.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
    },
    createEvent: async (
        event: Prisma.SingleEventCreateInput,
    ): Promise<Event> => {
        return await prisma.singleEvent.create({
            data: event,
        });
    },
    updateEvent: async (
        id: number,
        event: Prisma.SingleEventCreateInput,
    ): Promise<Event> => {
        return await prisma.singleEvent.update({
            data: event,
            where: {
                id: id,
            },
        });
    },
    deleteEvent: async (id: number): Promise<Event> => {
        return await prisma.singleEvent.delete({
            where: {
                id: id,
            },
        });
    },
};

export { eventRepository, Event };
