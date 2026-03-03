import { FullPayment } from '../payment.model';
import { StudentDTO, studentToStudentDTO } from '../students/student-response.dto';

export type PaymnetTypes = 'DIGITAL' | 'CASH';

export type PaymentDTO = {
    id: number;
    value: number;
    date: Date;
    student: StudentDTO;
    accountId: number;
    type: PaymnetTypes;
};

export const paymentToPaymentDTO = (payment: FullPayment): PaymentDTO => ({
    id: payment.id,
    value: payment.price,
    date: payment.date,
    student: studentToStudentDTO(payment.student),
    accountId: payment.accountId,
    type: payment.type,
});

export const paymentsToPaymentsDTO = (payment: FullPayment[]): PaymentDTO[] =>
    payment.map(paymentToPaymentDTO);
