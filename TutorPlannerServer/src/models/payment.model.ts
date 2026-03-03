import { Payment, Student } from '@prisma/client';

type CreatePaymentInput = {
    price: number;
    date: string | Date;
    studentId: number;
    type: 'CASH' | 'DIGITAL';
    accountId: number;
};

interface FullPayment extends Payment {
    student: Student
}

export type { CreatePaymentInput };
export { Payment, FullPayment };
