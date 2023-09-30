import { FastifyInstance } from 'fastify';
import { HealthCheckController } from '../controllers/check/check.controller';

export const checkRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.get('/health', HealthCheckController);

  next();
};
