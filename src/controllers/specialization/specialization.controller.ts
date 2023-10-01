import { FastifyRequest, FastifyReply } from 'fastify';

import prisma from '../../prisma';

import { logger } from '../../log';
import { DataSendSuccessMessage, DataSendSuccessStatus } from '../../success/base';

export const GetSpecializationsController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const specializations = await prisma.specialization.findMany();

    reply
      .status(DataSendSuccessStatus)
      .send({
        message: DataSendSuccessMessage,
        specializations,
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(error.message);
  }
};
