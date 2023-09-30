import { UserRoleEnum } from '@prisma/client';
import { z } from 'zod';

export const ChangeRoleSchema = z.object({
  role: z
    .enum([
      UserRoleEnum.customer,
      UserRoleEnum.executor,
    ]),
}).strict();
