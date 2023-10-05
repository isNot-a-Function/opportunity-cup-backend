import { FastifyInstance } from 'fastify';

import {
  ApproveOrderController,
  PickExecutorController,
  UnPickExecutorController,
} from '../controllers/customer/customer.controller';

export const customerRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/pick', PickExecutorController);

  fastify.post('/unpick', UnPickExecutorController);

  fastify.post('/approve', ApproveOrderController);

  next();
};
