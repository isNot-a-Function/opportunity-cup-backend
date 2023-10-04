import { FastifyInstance } from 'fastify';
import {
  DeclineOderController,
  ResponseOrderController,
  UpdateExecutorInfoController,
} from '../controllers/executor/executor.controller';

export const executorRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/update', UpdateExecutorInfoController);

  fastify.post('/response', ResponseOrderController);

  fastify.post('/decline', DeclineOderController);

  next();
};
