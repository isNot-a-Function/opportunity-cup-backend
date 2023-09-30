import { FastifyRequest, FastifyReply } from 'fastify';

import { logger } from '../../log';

import { ChangeRoleSchema } from './user.validator';
import { IChangeRole } from './user.interface';

export const SignInUserController = async (req: FastifyRequest<{ Body: IChangeRole }>, reply: FastifyReply) => {
  try {
    const data = ChangeRoleSchema.parse(req.body);
  } catch (error) {
    error instanceof Error &&
      logger.error(error.message);
  }
};
