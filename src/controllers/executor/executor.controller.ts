import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

import { UpdateExecutorSuccessMessage, UpdateExecutorSuccessStatus } from '../../success/executor';
import prisma from '../../prisma';

import { NotAuthorizedError, NotTokenError } from '../../error/auth';
import { ValidationErrorStatus, ValidationErrorMessage } from '../../error/base';
import { verifyAccessToken } from '../../integrations/jwt';

import { logger } from '../../log';
import { IDeclineOrder, IDoneOrder, IResponseOrder, IUpdateExecutorInfo } from './executor.interface';
import { DeclineOrderSchema, DoneOrderSchema, ResponseOrderSchema, UpdateExecutorSchema } from './executor.validator';

export const UpdateExecutorInfoController = async (
  req: FastifyRequest<{ Body: IUpdateExecutorInfo }>,
  reply: FastifyReply,
) => {
  try {
    if (!req.headers.authorization) {
      throw new NotTokenError();
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
      .status(UpdateExecutorSuccessStatus)
      .send({
        executor: updateExecutor,
        message: UpdateExecutorSuccessMessage,
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

export const ResponseOrderController = async (
  req: FastifyRequest<{ Params: IResponseOrder }>,
  reply: FastifyReply,
) => {
  try {
    if (!req.headers.authorization) {
      throw new NotTokenError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const data = ResponseOrderSchema.parse(req.body);

    const findUser = await prisma.user.findUnique({
      include: {
        executorInfo: true,
      },
      where: {
        id: user.userId,
      },
    });

    await prisma.response.create({
      data: {
        comment: data.comment,
        executor: {
          connect: {
            id: findUser.executorInfo.id,
          },
        },
        order: {
          connect: {
            id: data.orderId,
          },
        },
      },
    });

    await prisma.order.update({
      data: {
        responsesCount: {
          increment: 1,
        },
      },
      where: {
        id: data.orderId,
      },
    });

    reply
      .status(200)
      .send({
        message: 'Отклик отправлен',
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

export const DeclineOderController = async (
  req: FastifyRequest<{ Body: IDeclineOrder }>,
  reply: FastifyReply,
) => {
  try {
    if (!req.headers.authorization) {
      throw new NotTokenError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const data = DeclineOrderSchema.parse(req.body);

    const authUser = await prisma.user.findUnique({
      include: {
        executorInfo: true,
      },
      where: {
        id: user.userId,
      },
    });

    await prisma.response.delete({
      where: {
        orderId_executorId: {
          executorId: authUser.executorInfo.id,
          orderId: data.orderId,
        },
      },
    });

    reply
      .status(200)
      .send({
        message: 'Отклик удален',
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

export const DoneOrderController = async (
  req: FastifyRequest<{ Body: IDoneOrder }>,
  reply: FastifyReply,
) => {
  try {
    if (!req.headers.authorization) {
      throw new NotTokenError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const data = DoneOrderSchema.parse(req.body);

    await prisma.order.update({
      data: {
        doneExecutor: {
          connect: {
            userId: user.userId,
          },
        },
        status: 'inCheck',
      },
      where: {
        id: data.orderId,
      },
    });

    reply
      .status(200)
      .send({
        message: 'Комментарий отправлен заказчику',
      });

    // TODO: Отправить сообщение заказчику
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
