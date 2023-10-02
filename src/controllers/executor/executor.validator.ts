import { z } from 'zod';

export const UpdateExecutorSchema = z.object({
  classification: z
    .string()
    .optional(),
  cost: z
    .number()
    .optional(),
  costType: z
    .enum([
      'none',
      'contract',
      'inHour',
      'inOrder',
    ])
    .optional(),
  description: z
    .string()
    .optional(),
  expirience: z
    .enum([
      'lessYear',
      'overYear',
      'overThreeYear',
      'overFiveYear',
      'overTeenYear',
    ])
    .optional(),
  specializations: z
    .string()
    .array()
    .optional(),
  tags: z
    .string()
    .array()
    .optional(),
}).strict();