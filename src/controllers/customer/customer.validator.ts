import { z } from 'zod';

export const PickExecutorSchema = z.object({
  orderId: z
    .string()
    .nonempty(),
  responseId: z
    .string()
    .nonempty(),
}).strict();

export const UnPickExecutorSchema = z.object({
  orderId: z
    .string()
    .nonempty(),
  responseId: z
    .string()
    .nonempty(),
}).strict();
