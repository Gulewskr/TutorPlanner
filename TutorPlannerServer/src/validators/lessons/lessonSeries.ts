import { z } from 'zod';
import { MAX_HOUR } from '../constraints';

export const LessonSeriesUpdateInputSchema = z.object({
    name: z.string(),
    description: z.string().nullish(),
    student: z.number(),
    price: z.number(),
    startHour: z.number().min(0).max(MAX_HOUR),
    endHour: z.number().min(0).max(MAX_HOUR),
});
