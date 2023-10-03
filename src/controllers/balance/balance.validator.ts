import { z } from 'zod';

export const TopUpBalanceOrderSchema = z.object({
  sum: z
    .number(),
}).strict();
