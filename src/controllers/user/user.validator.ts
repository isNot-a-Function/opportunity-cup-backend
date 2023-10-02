import { z } from 'zod';

export const GetUserSchema = z.object({
  userId: z
    .string({
      required_error: 'Id польззователя обязательно',
    })
    .nonempty(),
}).strict();
