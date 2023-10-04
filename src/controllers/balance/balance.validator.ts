import { z } from 'zod';

export const TopUpBalanceSchema = z.object({
  sum: z
    .number(),
}).strict();

export const DecreaseBalanceSchema = z.object({
  sum: z
    .number(),
}).strict();
