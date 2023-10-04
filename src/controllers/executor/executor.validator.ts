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

export const ResponseOrderSchema = z.object({
  comment: z
    .string()
    .nonempty(),
  orderId: z
    .string()
    .nonempty(),
}).strict();

export const AcceptOrderSchema = z.object({
  orderId: z
    .string()
    .nonempty(),
}).strict();

export const DeclineOrderSchema = z.object({
  orderId: z
    .string()
    .nonempty(),
}).strict();

export const DoneOrderSchema = z.object({
  comment: z
    .string()
    .nonempty(),
  orderId: z
    .string()
    .nonempty(),
  rating: z
    .number(),
}).strict();
