import express, { Request, Router } from 'express';
import PaymentsService from '../services/PaymentsService';
import { parseStudentId } from './studentsRoutes/utils';
import StudentPaymentsService from '../services/StudentPaymentsService';

/**
 * Typescript don't like merging params so as workaround cast req.params to any
 */
const router: Router = express.Router({ mergeParams: true });

const getStudentId = (req: Request): number => {
    const studentId = Number(req.body?.studentId);
    if (Number.isNaN(studentId)) {
        throw new Error('Student ID must be a number');
    }
    return studentId;
};

router.get('/:id', async (req, res, next) => {
    try {
        const payment = await PaymentsService.getPayment(Number(req.params.id));
        res.status(200).json(payment);
    } catch (err) {
        next(err);
    }
});

/**
 * path: /payments
 *
 * requestBody:
 *  studentId: number;
 *  price: number;
 *  date?: string;
 *
 * response:
 *  studentId: number;
 *  id: number;
 *  price: number;
 *  date: Date;
 */
router.post('/', async (req, res, next) => {
    try {
        const studentId = getStudentId(req);
        const payment = await PaymentsService.addPayment({
            ...req.body,
            studentId,
        });
        res.status(200).json(payment);
    } catch (err) {
        next(err);
    }
});

/**
 * path: /payments/:paymentId
 */
router.put('/:id', async (req, res, next) => {
    try {
        const studentId = getStudentId(req);
        const payment = await PaymentsService.updatePayment(
            Number(req.params.id),
            {
                ...req.body,
                studentId,
            },
        );
        res.status(200).json(payment);
    } catch (err) {
        next(err);
    }
});

/**
 * path: /payments/:paymentId
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const payment = await PaymentsService.deletePayment(
            Number(req.params.id),
        );
        res.status(200).json(payment);
    } catch (err) {
        next(err);
    }
});

/**
 * path: /payments
 * queryParams:
 *  month eg. 1
 *  year eg. 2024
 */
router.get('/', async (req, res, next) => {
    try {
        const { month, year } = req.query;
        if (!month && !year) {
            const payments = await PaymentsService.getFilteredPayments();
            res.status(200).json(payments);
            return;
        }

        const monthNumber = parseInt(month as string);
        const yearNumber = parseInt(year as string);
        if (
            isNaN(monthNumber) ||
            monthNumber < 1 ||
            monthNumber > 12 ||
            isNaN(yearNumber) ||
            yearNumber < 1900
        ) {
            return res
                .status(400)
                .json({ error: 'Invalid month or year provided.' });
        }
        const payments = await PaymentsService.getFilteredPayments({
            month: monthNumber,
            year: yearNumber,
        });
        res.status(200).json(payments);
    } catch (err) {
        next(err);
    }
});

router.post('/:studentId/payments/', async (req, res, next) => {
    try {
        const studentId = parseStudentId(req);
        const payment = await PaymentsService.addPayment({
            ...req.body,
            studentId: studentId,
        });
        res.status(200).json(payment);
    } catch (err) {
        next(err);
    }
});

export default router;
