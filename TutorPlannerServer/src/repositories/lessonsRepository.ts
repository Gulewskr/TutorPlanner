import { EventSeries, EventType, Prisma } from '@prisma/client';
import { prisma } from '../db';
import { LessonDAO } from '../models/lesson';
import { addDays, format, getDay, isDate, isSameDay, startOfWeek } from 'date-fns';
import { eventRepository } from './eventsRepository';
import { toMySQLDate } from '../utils/utils';

interface Pagable<T> {
    data: T[];
    size: number;
    page: number;
    pageSize: number;
}

interface LessonCreateInput {
    date: Date;
    date_text: string;
    name: string;
    description?: string | null;
    startHour: number;
    endHour: number;
    price: number;
    studentId: number;
}

//TODO remove not related to Lesson type fucntions
export const lessonRepository = {
    create: async (lesson: LessonCreateInput): Promise<LessonDAO> => {
        return (await prisma.event.create({
            data: {
                ...lesson,
                date_text: toMySQLDate(lesson.date),
                eventType: 'LESSON',
                studentId: lesson.studentId
            },
        })) as LessonDAO;
    },
    getLessonById: async (id: number): Promise<LessonDAO | null> => {
        return (await prisma.event.findFirst({
            where: {
                eventType: 'LESSON',
                id: id,
            },
        })) as LessonDAO;
    },
    getLessonsByStudentId: async (studentId: number): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                eventType: 'LESSON',
                studentId: studentId,
            },
        })) as LessonDAO[];
    },
    getLessonsSeriesByStudentId: async (
        studentId: number,
    ): Promise<EventSeries[]> => {
        return await prisma.eventSeries.findMany({
            where: {
                eventType: 'LESSON',
                studentId: studentId,
            },
        });
    },
    getLessonByEventSeriesId: async (id: number): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                eventType: 'LESSON',
                eventSeriesId: id,
            },
        })) as LessonDAO[];
    },
    getAllLessons: async (): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                eventType: 'LESSON',
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
                eventType: 'LESSON',
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
                eventType: 'LESSON',
                date_text: toMySQLDate(date)
            },
            orderBy: {
                startHour: 'asc',
            },
        })) as LessonDAO[];
    },
    update: async (
        id: number,
        event: Prisma.EventUpdateInput,
    ): Promise<LessonDAO> => {
        event.eventType = EventType.LESSON;
        if (event.date && isDate(event.date)) {
            event.date_text = toMySQLDate(event.date)
        }
        return eventRepository.update<LessonDAO>(id, event);
    },
    //TODO merge 2 functions
    bulkUpdateByFilter: async (
        lesson: Prisma.EventUpdateInput,
        filter: Prisma.EventWhereInput,
    ): Promise<Prisma.BatchPayload> => {
        filter.eventType = 'LESSON';
        return await prisma.event.updateMany({
            data: lesson,
            where: filter,
        });
    },
    bulkUpdate: async (
        lessonsId: number[],
        lesson: Prisma.EventUpdateInput,
    ): Promise<Prisma.BatchPayload> => {
        return await prisma.event.updateMany({
            data: lesson,
            where: {
                id: {
                    in: lessonsId,
                },
                eventType: 'LESSON',
            },
        });
    },
    updateLessonSeriesByLessonId: async (
        lessonId: number,
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
        const firstLesson = await prisma.event.findFirstOrThrow({
            where: {
                eventType: 'LESSON',
                id: lessonId,
            },
        }) as LessonDAO;

        if (!firstLesson.eventSeriesId) {
            throw new Error('Selected lesson is not part of event series.');
        }
        const { eventSeriesId: seriesId } = firstLesson;

        let dayOfWeek = -1;
        if (data.date && !isSameDay(data.date, firstLesson.date)) {
            dayOfWeek = getDay(data.date);
        }

        let updatedLessonsToSave: LessonDAO[] = [];
        if (dayOfWeek != -1) {
            const lessonsToUpdate = await prisma.event.findMany({
                where: {
                    eventSeriesId: seriesId,
                    date: {
                        gte: firstLesson.date
                    },
                    isOverridden: {
                        not: true
                    }
                }
            }) as LessonDAO[];

            if (firstLesson.isOverridden) {
                lessonsToUpdate.push(firstLesson);
            }

            updatedLessonsToSave = lessonsToUpdate.map(lesson => {
                const newDate = addDays(startOfWeek(lesson.date), dayOfWeek);
                return ({
                    ...lesson,
                    name: data.name || lesson.name,
                    description: data.description || lesson.description,
                    price: data.price || lesson.price,
                    studentId: data.student || lesson.studentId,
                    startHour: data.startHour || lesson.startHour,
                    endHour: data.endHour || lesson.endHour,
                    date: newDate,
                    date_text: toMySQLDate(newDate),
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
            if (updatedLessonsToSave.length) {
                await tx.event.deleteMany({
                    where: {
                        id: {
                            in: updatedLessonsToSave.map(({id}) => id) 
                        }
                    }
                });
                await tx.event.createMany({
                    data: updatedLessonsToSave
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
                            gte: firstLesson.date,
                        },
                    },
                });
            }
        }, {
            timeout: 10000
        });
    },
    updateLessonSeriesBySeriesId: async (
        id: number,
        lesson: {
            name: string;
            description?: string | null;
            startHour: number;
            endHour: number;
            price: number;
            student: number;
        },
    ): Promise<void> => {
        //TODO - transaction
        await prisma.eventSeries.update({
            data: {
                name: lesson.name,
                description: lesson.description,
                startHour: lesson.startHour,
                endHour: lesson.endHour,
                price: lesson.price,
                studentId: lesson.student,
            },
            where: {
                id: id,
            },
        });
        await prisma.event.updateMany({
            data: {
                name: lesson.name,
                description: lesson.description,
                startHour: lesson.startHour,
                endHour: lesson.endHour,
                price: lesson.price,
                studentId: lesson.student,
            },
            where: {
                isOverridden: false,
                eventSeriesId: id,
                date: {
                    gte: new Date(),
                },
            },
        });
    },
    delete: async (id: number): Promise<LessonDAO> => {
        return eventRepository.delete<LessonDAO>(id);
    },
    getLessons: async (
        filter: Prisma.EventWhereInput,
    ): Promise<LessonDAO[]> => {
        filter.eventType = 'LESSON';

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
                    eventType: 'LESSON',
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
                eventType: 'LESSON',
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
        filter.eventType = 'LESSON';

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
    getSumOfPaidLessonsByStudentId: async (
        studentId: number,
    ): Promise<number> => {
        const res = await prisma.event.groupBy({
            where: {
                eventType: 'LESSON',
                studentId: studentId,
                isPaid: true,
                isCanceled: { not: true },
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
                eventType: 'LESSON',
                studentId: studentId,
                isPaid: false,
                isCanceled: { not: true },
            },
            orderBy: {
                date: 'asc',
            },
        })) as LessonDAO[];
    },
    getPaidLessonsByStudentId: async (
        studentId: number,
    ): Promise<LessonDAO[]> => {
        return (await prisma.event.findMany({
            where: {
                eventType: 'LESSON',
                studentId: studentId,
                isPaid: true,
                isCanceled: { not: true },
            },
            orderBy: {
                date: 'desc',
            },
        })) as LessonDAO[];
    },
};
