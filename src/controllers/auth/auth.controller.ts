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
} from '../../success/auth';

import { logger } from '../../log';
import { HASH_COIN } from '../../config';
import { refreshTokenConfiguration } from '../../configuration';
import { createRefreshToken, createToken } from '../../integrations/jwt';

import { SignInSchema, SignUpSchema } from './auth.validator';
import { ISignInUser, ISignUpUser } from './auth.interface';

export const SignUpUserController = async (req: FastifyRequest<{ Body: ISignUpUser }>, reply: FastifyReply) => {
  try {
    logger.info('Register user');
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
        email: data.email,
        passwordHash,
        role: data.role,
      },
    });

    reply
      .status(SignUpSuccessStatus)
      .send({
        data: newUser,
        message: SignUpSuccessMessage,
      });
  } catch (error) {
    error instanceof ZodError &&
      reply
        .status(ValidationErrorStatus)
        .send({
          message: ValidationErrorMessage,
        });

    error instanceof ExistUserError &&
      reply
        .status(error.status)
        .send({
          message: error.message,
        });

    error instanceof ExistEmailError &&
      reply
        .status(error.status)
        .send({
          message: error.message,
        });
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
        user: findUser,
      });
  } catch (error) {
    error instanceof ZodError &&
      reply
        .status(ValidationErrorStatus)
        .send({
          message: ValidationErrorMessage,
        });

    error instanceof InvalidLoginError &&
      reply
        .status(error.status)
        .send({
          message: error.message,
        });

    error instanceof NonExistUserError &&
      reply
        .status(error.status)
        .send({
          message: error.message,
        });

    error instanceof PasswordMatchError &&
      reply
        .status(error.status)
        .send({
          message: error.message,
        });
  }
};
