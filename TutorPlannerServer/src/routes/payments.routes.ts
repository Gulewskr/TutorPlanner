import express, { Request, Router } from 'express';
import PaymentsService from '../services/PaymentsService';

/**
 * Typescript don't like merging params so as workaround cast req.params to any
 */
const router: Router = express.Router({ mergeParams: true });

const getStudentId = (req: Request): number | undefined => {
    if (!req.params) {
        return req.body?.studentId;
    }
    const studentId = Number((req.params as any).studentId);
    return Number.isNaN(studentId) ? req.body?.studentId : studentId;
};

router.get('/:id', async (req, res) => {
    const payment = await PaymentsService.getPayment(Number(req.params.id));
    res.status(200).json(payment);
});

/**
 * /payments
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
        if (studentId === undefined) {
            return res.status(400).json('missing studentId');
        }
        const payment = await PaymentsService.addPayment({
            ...req.body,
            studentId,
        });
        res.status(200).json(payment);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

const parseQueryParamNumber = (value?: any): number | undefined => {
    let parsedNumber: number | undefined = Number(value);
    return isNaN(parsedNumber) ? undefined : parsedNumber;
};

/**
 * /payments
 * queryParams:
 *  month eg. 1
 *  year eg. 2024
 */
router.get('/', async (req, res) => {
    try {
        const { month, year } = req.query;
        if (!month && !year) {
            console.log('test');
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
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/:studentId/payments/', async (req, res) => {
    const studentId = Number(req.params.studentId);
    if (Number.isNaN(studentId)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid input. Wrong studentId provided.',
        });
    }
    const payment = await PaymentsService.addPayment({
        ...req.body,
        studentId: studentId,
    });
    res.status(200).json(payment);
});

export default router;
