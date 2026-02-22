import { z } from "zod";

export const quarterDetailsQueryParamsSchema = z.object({
  quarter: z.number().min(1).max(4),
  year: z.number().min(2024).max(2100)
});
