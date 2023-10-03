import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

import { logger } from '../../log';
import { NotTokenError, NotAuthorizedError } from '../../error/auth';
import { verifyAccessToken } from '../../integrations/jwt';
import { ValidationErrorStatus, ValidationErrorMessage } from '../../error/base';
import prisma from '../../prisma';
import { ITopUpBalance } from './balance.interface';
import { TopUpBalanceSchema } from './balance.validator';

export const TopUpBalanceController = async (req: FastifyRequest<{ Body: ITopUpBalance }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotTokenError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const data = TopUpBalanceSchema.parse(req.body);

    await prisma.user.update({
      data: {
        balance: {
          increment: data.sum,
        },
      },
      where: {
        id: user.userId,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      reply
        .status(ValidationErrorStatus)
        .send({
          message: ValidationErrorMessage,
        });
    }

    if (error instanceof NotAuthorizedError) {
      reply
        .status(error.status)
        .send({
          message: error.message,
        });
    }

    if (error instanceof NotTokenError) {
      reply
        .status(error.status)
        .send({
          message: error.message,
        });
    }

    if (error instanceof Error) {
      logger.error(error.message);

      reply
        .status(400)
        .send({
          message: error.message,
        });
    }
  }
};
