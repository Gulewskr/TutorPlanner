import { Prisma, Payment } from '@prisma/client';
import { prisma } from '../db';
import {
    CreatePaymentInput
} from '../models/payment.model';
import { toMySQLDate } from '../utils/utils';
import { isDate } from 'date-fns';

export const paymentRepository = {
    getPaymentById: async (
        id: number,
    ): Promise<Payment | null> => {
        return await prisma.payment.findFirst({
            where: {
                id: id,
            },
            include: {
                student: true,
            },
        });
    },
    getPaymentByStudentId: async (
        studentId: number,
    ): Promise<Payment[]> => {
        return await prisma.payment.findMany({
            where: {
                studentId: studentId,
            },
            include: {
                student: true,
            },
        });
    },
    getSumOfPaymentByStudentId: async (studentId: number): Promise<number> => {
        const res = await prisma.payment.groupBy({
            where: {
                studentId: studentId,
            },
            _sum: {
                price: true,
            },
            by: 'studentId',
        });
        return res[0]?._sum?.price || 0;
    },
    getPayments: async (
        filter?: Prisma.PaymentWhereInput,
    ): Promise<Payment[]> => {
        return await prisma.payment.findMany({
            where: filter,
            include: {
                student: true,
            },
        });
    },
    createPayment: async (payment: CreatePaymentInput): Promise<Payment> => {
        return await prisma.payment.create({
            data: {
                price: payment.price,
                date: payment.date,
                date_text: toMySQLDate(payment.date),
                student: {
                    connect: {
                        id: payment.studentId,
                    },
                },
                accountId: payment.accountId,
                type: payment.type
            },
        });
    },
    updatePayment: async (
        paymentId: number,
        payment: Prisma.PaymentUpdateInput,
    ): Promise<Payment> => {
        if (payment.date && isDate(payment.date)) {
            payment.date_text = toMySQLDate(payment.date);
        }
        return await prisma.payment.update({
            data: payment,
            where: {
                id: paymentId,
            },
        });
    },
    deletePayment: async (paymentId: number): Promise<Payment> => {
        return await prisma.payment.delete({
            where: {
                id: paymentId,
            },
        });
    },
};
