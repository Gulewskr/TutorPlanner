import { Payment } from '@prisma/client';

type CreatePaymentInput = {
    price: number;
    date: string | Date;
    studentId: number;
    type: 'CASH' | 'DIGITAL';
    accountId: number;
};

export type { CreatePaymentInput };
export { Payment };
