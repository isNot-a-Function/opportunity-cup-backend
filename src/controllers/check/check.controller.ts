import { FastifyRequest, FastifyReply } from 'fastify';

import {
  HealthCheckErrorStatus,
  HealthCheckErrorMessage,
} from '../../error/check/checkError';

import {
  HealthCheckSuccessMessage,
  HealthCheckSuccessStatus,
} from '../../success/check';

import { logger } from '../../log';

export const HealthCheckController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    logger.info(HealthCheckSuccessMessage);

    reply
      .status(HealthCheckSuccessStatus)
      .send({
        message: HealthCheckSuccessMessage,
      });
  } catch (error) {
    error instanceof Error &&
      reply
        .status(HealthCheckErrorStatus)
        .send({
          message: HealthCheckErrorMessage,
        });
  }
};
