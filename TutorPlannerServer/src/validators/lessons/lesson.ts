import { z } from 'zod';
import { MAX_HOUR } from '../constraints';

export const LessonCreateInputSchema = z.object({
    name: z.string(),
    description: z.string().nullish(),
    student: z.number(),
    price: z.number(),
    date: z.date(),
    startHour: z.number().min(0).max(MAX_HOUR),
    endHour: z.number().min(0).max(MAX_HOUR),
    weekly: z.boolean().nullish(),
});

export const LessonUpdateInputSchema = z.object({
    name: z.string(),
    description: z.string().nullish(),
    date: z.date(),
    student: z.number(),
    price: z.number(),
    startHour: z.number().min(0).max(MAX_HOUR),
    endHour: z.number().min(0).max(MAX_HOUR),
});

/*
const validatePaymentInput = (data: PaymentInput): CreatePaymentDTO => {
    const parsedData = PaymentInputSchema.parse(data);
    const paymentDate = data.date ? validateDateFormat(data.date) : new Date();
    return {
        ...parsedData,
        date: paymentDate,
    };
};
*/
