import { z } from 'zod';
import { MAX_HOUR } from '../constraints';

const BASE_SCHEMA = {
    name: z.string(),
    description: z.string().nullish(),
    date: z.date(),
    startHour: z.number().min(0).max(MAX_HOUR),
    endHour: z.number().min(0).max(MAX_HOUR),
}

export const EventCreateInputSchema = z.object({
    ...BASE_SCHEMA,
    weekly: z.boolean().nullish(),
});

export const EventUpdateInputSchema = z.object(BASE_SCHEMA);

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
