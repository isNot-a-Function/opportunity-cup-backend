/* eslint-disable no-magic-numbers */

import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z
    .string({
      required_error: 'Почта пользователя обязательна!',
    })
    .email()
    .nonempty(),
  password: z
    .string({
      required_error: 'Пароль пользователя обязателен!',
    })
    .min(8)
    .nonempty(),
}).strict();

export const SignInSchema = z.object({
  email: z
    .string()
    .email()
    .optional(),
  password: z
    .string({
      required_error: 'Пароль пользователя обязателен!',
    })
    .min(8)
    .nonempty(),
}).strict();
