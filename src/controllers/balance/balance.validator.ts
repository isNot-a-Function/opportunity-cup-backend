import { z } from 'zod';

export const TopUpBalanceSchema = z.object({
  sum: z
    .number(),
}).strict();
