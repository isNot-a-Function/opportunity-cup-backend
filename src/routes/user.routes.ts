import { FastifyInstance } from 'fastify';
import { ChangeRoleController } from '../controllers/user/user.controller';

export const userRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.get('/change', ChangeRoleController);

  next();
};
