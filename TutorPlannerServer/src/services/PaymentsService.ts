import { Prisma } from '@prisma/client';
import { FullPayment, Payment } from '../models/payment.model';
import { endOfMonth } from 'date-fns';
import { paymentRepository } from '../repositories/paymentRepository';
import { getQuarterRange, parseDate, validateDateFormat } from '../utils/utils';
import StudentPaymentsService from './StudentPaymentsService';
import { CreatePayment } from '../models/payments/create-payment.schema';
import { UpdatePayment } from '../models/payments/update-payment.schema';
import { DEFAULT_ACCOUNT_ID } from '../config';
import {
    QuarterDetailsView,
    toQuarterDetailsView,
} from '../models/payments/quarter-details-response.dto';
import { lessonRepository } from '../repositories/lessonsRepository';
import { ACCOUNTS } from '../models/accounts/account.dto';
import { paymentsToPaymentsDTO } from '../models/payments/payment-response.dto';

interface Filters {
    month: number;
    year: number;
}

class PaymentsService {
    public async getPayment(id: number): Promise<FullPayment> {
        const payment = await paymentRepository.getPaymentById(id);
        if (payment == null) {
            throw new Error(`Could not find payment`);
        }
        return payment;
    }

    public async getFilteredPayments(filters?: Filters): Promise<FullPayment[]> {
        if (!filters) {
            return await paymentRepository.getPayments();
        }

        const startOfMonth = new Date(filters.year, filters.month - 1, 1);

        return await paymentRepository.getPaymentsInTimeRange(
            startOfMonth,
            endOfMonth(startOfMonth),
        );
    }

    public async getStudentPayments(studentId: number): Promise<FullPayment[]> {
        return await paymentRepository.getPaymentByStudentId(studentId);
    }

    public async addPayment(data: CreatePayment): Promise<Payment> {
        const payment = await paymentRepository.createPayment({
            ...data,
            type: data.type || 'DIGITAL',
            date: data.date ? validateDateFormat(data.date) : new Date(),
            accountId: data.accountId || DEFAULT_ACCOUNT_ID,
        });
        await StudentPaymentsService.recalculateStudentBalance(data.studentId);
        return payment;
    }

    public async updatePayment(paymentId: number, data: UpdatePayment): Promise<void> {
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
            await StudentPaymentsService.recalculateStudentBalance(payment.studentId);
            await StudentPaymentsService.recalculateStudentBalance(data.studentId);
        } else {
            await StudentPaymentsService.recalculateStudentBalance(payment.studentId);
        }
    }

    public async deletePayment(id: number): Promise<Payment> {
        const payment = await paymentRepository.deletePayment(id);
        if (payment == null) {
            throw new Error(`Could not find payment`);
        }
        if (payment.price) {
            await StudentPaymentsService.recalculateStudentBalance(payment.studentId);
        }
        return payment;
    }

    public async getQuarterDetails(quarter: number, year: number): Promise<QuarterDetailsView> {
        const { from, to } = getQuarterRange(quarter, year);
        const payments = await paymentRepository.getPaymentsInTimeRange(from, to);
        const price = await lessonRepository.getPriceOfLessonsInTimeRange(from, to);
        return toQuarterDetailsView(ACCOUNTS, paymentsToPaymentsDTO(payments), price);
    }
}

export default new PaymentsService();
