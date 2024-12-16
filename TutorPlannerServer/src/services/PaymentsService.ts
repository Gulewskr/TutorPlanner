import { Prisma } from '@prisma/client';
import { Payment } from '../models/payment.model';
import {
    PaymentInput,
    validatePaymentInput,
} from '../validators/payments/paymentInput';
import { endOfMonth } from 'date-fns';
import { paymentRepository } from '../repositories/paymentRepository';
import { parseDate } from '../utils/utils';
import StudentPaymentsService from './StudentPaymentsService';

interface Filters {
    month: number;
    year: number;
}

class PaymentsService {
    public async getPayment(id: number): Promise<Payment> {
        const payment = await paymentRepository.getPaymentById(id);
        if (payment == null) {
            throw new Error(`Could not find payment`);
        }
        return payment;
    }

    public async getFilteredPayments(filters?: Filters): Promise<Payment[]> {
        if (!filters) {
            return await paymentRepository.getPayments();
        }

        const startOfMonth = new Date(filters.year, filters.month - 1, 1);

        return await paymentRepository.getPayments({
            date: {
                gte: startOfMonth,
                lte: endOfMonth(startOfMonth),
            },
        });
    }

    public async getStudentPayments(studentId: number): Promise<Payment[]> {
        return await paymentRepository.getPaymentByStudentId(studentId);
    }

    public async addPayment(data: PaymentInput): Promise<Payment> {
        const parsedData = validatePaymentInput(data);
        const payment = await paymentRepository.createPayment(parsedData);
        await StudentPaymentsService.recalculateStudentBalance(
            parsedData.studentId,
        );
        return payment;
    }

    public async updatePayment(
        paymentId: number,
        data: Partial<PaymentInput>,
    ): Promise<void> {
        const updateData: Prisma.PaymentUpdateInput = {
            price: data.price,
        };
        if (data.date) {
            updateData.date = parseDate(data.date);
        }
        if (data.studentId) {
            updateData.student = {
                connect: {
                    id: data.studentId,
                },
            };
        }
        //TODO transsaction
        const payment = await paymentRepository.getPaymentById(paymentId);
        if (!payment) {
            throw new Error('Wrong payment ID');
        }
        await paymentRepository.updatePayment(paymentId, updateData);
        if (data.studentId && data.studentId != payment.studentId) {
            await StudentPaymentsService.recalculateStudentBalance(
                payment.studentId,
            );
            await StudentPaymentsService.recalculateStudentBalance(
                data.studentId,
            );
        } else {
            await StudentPaymentsService.recalculateStudentBalance(
                payment.studentId,
            );
        }
    }

    public async deletePayment(id: number): Promise<Payment> {
        const payment = await paymentRepository.deletePayment(id);
        if (payment == null) {
            throw new Error(`Could not find payment`);
        }
        if (payment.price) {
            await StudentPaymentsService.recalculateStudentBalance(
                payment.studentId,
            );
        }
        return payment;
    }
}

export default new PaymentsService();
