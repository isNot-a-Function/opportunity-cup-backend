import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

import prisma from '../../prisma';

import { NotTokenError, NotAuthorizedError } from '../../error/auth';
import { ValidationErrorStatus, ValidationErrorMessage } from '../../error/base';
import { verifyAccessToken } from '../../integrations/jwt';
import { logger } from '../../log';
import { IApproveOrder, IPickExecutor, IUnPickExecutor } from './customer.interface';
import { PickExecutorSchema, UnPickExecutorSchema } from './customer.validator';

export const PickExecutorController = async (
  req: FastifyRequest<{ Body: IPickExecutor }>,
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

    const data = PickExecutorSchema.parse(req.body);

    const response = await prisma.response.findUnique({
      where: {
        id: data.responseId,
      },
    });

    await prisma.order.update({
      data: {
        executor: {
          connect: {
            id: response.executorId,
          },
        },
        status: 'inProcess',
      },
      where: {
        id: data.orderId,
      },
    });

    // TODO: Отправить сообщение исполнителю
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

export const UnPickExecutorController = async (
  req: FastifyRequest<{ Body: IUnPickExecutor }>,
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

    const data = UnPickExecutorSchema.parse(req.body);

    const response = await prisma.response.findUnique({
      where: {
        id: data.responseId,
      },
    });

    await prisma.executorInfo.update({
      data: {
        activeOrders: {
          disconnect: {
            id: data.orderId,
          },
        },
      },
      where: {
        id: response.executorId,
      },
    });

    await prisma.order.update({
      data: {
        status: 'active',
      },
      where: {
        id: response.orderId,
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

export const ApproveOrderController = async (
  req: FastifyRequest<{ Body: IApproveOrder }>,
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

    const data = req.body;

    const order = await prisma.order.findUnique({
      include: {
        doneExecutor: true,
      },
      where: {
        id: data.orderId,
      },
    });

    await prisma.response.delete({
      where: {
        orderId_executorId: {
          executorId: order.doneExecutorId,
          orderId: data.orderId,
        },
      },
    });

    await prisma.order.update({
      data: {
        status: 'done',
      },
      where: {
        id: data.orderId,
      },
    });

    await prisma.executorInfo.update({
      data: {
        rating: (order.doneExecutor.rating * order.doneExecutor.ratingCount + data.rating) /
        (order.doneExecutor.ratingCount + 1),
        ratingCount: {
          increment: 1,
        },
      },
      where: {
        id: order.doneExecutorId,
      },
    });

    await prisma.user.update({
      data: {
        balance: {
          decrement: data.cost ? data.cost : order.cost,
        },
      },
      where: {
        id: user.userId,
      },
    });

    await prisma.user.update({
      data: {
        balance: {
          increment: data.cost ? data.cost : order.cost,
        },
      },
      where: {
        id: order.doneExecutor.userId,
      },
    });

    reply
      .status(200)
      .send({
        message: 'Выполнение подтверждено',
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
