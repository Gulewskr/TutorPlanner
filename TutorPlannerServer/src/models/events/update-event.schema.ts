import { z } from 'zod';
import { MAX_HOUR } from '../../config';

export const updateEventSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    date: z.date(),
    startHour: z.number().min(0).max(MAX_HOUR),
    endHour: z.number().min(0).max(MAX_HOUR)
});

export type UpdateEvent = z.infer<typeof updateEventSchema>;
