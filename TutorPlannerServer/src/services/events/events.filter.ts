import { z } from 'zod';
import { EventType, Prisma } from "@prisma/client";
import { toMySQLDate } from "../../utils/utils";
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from "date-fns";

const eventFilterSchema = z.object({
    date: z.date().optional(),
    month: z.number().optional(),
    year: z.number().optional(),
    eventType: z.union([z.literal(EventType.DEFAULT), z.literal(EventType.LESSON)]).optional(),
    isCanceled: z.boolean().optional(),
    isDeleted: z.boolean().optional()
});

type EventFilterInput = z.infer<typeof eventFilterSchema>;

export class EventFilter {
    private filter: EventFilterInput

    constructor(filters: unknown) {
        this.filter = eventFilterSchema.parse(filters);
    }

    toPrismaFilter = (): Prisma.EventWhereInput => {
        const prismaFilter: Prisma.EventWhereInput = {};
        if (!this.filter) {
            return prismaFilter;
        }
        if (this.filter.date) {
            prismaFilter.date_text = toMySQLDate(this.filter.date);
        }
        if (this.filter.eventType) {
            prismaFilter.eventType = this.filter.eventType;
        }
        if (this.filter.year) {
            if (this.filter.month) {
                const date = new Date(this.filter.year, this.filter.month);
                prismaFilter.date = {
                    gte: startOfMonth(date),
                    lte: endOfMonth(date),
                }
            } else {
                const date = new Date(this.filter.year, 1);
                prismaFilter.date = {
                    gte: startOfYear(date),
                    lte: endOfYear(date),
                }
            }
        }
        if (this.filter.isCanceled != undefined) {
            prismaFilter.isCanceled = this.filter.isCanceled
        }
        if (this.filter.isDeleted != undefined) {
            prismaFilter.isDeleted = this.filter.isDeleted
        } else {
            prismaFilter.isDeleted = false;
        }
        return prismaFilter;
    }
}
