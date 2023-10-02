import { FastifyRequest, FastifyReply } from 'fastify';

import prisma from '../../prisma';

import { logger } from '../../log';
import { DataSendSuccessStatus } from '../../success/base';

export const GetSpecializationsController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const specializations = await prisma.specialization.findMany();

    reply
      .status(DataSendSuccessStatus)
      .send({
        specializations,
      });
  } catch (error) {
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
