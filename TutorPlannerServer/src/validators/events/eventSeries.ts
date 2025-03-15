import { z } from 'zod';
import { MAX_HOUR } from '../constraints';

export const EventSeriesUpdateInputSchema = z.object({
    name: z.string(),
    description: z.string().nullish(),
    date: z.date(),
    startHour: z.number().min(0).max(MAX_HOUR),
    endHour: z.number().min(0).max(MAX_HOUR),
});
