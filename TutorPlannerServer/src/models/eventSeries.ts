import { Prisma, EventSeries } from '@prisma/client';
import { prisma } from '../db';

const eventSeriesRepository = {
    getEventSeriesById: async (id: number): Promise<EventSeries | null> => {
        return await prisma.eventSeries.findFirst({
            where: {
                id: id,
            },
        });
    },
    getAllEventSeriess: async (): Promise<EventSeries[]> => {
        return await prisma.eventSeries.findMany();
    },
    createEventSeries: async (
        eventSeries: Prisma.EventSeriesCreateInput,
    ): Promise<EventSeries> => {
        //TODO - add transaction - for eventSeries series
        return await prisma.eventSeries.create({
            data: eventSeries,
        });
    },
    updateEventSeries: async (
        id: number,
        eventSeries: Prisma.EventSeriesUpdateInput,
    ): Promise<EventSeries> => {
        return await prisma.eventSeries.update({
            data: eventSeries,
            where: {
                id: id,
            },
        });
    },
    deleteEventSeries: async (id: number): Promise<EventSeries> => {
        //TODO - add transaction
        await prisma.event.deleteMany({ where: { eventSeriesId: id } });
        return await prisma.eventSeries.delete({
            where: {
                id: id,
            },
        });
    },
};

export { eventSeriesRepository, EventSeries };
