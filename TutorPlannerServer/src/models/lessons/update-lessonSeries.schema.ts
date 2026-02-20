
import { z } from "zod";
import { MAX_HOUR } from "../../config";

export const updateLessonSeriesSchema = z.object({
    name: z.string(),
    description: z.string().nullish(),
    date: z.date(),
    student: z.number(),
    price: z.number(),
    startHour: z.number().min(0).max(MAX_HOUR),
    endHour: z.number().min(0).max(MAX_HOUR),
});