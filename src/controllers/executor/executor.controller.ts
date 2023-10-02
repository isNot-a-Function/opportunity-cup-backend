import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

import prisma from '../../prisma';

import { NotAuthorizedError } from '../../error/auth';
import { ValidationErrorStatus, ValidationErrorMessage } from '../../error/base';
import { verifyAccessToken } from '../../integrations/jwt';

import { logger } from '../../log';
import { DataSendSuccessStatus } from '../../success/base';
import { IUpdateExecutorInfo } from './executor.interface';
import { UpdateExecutorSchema } from './executor.validator';

export const UpdateExecutorInfoController = async (
  req: FastifyRequest<{ Body: IUpdateExecutorInfo }>,
  reply: FastifyReply,
) => {
  try {
    if (!req.headers.authorization) {
      throw new NotAuthorizedError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const data = UpdateExecutorSchema.parse(req.body);

    const findUser = await prisma.user.findUnique({
      include: {
        executorInfo: true,
      },
      where: {
        id: user.userId,
      },
    });

    const updateExecutor = await prisma.executorInfo.update({
      data: {
        classification: data.classification,
        cost: data.cost,
        costType: data.costType,
        description: data.description,
        expirience: data.expirience,
        specializations: {
          connect: data.specializations.map((title) => ({ title })),
        },
        tags: data.tags,
      },
      where: {
        id: findUser.executorInfo.id,
      },
    });

    reply
      .status(DataSendSuccessStatus)
      .send({
        executor: updateExecutor,
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
