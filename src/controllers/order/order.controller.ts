import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

import prisma from '../../prisma';
import { logger } from '../../log';

import { ValidationErrorStatus, ValidationErrorMessage } from '../../error/base';
import { DataSendSuccessStatus } from '../../success/base';
import {
  ActiveOrderSuccessMessage,
  ActiveOrderSuccessStatus,
  ArchiveOrderSuccessMessage,
  ArchiveOrderSuccessStatus,
  CreateOrderSuccessMessage,
  CreateOrderSuccessStatus,
  UpdateOrderSuccessMessage,
  UpdateOrderSuccessStatus,
} from '../../success/order';
import { NotAuthorizedError } from '../../error/auth';
import { verifyAccessToken } from '../../integrations/jwt';
import {
  ActiveOrderSchema,
  ArchiveOrderSchema,
  CreateOrderSchema,
  GetOrderSchema,
  GetOrdersSchema,
  UpdateOrderSchema,
} from './order.validator';
import {
  IActiveOrder,
  IArchiveOrder,
  ICreateOrder,
  IGetOrder,
  IGetOrders,
  IGetUserOrders,
  IUpdateOrder,
} from './order.interface';

export const CreateOrderController = async (req: FastifyRequest<{ Body: ICreateOrder }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotAuthorizedError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const data = CreateOrderSchema.parse(req.body);

    const newOrder = await prisma.order.create({
      data: {
        cost: data.cost,
        costType: data.costType,
        customer: {
          connect: {
            userId: user.userId,
          },
        },
        description: data.description,
        files: data.files,
        specialization: {
          connect: {
            title: data.specialization,
          },
        },
        tags: data.tags,
        title: data.title,
      },
    });

    reply
      .status(CreateOrderSuccessStatus)
      .send({
        message: CreateOrderSuccessMessage,
        order: newOrder,
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

export const UpdateOrderController = async (req: FastifyRequest<{ Body: IUpdateOrder }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotAuthorizedError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const data = UpdateOrderSchema.parse(req.body);

    const newOrder = await prisma.order.update({
      data: {
        cost: data.cost,
        costType: data.costType,
        customer: {
          connect: {
            userId: user.userId,
          },
        },
        description: data.description,
        files: data.files,
        specialization: {
          connect: {
            title: data.specialization,
          },
        },
        tags: data.tags,
        title: data.title,
      },
      where: {
        id: data.orderId,
      },
    });

    reply
      .status(UpdateOrderSuccessStatus)
      .send({
        message: UpdateOrderSuccessMessage,
        order: newOrder,
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

export const ArchiveOrderController = async (req: FastifyRequest<{ Body: IArchiveOrder }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotAuthorizedError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const data = ArchiveOrderSchema.parse(req.body);

    const newOrder = await prisma.order.update({
      data: {
        status: 'archived',
      },
      where: {
        id: data.orderId,
      },
    });

    reply
      .status(ArchiveOrderSuccessStatus)
      .send({
        message: ArchiveOrderSuccessMessage,
        order: newOrder,
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

export const ActiveOrderController = async (req: FastifyRequest<{ Body: IActiveOrder }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotAuthorizedError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const data = ActiveOrderSchema.parse(req.body);

    const newOrder = await prisma.order.update({
      data: {
        status: 'active',
      },
      where: {
        id: data.orderId,
      },
    });

    reply
      .status(ActiveOrderSuccessStatus)
      .send({
        message: ActiveOrderSuccessMessage,
        order: newOrder,
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

export const GetOrderController = async (req: FastifyRequest<{ Params: IGetOrder }>, reply: FastifyReply) => {
  try {
    const data = GetOrderSchema.parse(req.params);

    const order = await prisma.order.findUnique({
      include: {
        customer: true,
        specialization: true,
      },
      where: {
        id: data.orderId,
      },
    });

    await prisma.order.update({
      data: {
        views: {
          increment: 1,
        },
      },
      where: {
        id: order.id,
      },
    });

    const user = await prisma.user.findUnique({
      include: {
        contact: true,
        custoremInfo: true,
      },
      where: {
        id: order.customer.userId,
      },
    });

    reply
      .status(ActiveOrderSuccessStatus)
      .send({
        order,
        user,
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

export const GetOrdersController = async (req: FastifyRequest<{ Querystring: IGetOrders }>, reply: FastifyReply) => {
  try {
    const data = GetOrdersSchema.parse(req.query);

    if (!data.page) {
      const orders = await prisma.order.findMany({
        include: {
          customer: true,
          specialization: true,
        },
        where: {
          status: 'active',
        },
      });

      const ordersCount = await prisma.order.count({
        where: {
          status: 'active',
        },
      });

      reply
        .status(DataSendSuccessStatus)
        .send({
          count: ordersCount % 15 > 0 ? (ordersCount - ordersCount % 15) / 15 + 1 : ordersCount,
          orders,
        });

      return;
    }

    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        specialization: true,
      },
      skip: 15 * (Number(data.page) - 1),
      take: 15,
      where: {
        status: 'active',
      },
    });

    const ordersCount = await prisma.order.count({
      where: {
        status: 'active',
      },
    });

    reply
      .status(DataSendSuccessStatus)
      .send({
        count: ordersCount % 15 > 0 ? (ordersCount - ordersCount % 15) / 15 + 1 : ordersCount,
        orders,
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

export const GetMyOrdersController = async (req: FastifyRequest<{ Querystring: IGetOrders }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotAuthorizedError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const data = GetOrdersSchema.parse(req.query);

    if (!data.page) {
      const orders = await prisma.order.findMany({
        include: {
          customer: true,
          specialization: true,
        },
        where: {
          customer: {
            userId: user.userId,
          },
        },
      });

      const ordersCount = await prisma.order.count({
        where: {
          customer: {
            userId: user.userId,
          },
        },
      });

      reply
        .status(DataSendSuccessStatus)
        .send({
          count: ordersCount % 15 > 0 ? (ordersCount - ordersCount % 15) / 15 + 1 : ordersCount,
          orders,
        });

      return;
    }

    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        specialization: true,
      },
      skip: 15 * (Number(data.page) - 1),
      take: 15,
      where: {
        customer: {
          userId: user.userId,
        },
      },
    });

    const ordersCount = await prisma.order.count({
      where: {
        customer: {
          userId: user.userId,
        },
      },
    });

    reply
      .status(DataSendSuccessStatus)
      .send({
        count: ordersCount % 15 > 0 ? (ordersCount - ordersCount % 15) / 15 + 1 : ordersCount,
        orders,
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

export const GetUserOrdersController = async (
  req: FastifyRequest<{ Querystring: IGetOrders, Params: IGetUserOrders }>,
  reply: FastifyReply,
) => {
  try {
    const data = GetOrdersSchema.parse(req.query);

    if (!data.page) {
      const orders = await prisma.order.findMany({
        include: {
          customer: true,
          specialization: true,
        },
        where: {
          customer: {
            userId: req.params.userId,
          },
          status: 'active',
        },
      });

      const ordersCount = await prisma.order.count({
        where: {
          customer: {
            userId: req.params.userId,
          },
          status: 'active',
        },
      });

      reply
        .status(DataSendSuccessStatus)
        .send({
          count: ordersCount % 15 > 0 ? (ordersCount - ordersCount % 15) / 15 + 1 : ordersCount,
          orders,
        });
      return;
    }

    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        specialization: true,
      },
      skip: 15 * (Number(data.page) - 1),
      take: 15,
      where: {
        customer: {
          userId: req.params.userId,
        },
        status: 'active',
      },
    });

    const ordersCount = await prisma.order.count({
      where: {
        customer: {
          userId: req.params.userId,
        },
        status: 'active',
      },
    });

    reply
      .status(DataSendSuccessStatus)
      .send({
        count: ordersCount % 15 > 0 ? (ordersCount - ordersCount % 15) / 15 + 1 : ordersCount,
        orders,
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
