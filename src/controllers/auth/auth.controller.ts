import bcrypt from 'bcrypt';
import validate from 'deep-email-validator';

import { ZodError } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import prisma from '../../prisma';

import {
  ExistUserError,
  ExistEmailError,
  InvalidLoginError,
  NonExistUserError,
  PasswordMatchError,
  InvalidRefreshTokenError,
} from '../../error/auth';

import {
  ValidationErrorStatus,
  ValidationErrorMessage,
} from '../../error/base';

import {
  SignUpSuccessStatus,
  SignUpSuccessMessage,
  SignInSuccessStatus,
  SignInSuccessMessage,
  RefreshTokenSuccessStatus,
  RefreshTokenSuccessMessage,
} from '../../success/auth';

import { logger } from '../../log';
import { HASH_COIN } from '../../config';
import { refreshTokenConfiguration } from '../../configuration';
import { createRefreshToken, createToken, verifyRefreshToken } from '../../integrations/jwt';

import { SignInSchema, SignUpSchema } from './auth.validator';
import { ISignInUser, ISignUpUser } from './auth.interface';

export const SignUpUserController = async (req: FastifyRequest<{ Body: ISignUpUser }>, reply: FastifyReply) => {
  try {
    const data = SignUpSchema.parse(req.body);

    const existUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existUser) {
      throw new ExistUserError();
    }

    const isEmailExist = await validate(data.email);

    if (!isEmailExist.valid) {
      throw new ExistEmailError();
    }

    const passwordHash = await bcrypt.hash(data.password, HASH_COIN);

    const newUser = await prisma.user.create({
      data: {
        custoremInfo: {
          create: {
            rating: 0,
          },
        },
        email: data.email,
        executorInfo: {
          create: {
            rating: 0,
          },
        },
        passwordHash,
      },
    });

    const accessToken = createToken(newUser);
    const refreshToken = createRefreshToken(newUser);

    reply
      .status(SignUpSuccessStatus)
      .cookie('refreshToken', refreshToken,
        {
          httpOnly: refreshTokenConfiguration.httpOnly,
          maxAge: refreshTokenConfiguration.maxAge,
          sameSite: refreshTokenConfiguration.sameSite,
          secure: refreshTokenConfiguration.secure,
        },
      )
      .send({
        message: SignUpSuccessMessage,
        token: accessToken,
        user: {
          email: newUser.email,
          id: newUser.id,
          role: newUser.role,
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

    if (error instanceof ExistUserError) {
      reply
        .status(error.status)
        .send({
          message: error.message,
        });
    }

    if (error instanceof ExistEmailError) {
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

export const SignInUserController = async (req: FastifyRequest<{ Body: ISignInUser }>, reply: FastifyReply) => {
  try {
    const data = SignInSchema.parse(req.body);

    if (!data.email) {
      throw new InvalidLoginError();
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!findUser) {
      throw new NonExistUserError();
    }

    const passwordMatch = await bcrypt.compare(data.password, findUser.passwordHash);

    if (!passwordMatch) {
      throw new PasswordMatchError();
    }

    const accessToken = createToken(findUser);
    const refreshToken = createRefreshToken(findUser);

    reply
      .status(SignInSuccessStatus)
      .cookie('refreshToken', refreshToken,
        {
          httpOnly: refreshTokenConfiguration.httpOnly,
          maxAge: refreshTokenConfiguration.maxAge,
          sameSite: refreshTokenConfiguration.sameSite,
          secure: refreshTokenConfiguration.secure,
        },
      )
      .send({
        message: SignInSuccessMessage,
        token: accessToken,
        user: {
          email: findUser.email,
          id: findUser.id,
          role: findUser.role,
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

    if (error instanceof InvalidLoginError) {
      reply
        .status(error.status)
        .send({
          message: error.message,
        });
    }

    if (error instanceof NonExistUserError) {
      reply
        .status(error.status)
        .send({
          message: error.message,
        });
    }

    if (error instanceof PasswordMatchError) {
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

export const RefreshTokenController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    if (req.cookies.refreshToken) {
      const verifyToken = verifyRefreshToken(req.cookies.refreshToken);

      if (typeof verifyToken === 'string') {
        throw new InvalidRefreshTokenError();
      }

      const findUser = await prisma.user.findUnique({
        where: {
          id: verifyToken.userId,
        },
      });

      if (!findUser) {
        throw new NonExistUserError();
      }

      const accessToken = createToken(findUser);
      const refreshToken = createRefreshToken(findUser);

      reply
        .status(RefreshTokenSuccessStatus)
        .cookie('refreshToken', refreshToken,
          {
            httpOnly: refreshTokenConfiguration.httpOnly,
            maxAge: refreshTokenConfiguration.maxAge,
            sameSite: refreshTokenConfiguration.sameSite,
            secure: refreshTokenConfiguration.secure,
          },
        )
        .send({
          message: RefreshTokenSuccessMessage,
          token: accessToken,
        });
    }
  } catch (error) {
    if (error instanceof InvalidRefreshTokenError) {
      reply
        .status(error.status)
        .send({
          message: error.message,
        });
    }

    if (error instanceof NonExistUserError) {
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
