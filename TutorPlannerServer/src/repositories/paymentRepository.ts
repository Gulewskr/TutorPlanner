import { PrismaClient, Prisma, Payment } from '@prisma/client';
import {
    CreatePaymentDTO,
    PaymentWithStudentDAO,
} from '../models/payment.model';

const prisma = new PrismaClient();

export const paymentRepository = {
    getPaymentById: async (
        id: number,
    ): Promise<PaymentWithStudentDAO | null> => {
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
    ): Promise<PaymentWithStudentDAO[]> => {
        return await prisma.payment.findMany({
            where: {
                studentId: studentId,
            },
            include: {
                student: true,
            },
        });
    },
    getPayments: async (
        filter?: Prisma.PaymentWhereInput,
    ): Promise<PaymentWithStudentDAO[]> => {
        return await prisma.payment.findMany({
            where: filter,
            include: {
                student: true,
            },
        });
    },
    createPayment: async (payment: CreatePaymentDTO): Promise<Payment> => {
        return await prisma.payment.create({
            data: {
                price: payment.price,
                date: payment.date,
                student: {
                    connect: {
                        id: payment.studentId,
                    },
                },
            },
        });
    },
    updatePayment: async (
        paymentId: number,
        payment: Prisma.PaymentUpdateInput,
    ): Promise<Payment> => {
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
