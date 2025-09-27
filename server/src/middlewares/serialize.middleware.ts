import { AppResponseWrapper } from '@/types/app-response';
import logger from '@/utils/logger.util';
import { NextFunction, Request, Response } from 'express';

const serializeMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info('serialize middleware');
    const originalJson = res.json.bind(res);

    res.json = ((data: any) => {
      const formatted: AppResponseWrapper = {
        code: data.code ?? res.statusCode,
        message: data?.message || 'Error',
        data: data?.data ?? null,
        error: data?.error ?? null,
        isSuccess: (data.code ?? res.statusCode) < 400,
        time: new Date(),
        url: req.originalUrl,
      };
      return originalJson(formatted);
    }) as any;

    next();
  };
};
export default serializeMiddleware;
