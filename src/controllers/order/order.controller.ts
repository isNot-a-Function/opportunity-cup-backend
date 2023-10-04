import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

import { Order } from '@prisma/client';
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
import { NotAuthorizedError, NotTokenError } from '../../error/auth';
import { verifyAccessToken } from '../../integrations/jwt';
import {
  ActiveOrderSchema,
  ArchiveOrderSchema,
  CreateOrderSchema,
  GetMyOrdersSchema,
  GetOrderSchema,
  GetOrdersSchema,
  UpdateOrderSchema,
} from './order.validator';
import {
  IActiveOrder,
  IArchiveOrder,
  ICreateOrder,
  IGetMyOrders,
  IGetOrder,
  IGetOrders,
  IGetUserOrders,
  IUpdateOrder,
} from './order.interface';

export const CreateOrderController = async (req: FastifyRequest<{ Body: ICreateOrder }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotTokenError();
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

export const UpdateOrderController = async (req: FastifyRequest<{ Body: IUpdateOrder }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotTokenError();
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

export const ArchiveOrderController = async (req: FastifyRequest<{ Body: IArchiveOrder }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotTokenError();
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

export const ActiveOrderController = async (req: FastifyRequest<{ Body: IActiveOrder }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotTokenError();
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

export const GetOrderController = async (req: FastifyRequest<{ Params: IGetOrder }>, reply: FastifyReply) => {
  try {
    const data = GetOrderSchema.parse(req.params);

    const order = await prisma.order.findUnique({
      include: {
        customer: true,
        doneExecutor: true,
        executor: true,
        responses: {
          include: {
            executor: true,
          },
        },
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

    if (!req.headers.authorization) {
      const findUser = await prisma.user.findUnique({
        include: {
          contact: true,
          custoremInfo: true,
        },
        where: {
          id: order.customer.userId,
        },
      });

      reply
        .send({
          order,
          user: findUser,
        });

      return;
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    if (order.customer.userId === user.userId) {
      const findUser = await prisma.user.findUnique({
        include: {
          contact: true,
          custoremInfo: true,
        },
        where: {
          id: order.customer.userId,
        },
      });

      const responses = await prisma.response.findMany({
        where: {
          orderId: order.id,
        },
      });

      reply
        .send({
          order,
          responses,
          user: findUser,
        });
    } else {
      const findUser = await prisma.user.findUnique({
        include: {
          contact: true,
          custoremInfo: true,
        },
        where: {
          id: order.customer.userId,
        },
      });

      reply
        .send({
          order,
          user: findUser,
        });
    }
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

export const GetOrdersController = async (req: FastifyRequest<{ Querystring: IGetOrders }>, reply: FastifyReply) => {
  try {
    const data = GetOrdersSchema.parse(req.query);

    if (!data.page) {
      const orders = await prisma.order.findMany({
        include: {
          customer: true,
          responses: {
            include: {
              executor: true,
            },
          },
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
        responses: {
          include: {
            executor: true,
          },
        },
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

export const GetMyOrdersController = async (
  req: FastifyRequest<{ Querystring: IGetMyOrders }>,
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

    const data = req.query;

    let orders: Order[];

    let ordersCount: number;

    if (!data.page) {
      switch (data.filter) {
        case 'active':
          orders = await prisma.order.findMany({
            include: {
              customer: true,
              doneExecutor: true,
              executor: true,
              responses: {
                include: {
                  executor: true,
                },
              },
              specialization: true,
            },
            skip: 15 * (Number(data.page) - 1),
            take: 15,
            where: {
              customer: {
                userId: user.userId,
              },
              status: 'active',
            },
          });

          ordersCount = await prisma.order.count({
            where: {
              customer: {
                userId: user.userId,
              },
              status: 'active',
            },
          });

          return;
        case 'processed':
          orders = await prisma.order.findMany({
            include: {
              customer: true,
              doneExecutor: true,
              executor: true,
              responses: {
                include: {
                  executor: true,
                },
              },
              specialization: true,
            },
            skip: 15 * (Number(data.page) - 1),
            take: 15,
            where: {
              customer: {
                userId: user.userId,
              },
              status: 'inProcess',
            },
          });

          ordersCount = await prisma.order.count({
            where: {
              customer: {
                userId: user.userId,
              },
              status: 'inProcess',
            },
          });

          return;
        case 'done':
          orders = await prisma.order.findMany({
            include: {
              customer: true,
              doneExecutor: true,
              executor: true,
              responses: {
                include: {
                  executor: true,
                },
              },
              specialization: true,
            },
            skip: 15 * (Number(data.page) - 1),
            take: 15,
            where: {
              customer: {
                userId: user.userId,
              },
              status: 'done',
            },
          });

          ordersCount = await prisma.order.count({
            where: {
              customer: {
                userId: user.userId,
              },
              status: 'done',
            },
          });

          return;
        case 'archived':
          orders = await prisma.order.findMany({
            include: {
              customer: true,
              doneExecutor: true,
              executor: true,
              responses: {
                include: {
                  executor: true,
                },
              },
              specialization: true,
            },
            skip: 15 * (Number(data.page) - 1),
            take: 15,
            where: {
              customer: {
                userId: user.userId,
              },
              status: 'archived',
            },
          });

          ordersCount = await prisma.order.count({
            where: {
              customer: {
                userId: user.userId,
              },
              status: 'archived',
            },
          });

          return;
        case 'responses':
          orders = await prisma.order.findMany({
            include: {
              customer: true,
              doneExecutor: true,
              executor: true,
              responses: {
                include: {
                  executor: true,
                },
              },
              specialization: true,
            },
            skip: 15 * (Number(data.page) - 1),
            take: 15,
            where: {
              responses: {
                every: {
                  executor: {
                    userId: user.userId,
                  },
                },
              },
            },
          });

          ordersCount = await prisma.order.count({
            where: {
              responses: {
                every: {
                  executor: {
                    userId: user.userId,
                  },
                },
              },
            },
          });

          return;
        default:
          orders = await prisma.order.findMany({
            include: {
              customer: true,
              doneExecutor: true,
              executor: true,
              responses: {
                include: {
                  executor: true,
                },
              },
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

          ordersCount = await prisma.order.count({
            where: {
              customer: {
                userId: user.userId,
              },
              status: 'active',
            },
          });

          return;
      }
    }

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
          doneExecutor: true,
          executor: true,
          responses: {
            include: {
              executor: true,
            },
          },
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
        responses: {
          include: {
            executor: true,
          },
        },
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
