import { z } from 'zod';
import { validateDateFormat } from '../../utils/utils';
import { CreatePaymentDTO } from '../../models/payment.model';

interface PaymentInput {
    studentId: number;
    price: number;
    date?: string;
}

const PaymentInputSchema = z.object({
    studentId: z.number().positive(),
    price: z.number(),
    date: z.string().nullish(),
});

const validatePaymentInput = (data: PaymentInput): CreatePaymentDTO => {
    const parsedData = PaymentInputSchema.parse(data);
    const paymentDate = data.date ? validateDateFormat(data.date) : new Date();
    return {
        ...parsedData,
        date: paymentDate,
    };
};

export { PaymentInput, validatePaymentInput };
