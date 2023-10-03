import { FastifyInstance } from 'fastify';

import { TopUpBalanceController } from '../controllers/balance/balance.controller';

export const balanceRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/topup', TopUpBalanceController);

  next();
};
