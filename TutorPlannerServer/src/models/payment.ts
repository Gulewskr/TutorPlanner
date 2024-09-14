import { PrismaClient, Prisma, Payment } from '@prisma/client';

const prisma = new PrismaClient();

const paymentRepository = {
    createPayment: async (
        payment: Prisma.PaymentCreateInput,
    ): Promise<Payment> => {
        return await prisma.payment.create({
            data: payment,
        });
    },
    updatePayment: async (
        paymentId: number,
        payment: Prisma.PaymentCreateInput,
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
