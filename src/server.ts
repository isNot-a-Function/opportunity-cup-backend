import fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';

import { COOKIE_SECRET, SERVER_HOST, SERVER_PORT } from './config';
import { logger } from './log';
import { whitelistCORS } from './configuration';

import { fileRouter } from './routes/file.routes';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { checkRouter } from './routes/check.routes';
import { orderRouter } from './routes/order.routes';
import { balanceRouter } from './routes/balance.routes';
import { executorRouter } from './routes/executor.routes';
import { specializationRouter } from './routes/specialization.routes';
import { customerRouter } from './routes/customer.routes';

const server = fastify();

export const startServer = async () => {
  try {
    await server.register(cookie, {
      parseOptions: {},
      secret: COOKIE_SECRET,
    });

    await server.register(cors, {
      allowedHeaders: [
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Origin',
        'Origin',
        'Accept',
        'X-Requested-With',
        'Content-Type',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
        'Authorization',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
      origin: (origin, callback) => {
        if (origin === undefined) {
          logger.warn('Undefined request origin...');
          callback(null, false);
        } else if (whitelistCORS.includes(origin)) {
          logger.info('Succesed request origin...');
          callback(null, true);
        } else {
          logger.warn('Invalid request origin...');
          callback(null, false);
        }
      },
    });

    await server.register(fastifyMultipart, {
      limits: {
        fileSize: 1 * 1024 * 1024 * 32,
        files: 5,
      },
    });

    await server.register(checkRouter, {
      prefix: '/api/check',
    });

    await server.register(authRouter, {
      prefix: '/api/auth',
    });

    await server.register(userRouter, {
      prefix: '/api/user',
    });

    await server.register(specializationRouter, {
      prefix: '/api/specialization',
    });

    await server.register(orderRouter, {
      prefix: '/api/order',
    });

    await server.register(executorRouter, {
      prefix: '/api/executor',
    });

    await server.register(fileRouter, {
      prefix: '/api/file',
    });

    await server.register(balanceRouter, {
      prefix: '/api/balance',
    });

    await server.register(customerRouter, {
      prefix: '/api/customer',
    });

    await server.ready().then(() => {
      logger.info('Successfully fastify server!');
    }, (error) => {
      error instanceof Error &&
        logger.error(error.message);
    });

    await server.ready();

    server.listen({
      host: SERVER_HOST,
      port: Number(SERVER_PORT),
    }, (error) => {
      error === null ? logger.info(`Server started at http://${SERVER_HOST}:${SERVER_PORT}`) : logger.error(error.stack);
    });
  } catch (error) {
    error instanceof Error &&
      logger.error(error.message);
  }
};
