import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

import prisma from '../../prisma';
import { refreshTokenConfiguration } from '../../configuration';
import { ChangeRoleSuccessMessage, ChangeRoleSuccessStatus } from '../../success/user';

import { logger } from '../../log';

import { NotAuthorizedError } from '../../error/auth';
import { ValidationErrorStatus, ValidationErrorMessage } from '../../error/base';
import { createRefreshToken, createToken, verifyAccessToken } from '../../integrations/jwt';

export const ChangeRoleController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      throw new NotAuthorizedError();
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
    error instanceof Error &&
      logger.error(error.message);

    error instanceof NotAuthorizedError &&
      reply
        .status(error.status)
        .send({
          message: error.name,
        });

    error instanceof ZodError &&
      reply
        .status(ValidationErrorStatus)
        .send({
          message: ValidationErrorMessage,
        });
  }
};
