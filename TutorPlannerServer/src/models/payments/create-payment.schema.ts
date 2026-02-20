import { z } from "zod";

export const createPaymentSchema = z.object({
  studentId: z.number(),
  price: z.number().min(1),
  date: z.string().optional(),
  type: z.enum(['DIGITAL', 'CASH']).optional(),
  accountId: z.number().optional()
});

export type CreatePayment = z.infer<typeof createPaymentSchema>;
