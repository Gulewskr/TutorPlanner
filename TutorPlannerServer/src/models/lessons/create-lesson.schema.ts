import { z } from "zod";

const dateTextSchema = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be yyyy-MM-dd")
  .refine((val) => !isNaN(Date.parse(val)), "Invalid calendar date")

export const createLessonSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  student: z.number(),
  price: z.number(),
  date: z.date(),
  startHour: z.number(),
  endHour: z.number(),
  weekly: z.boolean()
});

export type CreateLesson = z.infer<typeof createLessonSchema>;
