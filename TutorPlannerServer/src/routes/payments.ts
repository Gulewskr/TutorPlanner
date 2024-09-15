import express, { Router } from 'express';
import LessonsService from '../services/LessonsService';
import PaymentsService from '../services/PaymentsService';

/**
 * Typescript don't like merging params so as workaround cast req.params to any
 */
var router: Router = express.Router({ mergeParams: true });

router.get('/:id', async (req, res) => {
    const payment = await PaymentsService.getPayment(Number(req.params.id));
    res.status(200).json(payment);
});

router.post('/', async (req, res, next) => {
    const studentId = Number((req.params as any).studentId);
    console.log(studentId);
    const payment = await PaymentsService.addPayment({
        ...req.body,
        studentId: Number.isNaN(studentId) ? req.body.studentId : studentId,
    });
    res.status(200).json(payment);
});

router.get('/', async (req, res) => {
    const studentId = Number((req.params as any).studentId);
    if (Number.isNaN(studentId)) {
        const payments = await PaymentsService.getFilteredPayments();
        res.status(200).json(payments);
    }
    const payments = await PaymentsService.getStudentPayments(studentId);
    res.status(200).json(payments);
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
