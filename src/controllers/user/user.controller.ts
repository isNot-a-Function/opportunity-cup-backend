import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

import prisma from '../../prisma';
import { refreshTokenConfiguration } from '../../configuration';
import { DataSendSuccessStatus } from '../../success/base';
import { ChangeRoleSuccessMessage, ChangeRoleSuccessStatus } from '../../success/user';

import { logger } from '../../log';

import { NotAuthorizedError, NotTokenError } from '../../error/auth';
import { ValidationErrorStatus, ValidationErrorMessage } from '../../error/base';
import { createRefreshToken, createToken, verifyAccessToken } from '../../integrations/jwt';
import { AddLogoSchema } from './user.validator';
import { IAddLogo, IGetUser, IGetUserBalance } from './user.interface';

export const ChangeRoleController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotTokenError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const updatedUser = await prisma.user.update({
      data: {
        role: user.role === 'executor' ? 'customer' : 'executor',
      },
      where: {
        id: user.userId,
      },
    });

    if (!updatedUser) {
      throw new Error('Updated error');
    }

    const accessToken = createToken(updatedUser);
    const refreshToken = createRefreshToken(updatedUser);

    reply
      .status(ChangeRoleSuccessStatus)
      .cookie('refreshToken', refreshToken,
        {
          httpOnly: refreshTokenConfiguration.httpOnly,
          maxAge: refreshTokenConfiguration.maxAge,
          sameSite: refreshTokenConfiguration.sameSite,
          secure: refreshTokenConfiguration.secure,
        },
      )
      .send({
        message: ChangeRoleSuccessMessage,
        token: accessToken,
        user: {
          email: updatedUser.email,
          id: updatedUser.id,
          role: updatedUser.role,
        },
      });
  } catch (error) {
    if (error instanceof NotAuthorizedError) {
      reply
        .status(error.status)
        .send({
          message: error.message,
        });
    }

    if (error instanceof ZodError) {
      reply
        .status(ValidationErrorStatus)
        .send({
          message: ValidationErrorMessage,
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

export const AddLogoController = async (req: FastifyRequest<{ Body: IAddLogo }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotTokenError();
    }

    const user = verifyAccessToken(req.headers.authorization);

    if (typeof user === 'string') {
      throw new NotAuthorizedError();
    }

    const data = AddLogoSchema.parse(req.body);

    const updatedUser = await prisma.user.update({
      data: {
        logo: data.logo,
      },
      where: {
        id: user.userId,
      },
    });

    reply
      .status(200)
      .send({
        message: 'Логотип обновлен',
        updatedUser,
      });
  } catch (error) {
    if (error instanceof NotAuthorizedError) {
      reply
        .status(error.status)
        .send({
          message: error.message,
        });
    }

    if (error instanceof ZodError) {
      reply
        .status(ValidationErrorStatus)
        .send({
          message: ValidationErrorMessage,
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

export const GetUserController = async (
  req: FastifyRequest,
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

    const findUser = await prisma.user.findUnique({
      include: {
        contact: true,
        custoremInfo: true,
        decreaseBalance: true,
        executorInfo: true,
        topUpBalance: true,
      },
      where: {
        id: user.userId,
      },
    });

    reply
      .status(DataSendSuccessStatus)
      .send({
        user: findUser,
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

export const GetUserBalanceController = async (
  req: FastifyRequest<{ Querystring: IGetUserBalance }>,
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

    const topUpBalance = await prisma.topUpBalance.findMany({
      skip: 15 * (Number(data.page) - 1),
      take: 15,
      where: {
        toUser: {
          id: user.userId,
        },
      },
    });

    const decreaseBalance = await prisma.decreaseBalance.findMany({
      skip: 15 * (Number(data.page) - 1),
      take: 15,
      where: {
        fromUser: {
          id: user.userId,
        },
      },
    });

    const topUpBalanceCount = await prisma.topUpBalance.count({
      where: {
        toUser: {
          id: user.userId,
        },
      },
    });

    const decreaseBalanceCount = await prisma.decreaseBalance.count({
      where: {
        fromUser: {
          id: user.userId,
        },
      },
    });

    reply
      .status(DataSendSuccessStatus)
      .send({
        decreaseBalance,
        decreaseBalanceCount: decreaseBalanceCount % 15 > 0
          ? (decreaseBalanceCount - decreaseBalanceCount % 15) / 15 + 1
          : decreaseBalanceCount,
        topUpBalance,
        topUpBalanceCount: topUpBalanceCount % 15 > 0
          ? (topUpBalanceCount - topUpBalanceCount % 15) / 15 + 1
          : topUpBalanceCount,
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
