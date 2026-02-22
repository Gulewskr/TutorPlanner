import { Payment } from '@prisma/client';

export type PaymnetTypes = 'DIGITAL' | 'CASH';

export type PaymentDTO = {
    id: number;
    value: number;
    date: Date;
    studentId: number;
    accountId: number;
    type: PaymnetTypes;
};

export const paymentToPaymentDTO = (payment: Payment): PaymentDTO => ({
    id: payment.id,
    value: payment.price,
    date: payment.date,
    studentId: payment.studentId,
    accountId: payment.accountId,
    type: payment.type,
});

export const paymentsToPaymentsDTO = (payment: Payment[]): PaymentDTO[] =>
    payment.map(paymentToPaymentDTO);
