import { FastifyInstance } from 'fastify';
import {
  AddLogoController,
  ChangeRoleController,
  GetUserBalanceController,
  GetUserController,
} from '../controllers/user/user.controller';

export const userRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/change', ChangeRoleController);

  fastify.post('/logo', AddLogoController);

  fastify.get('/:userId', GetUserController);

  fastify.get('/balance/:userId', GetUserBalanceController);

  next();
};
