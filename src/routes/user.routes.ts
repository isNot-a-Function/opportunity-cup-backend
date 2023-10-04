import { FastifyInstance } from 'fastify';
import { AddLogoController, ChangeRoleController, GetUserController } from '../controllers/user/user.controller';

export const userRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/change', ChangeRoleController);

  fastify.post('/logo', AddLogoController);

  fastify.get('/:userId', GetUserController);

  next();
};
