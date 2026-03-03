import express, { Request, Router } from 'express';
import PaymentsService from '../services/PaymentsService';
import { CreatePayment, createPaymentSchema } from '../models/payments/create-payment.schema';
import { updatePaymentSchema } from '../models/payments/update-payment.schema';
import { QuarterDetailsView } from '../models/payments/quarter-details-response.dto';
import { quarterDetailsQueryParamsSchema } from '../models/payments/quarter-details-query-param.schema';
import {
    PaymentDTO,
    paymentsToPaymentsDTO,
    paymentToPaymentDTO,
} from '../models/payments/payment-response.dto';
import { z } from 'zod';

/**
 * Typescript don't like merging params so as workaround cast req.params to any
 */
const router: Router = express.Router({ mergeParams: true });

/**
 * path: /payments/summary/quarter
 */
router.get(
    '/summary/quarter',
    async (
        req: Request<
            {},
            QuarterDetailsView,
            {},
            {
                quarter?: String;
                year?: String;
            }
        >,
        res,
        next,
    ) => {
        try {
            const params = quarterDetailsQueryParamsSchema.parse({
                quarter: Number(req.query.quarter),
                year: Number(req.query.year),
            });
            const quarterDetailsView = await PaymentsService.getQuarterDetails(
                params.quarter,
                params.year,
            );
            res.status(200).json(quarterDetailsView);
        } catch (err) {
            next(err);
        }
    },
);

/**
 * path: /payments
 */
router.get(
    '/',
    async (
        req: Request<
            {},
            PaymentDTO[],
            {},
            {
                month?: String;
                year?: String;
            }
        >,
        res,
        next,
    ) => {
        try {
            const { month, year } = req.query;
            let payments = [];

            if (!month && !year) {
                payments = await PaymentsService.getFilteredPayments();
            } else {
                const params = z
                    .object({
                        //TODO - create common schemas for date and time
                        month: z.number().min(1).max(12),
                        year: z.number().min(2000).max(2100),
                    })
                    .parse({
                        month: Number(month),
                        year: Number(year),
                    });
                payments = await PaymentsService.getFilteredPayments(params);
            }

            res.status(200).json(paymentsToPaymentsDTO(payments));
        } catch (err) {
            next(err);
        }
    },
);

/**
 * path: /payments
 */
router.post('/', async (req: Request<{}, PaymentDTO, CreatePayment>, res, next) => {
    try {
        const parsedBody = createPaymentSchema.parse(req.body);
        const payment = await PaymentsService.addPayment(parsedBody);
        const data = await PaymentsService.getPayment(payment.id)
        res.status(200).json(paymentToPaymentDTO(data));
    } catch (err) {
        next(err);
    }
});

/**
 * path: /payments/:paymentId
 */
router.get('/:id', async (req, res, next) => {
    try {
        const payment = await PaymentsService.getPayment(Number(req.params.id));
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
        const parsedBody = updatePaymentSchema.parse(req.body);
        const payment = await PaymentsService.updatePayment(Number(req.params.id), parsedBody);
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
        const payment = await PaymentsService.deletePayment(Number(req.params.id));
        res.status(200).json(payment);
    } catch (err) {
        next(err);
    }
});

export default router;
