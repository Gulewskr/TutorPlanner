import { Payment, Student } from '@prisma/client';

type CreatePaymentDTO = {
    price: number;
    date: string | Date;
    studentId: number;
};

type PaymentWithStudentDAO = {
    id: number;
    price: number;
    date: Date;
    date_text: string;
    studentId: number;
    student: Student;
};

export type { CreatePaymentDTO, PaymentWithStudentDAO };
export { Payment };
