import { FastifyInstance } from 'fastify';
import { SignInUserController, SignUpUserController } from '../controllers/auth/auth.controller';

export const authRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/signup', SignUpUserController);

  fastify.post('/signin', SignInUserController);

  next();
};
