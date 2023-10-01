import { FastifyInstance } from 'fastify';
import {
  ActiveOrderController,
  ArchiveOrderController,
  CreateOrderController,
  GetMyOrdersController,
  GetOrdersController,
  GetUserOrdersController,
  UpdateOrderController,
} from '../controllers/order/order.controller';

export const orderRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/create', CreateOrderController);

  fastify.post('/update', UpdateOrderController);

  fastify.post('/archive', ArchiveOrderController);

  fastify.post('/active', ActiveOrderController);

  fastify.get('/', GetOrdersController);

  fastify.get('/:user', GetUserOrdersController);

  fastify.get('/my', GetMyOrdersController);

  next();
};
