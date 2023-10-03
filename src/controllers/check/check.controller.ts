import { FastifyRequest, FastifyReply } from 'fastify';
import * as fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';

import {
  HealthCheckErrorStatus,
  HealthCheckErrorMessage,
} from '../../error/check/checkError';

import {
  HealthCheckSuccessMessage,
  HealthCheckSuccessStatus,
} from '../../success/check';

import { logger } from '../../log';

const pump = util.promisify(pipeline);

export const HealthCheckController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    logger.info(HealthCheckSuccessMessage);

    reply
      .status(HealthCheckSuccessStatus)
      .send({
        message: HealthCheckSuccessMessage,
      });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);

      reply
        .status(HealthCheckErrorStatus)
        .send({
          message: HealthCheckErrorMessage,
        });
    }
  }
};

export const FilesUploadCheckController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const parts = req.files();

    for await (const part of parts) {
      console.log(part.filename);
      await pump(part.file, fs.createWriteStream(part.filename));
    }

    reply
      .status(HealthCheckSuccessStatus)
      .send({
        message: HealthCheckSuccessMessage,
      });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);

      reply
        .status(HealthCheckErrorStatus)
        .send({
          message: HealthCheckErrorMessage,
        });
    }
  }
};
