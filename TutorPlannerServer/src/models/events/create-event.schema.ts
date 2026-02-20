import { z } from 'zod';
import { Event, EventType } from '@prisma/client';
import { MAX_HOUR } from '../../config';

export interface CreateEventRequestBody {
    name: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
    weekly: boolean;
}

export const createEventSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    date: z.date(),
    startHour: z.number().min(0).max(MAX_HOUR),
    endHour: z.number().min(0).max(MAX_HOUR),
    weekly: z.boolean()
});

export type CreateEvent = z.infer<typeof createEventSchema>;
