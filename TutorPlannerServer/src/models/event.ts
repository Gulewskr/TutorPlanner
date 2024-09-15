import { PrismaClient, Prisma, Event } from '@prisma/client';

const prisma = new PrismaClient();

const eventRepository = {
    getEventById: async (id: number): Promise<Event | null> => {
        return await prisma.event.findFirst({
            where: {
                id: id,
            },
        });
    },
    getAllEvents: async (): Promise<Event[]> => {
        return await prisma.event.findMany();
    },
    getEventsInTimeFrame: async (
        startDate: Date,
        endDate: Date,
    ): Promise<Event[]> => {
        return await prisma.event.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
    },
    createEvent: async (event: Prisma.EventCreateInput): Promise<Event> => {
        return await prisma.event.create({
            data: event,
        });
    },
    updateEvent: async (
        id: number,
        event: Prisma.EventCreateInput,
    ): Promise<Event> => {
        return await prisma.event.update({
            data: event,
            where: {
                id: id,
            },
        });
    },
    deleteEvent: async (id: number): Promise<Event> => {
        return await prisma.event.delete({
            where: {
                id: id,
            },
        });
    },
};

export { eventRepository, Event };