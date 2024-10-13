import { Prisma } from '@prisma/client';
import { prisma } from '../db';
import { EventDAO } from '../models/event';

export const eventRepository = {
    getEventById: async (id: number): Promise<EventDAO | null> => {
        return await prisma.event.findFirst({
            where: {
                id: id,
            },
        });
    },
    getAllEvents: async (): Promise<EventDAO[]> => {
        return await prisma.event.findMany();
    },
    getEventsInTimeFrame: async (
        startDate: Date,
        endDate: Date,
    ): Promise<EventDAO[]> => {
        return await prisma.event.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
    },
    createEvent: async (event: Prisma.EventCreateInput): Promise<EventDAO> => {
        return await prisma.event.create({
            data: event,
        });
    },
    updateEvent: async (
        id: number,
        event: Prisma.EventCreateInput,
    ): Promise<EventDAO> => {
        return await prisma.event.update({
            data: event,
            where: {
                id: id,
            },
        });
    },
    deleteEvent: async (id: number): Promise<EventDAO> => {
        return await prisma.event.delete({
            where: {
                id: id,
            },
        });
    },
};
