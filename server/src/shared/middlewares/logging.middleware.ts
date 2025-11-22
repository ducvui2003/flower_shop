import pinoHttp from 'pino-http';
import logger from '@/shared/utils/logger.util';

const loggingMiddleware = pinoHttp({
  logger,
  customLogLevel: (res, err) => {
    if (res.statusCode && res.statusCode >= 500) return 'error';
    if (res.statusCode && res.statusCode >= 400) return 'warn';
    return 'info';
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      body: req.body,
      headers: req.headers,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});

export default loggingMiddleware;
