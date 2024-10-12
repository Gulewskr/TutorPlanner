import express, { Router } from 'express';
import PaymentsService from '../../services/PaymentsService';
import { parseStudentId } from './utils';

/**
 * path: students/:studentId/payments/
 */
const router: Router = express.Router({ mergeParams: true });

/**
 * /students/:studentId/payments
 *
 * requestBody:
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
        const studentId = parseStudentId(req);
        const payment = await PaymentsService.addPayment({
            ...req.body,
            studentId,
        });
        res.status(200).json(payment);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const studentId = parseStudentId(req);
        const payments = await PaymentsService.getStudentPayments(studentId);
        res.status(200).json(payments);
    } catch (err) {
        next(err);
    }
});

export default router;
