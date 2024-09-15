import { PrismaClient, Prisma, Payment } from '@prisma/client';

const prisma = new PrismaClient();

const paymentRepository = {
    getPaymentById: async (id: number): Promise<Payment | null> => {
        return await prisma.payment.findFirst({
            where: {
                id: id,
            },
        });
    },
    getPaymentByStudentId: async (studentId: number): Promise<Payment[]> => {
        return await prisma.payment.findMany({
            where: {
                studentId: studentId,
            },
        });
    },
    getPayments: async (
        filter?: Prisma.PaymentWhereInput,
    ): Promise<Payment[]> => {
        return await prisma.payment.findMany({
            where: filter,
        });
    },
    createPayment: async (
        payment: Prisma.PaymentCreateInput,
    ): Promise<Payment> => {
        return await prisma.payment.create({
            data: payment,
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

export { paymentRepository, Payment };
