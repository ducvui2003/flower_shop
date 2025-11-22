import 'module-alias/register';
import envConfig from '@/shared/config/env.config';
import corsMiddleware from '@/shared/middlewares/cors.middleware';
import errorMiddleware from '@/shared/middlewares/error.middleware';
import loggingMiddleware from '@/shared/middlewares/logging.middleware';
import serializeMiddleware from '@/shared/middlewares/serialize.middleware';
import routers from '@/shared/router';
import logger from '@/shared/utils/logger.util';
import express from 'express';

const bootstrap = () => {
  const app = express();
  // Middleware
  app.use(express.json());
  app.use(corsMiddleware());
  app.use(loggingMiddleware);
  app.use(serializeMiddleware());

  // Router
  app.use('/api', routers);

  // Error handler
  app.use(errorMiddleware());
  app.listen(envConfig.PORT, () => {
    logger.info(`⚡️ Server running at http://localhost:${envConfig.PORT}`);
  });
};

bootstrap();
