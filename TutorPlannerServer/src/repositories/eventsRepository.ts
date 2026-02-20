import { Prisma, Event } from '@prisma/client';
import { prisma } from '../db';
import { addDays, addWeeks, differenceInDays, getDay, isSameDay, startOfWeek, subDays } from 'date-fns';
import { getDateWithoutTZ, toMySQLDate } from '../utils/utils';
import { format } from 'path';

export const eventRepository = {
    getEventById: async (id: number): Promise<Event> => {
        return await prisma.event.findFirstOrThrow({
            where: {
                id: id,
            },
        });
    },
    getAllEvents: async (): Promise<Event[]> => {
        return await prisma.event.findMany();
    },
    getEvents: async (filter: Prisma.EventWhereInput): Promise<Event[]> => {
        return await prisma.event.findMany({
            where: filter
        });
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
    getNextBySeriesId: async (seriesId: number): Promise<Event> => {
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
        })) as Event;
    },
    createEvent: async (event: Prisma.EventCreateInput): Promise<Event> => {
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
    update: async <T = Event>(
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
    bulkUpdate: async <T = Event>(
        data: Prisma.EventUpdateInput,
        selector: Prisma.EventWhereInput
    ): Promise<T> => {
        return await prisma.event.updateMany({
            data: data,
            where: selector,
        }) as T;
    },
    updateSeriesOfEvents: async (
        eventId: number,
        data: Partial<{
            name: string;
            description: string | null;
            startHour: number;
            endHour: number;
            date: Date;
            price: number;
            student: number;
        }>,
    ): Promise<void> => {
        const event = await prisma.event.findFirstOrThrow({
                    where: {
                        id: eventId,
                    },
                })
        if (!event.eventSeriesId) {
            throw new Error('Selected event is not part of event series.');
        }
        const { eventSeriesId: seriesId } = event;
        
        const dateShouldBeChanged = data.date && !isSameDay(data.date, event.date);

        let dataToSave: Event[] = [];
        if (dateShouldBeChanged) {
            const eventsToUpdate = await prisma.event.findMany({
                where: {
                    eventSeriesId: seriesId,
                    date: {
                        gte: event.date
                    }
                },
                orderBy: {
                    date: 'asc'
                }
            });

            dataToSave = eventsToUpdate.map((e, i) => {
                const newDate = addWeeks(data.date!, i);
                return ({
                    ...e,
                    name: data.name || e.name,
                    description: data.description || e.description,
                    price: data.price || e.price,
                    studentId: data.student || e.studentId,
                    startHour: data.startHour || e.startHour,
                    endHour: data.endHour || e.endHour,
                    date: newDate,
                    date_text: toMySQLDate(newDate)
                })
            })
        }
                
                
        await prisma.$transaction(async (tx) => {
            await tx.eventSeries.update({
                data: {
                    name: data.name,
                    description: data.description,
                    startHour: data.startHour,
                    endHour: data.endHour,
                    price: data.price,
                    studentId: data.student,
                },
                where: {
                    id: seriesId,
                },
            });
            if (dataToSave.length) {
                await tx.event.deleteMany({
                    where: {
                        id: {
                            in: dataToSave.map(({id}) => id) 
                        }
                    }
                });
                await tx.event.createMany({
                    data: dataToSave
                });
            } else {
                await tx.event.updateMany({
                    data: {
                        name: data.name,
                        description: data.description,
                        startHour: data.startHour,
                        endHour: data.endHour,
                        price: data.price,
                        studentId: data.student,
                    },
                    where: {
                        isOverridden: false,
                        eventSeriesId: seriesId,
                        date: {
                            gte: event.date,
                        },
                    },
                });
            }
        }, {
            timeout: 10000
        });
    },
    delete: async <T = Event>(id: number): Promise<T> => {
        return await prisma.event.delete({
            where: {
                id: id,
            },
        }) as T;
    },
};
