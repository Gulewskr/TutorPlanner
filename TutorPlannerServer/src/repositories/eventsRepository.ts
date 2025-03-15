import { Prisma } from '@prisma/client';
import { prisma } from '../db';
import { EventDAO } from '../models/event';

export const eventRepository = {
    getEventById: async (id: number): Promise<EventDAO> => {
        return await prisma.event.findFirstOrThrow({
            where: {
                id: id,
            },
        });
    },
    getAllEvents: async (): Promise<EventDAO[]> => {
        return await prisma.event.findMany();
    },
    getEvents: async (filter: Prisma.EventWhereInput): Promise<EventDAO[]> => {
        return await prisma.event.findMany({
            where: filter
        });
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
    getNextBySeriesId: async (seriesId: number): Promise<EventDAO> => {
        return (await prisma.event.findFirstOrThrow({
            where: {
                eventSeriesId: seriesId,
                date: {
                    gte: new Date(),
                },
            },
            orderBy: {
                date: 'asc',
            },
        })) as EventDAO;
    },
    createEvent: async (event: Prisma.EventCreateInput): Promise<EventDAO> => {
        return await prisma.event.create({
            data: event,
        });
    },
    bulkCreate: async (
        inputData: Prisma.EventCreateManyInput[],
    ): Promise<Prisma.BatchPayload> => {
        return await prisma.event.createMany({
            data: inputData,
        });
    },
    update: async <T = EventDAO>(
        id: number,
        event: Prisma.EventUpdateInput,
    ): Promise<T> => {
        return await prisma.event.update({
            data: event,
            where: {
                id: id,
            },
        }) as T;
    },
    delete: async <T = EventDAO>(id: number): Promise<T> => {
        return await prisma.event.delete({
            where: {
                id: id,
            },
        }) as T;
    },
};
