import { FastifyInstance } from 'fastify';
import { UpdateExecutorInfoController } from 'controllers/executor/executor.controller';

export const executorRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/update', UpdateExecutorInfoController);

  next();
};
