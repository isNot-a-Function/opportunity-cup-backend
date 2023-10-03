import { FastifyInstance } from 'fastify';
import { FilesUploadCheckController, HealthCheckController } from '../controllers/check/check.controller';

export const checkRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.get('/health', HealthCheckController);

  fastify.post('/files', FilesUploadCheckController);

  next();
};
