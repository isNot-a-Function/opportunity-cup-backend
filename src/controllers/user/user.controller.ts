import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

import { logger } from '../../log';

import { ValidationErrorStatus, ValidationErrorMessage } from '../../error/base';
import { ChangeRoleSchema } from './user.validator';
import { IChangeRole } from './user.interface';

export const SignInUserController = async (req: FastifyRequest<{ Body: IChangeRole }>, reply: FastifyReply) => {
  try {
    const data = ChangeRoleSchema.parse(req.body);

    if (!data.role) {
      throw new ZodError([]);
    }
  } catch (error) {
    error instanceof Error &&
      logger.error(error.message);

    error instanceof ZodError &&
      reply
        .status(ValidationErrorStatus)
        .send({
          message: ValidationErrorMessage,
        });
  }
};
