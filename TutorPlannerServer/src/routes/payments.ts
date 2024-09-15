import express, { Router } from 'express';
import LessonsService from '../services/LessonsService';
import PaymentsService from '../services/PaymentsService';

var router: Router = express.Router();

router.get('/:id', async (req, res) => {
    const payment = await PaymentsService.getPayment(Number(req.params.id));
    res.status(200).json(payment);
});

router.post('/', async (req, res, next) => {
    const payment = await PaymentsService.addPayment(req.body);
    res.status(200).json({
        message: 'Lessons has been created successfully.',
        data: payment,
    });
});

router.get('/', async (req, res) => {
    const payments = await PaymentsService.getFilteredPayments();
    res.status(200).json(payments);
});

export default router;
