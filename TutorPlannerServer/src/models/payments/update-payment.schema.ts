import { z } from "zod";

export const updatePaymentSchema = z.object({
  studentId: z.number().optional(),
  price: z.number().min(1).optional(),
  date: z.string().optional(),
  type: z.enum(['DIGITAL', 'CASH']).optional(),
  accountId: z.number().optional()
});

export type UpdatePayment = z.infer<typeof updatePaymentSchema>;
