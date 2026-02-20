import express, { Router } from 'express';
import PaymentsService from '../../services/PaymentsService';
import { getStudentIdFromParams } from '../utils';
import { createPaymentSchema } from '../../models/payments/create-payment.schema';

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
        const studentId = getStudentIdFromParams(req);
        const data = createPaymentSchema.parse({
            ...req.body,
            studentId: studentId,
        });
        const payment = await PaymentsService.addPayment(data);
        res.status(200).json(payment);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const studentId = getStudentIdFromParams(req);
        const payments = await PaymentsService.getStudentPayments(studentId);
        res.status(200).json(payments);
    } catch (err) {
        next(err);
    }
});

export default router;
