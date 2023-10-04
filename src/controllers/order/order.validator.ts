import { z } from 'zod';

export const CreateOrderSchema = z.object({
  cost: z
    .number()
    .optional(),
  costType: z
    .enum([
      'none',
      'contract',
      'inHour',
      'inOrder',
    ]),
  description: z
    .string()
    .optional(),
  files: z
    .string()
    .array()
    .optional(),
  specialization: z
    .string({
      required_error: 'Название заказа обязательно',
    })
    .nonempty(),
  tags: z
    .string()
    .array()
    .optional(),
  title: z
    .string({
      required_error: 'Название заказа обязательно',
    })
    .nonempty(),
}).strict();

export const UpdateOrderSchema = z.object({
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
  files: z
    .string()
    .array()
    .optional(),
  orderId: z
    .string()
    .nonempty(),
  specialization: z
    .string()
    .optional(),
  tags: z
    .string()
    .array()
    .optional(),
  title: z
    .string()
    .optional(),
}).strict();

export const ArchiveOrderSchema = z.object({
  orderId: z
    .string()
    .nonempty(),
}).strict();

export const ActiveOrderSchema = z.object({
  orderId: z
    .string()
    .nonempty(),
}).strict();

export const GetOrdersSchema = z.object({
  page: z
    .string()
    .optional(),
}).strict();

export const GetMyOrdersSchema = z.object({
  filter: z
    .enum(['active', 'processed', 'done', 'archived', 'responses']),
  page: z
    .string()
    .optional(),
}).strict();

export const GetOrderSchema = z.object({
  orderId: z
    .string()
    .nonempty(),
}).strict();
