import 'module-alias/register';

import envConfig from '@/config/env.config';
import errorMiddleware from '@/middlewares/error.middleware';
import routers from '@/routes/index';
import express from 'express';
import serializeMiddleware from '@/middlewares/serialize.middleware';
import logger from '@/utils/logger.util';
import loggingMiddleware from '@/middlewares/logging.middleware';
import corsMiddleware from '@/middlewares/cors.middleware';

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
