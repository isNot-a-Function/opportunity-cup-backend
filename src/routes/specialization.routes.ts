import { FastifyInstance } from 'fastify';
import { GetSpecializationsController } from '../controllers/specialization/specialization.controller';

export const specializationRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.get('/', GetSpecializationsController);

  next();
};
