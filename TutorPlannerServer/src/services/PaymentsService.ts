import { Prisma } from '@prisma/client';
import { Payment, paymentRepository } from '../models/payment';
import { validateDateFormat } from '../utils/utils';

interface PaymentInput {
    studentId: number;
    price: number;
    date?: string;
}

interface Filters {}

class PaymentsService {
    public async getPayment(id: number): Promise<Payment> {
        const payment = await paymentRepository.getPaymentById(id);
        if (payment == null) {
            throw new Error(`Could not find payment`);
        }
        return payment;
    }

    public async getFilteredPayments(filters?: Filters): Promise<Payment[]> {
        return await paymentRepository.getPayments(filters);
    }

    public async getStudentPayments(studentId: number): Promise<Payment[]> {
        return await paymentRepository.getPaymentByStudentId(studentId);
    }

    public async addPayment(data: PaymentInput): Promise<Payment> {
        const paymentDate = validateDateFormat(data.date);
        const payment = await paymentRepository.createPayment({
            price: data.price,
            date: paymentDate,
            student: {
                connect: {
                    id: data.studentId,
                },
            },
        });
        return payment;
    }

    public async updatePayment(
        paymentId: number,
        data: Partial<PaymentInput>,
    ): Promise<void> {
        const updateData: Prisma.PaymentUpdateInput = {};
        if (data.studentId) {
            updateData.student = {
                connect: {
                    id: data.studentId,
                },
            };
        }
        await paymentRepository.updatePayment(paymentId, updateData);
    }

    public async deletePayment(id: number): Promise<Payment> {
        const payment = await paymentRepository.deletePayment(id);
        payment.price;
        if (payment == null) {
            throw new Error(`Could not find payment`);
        }
        return payment;
    }
}

export default new PaymentsService();
