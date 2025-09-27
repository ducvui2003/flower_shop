import { NextFunction, Request, Response } from 'express';
import { AppResponse } from '@/types/app-response';
import { AppError } from '@/types/app-error';
import logger from '@/utils/logger.util';

const errorMiddleware = () => {
  return (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    logger.info('error middleware');
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err.message || 'Internal Server Error';

    const response: AppResponse = {
      code: statusCode,
      message,
    };
    res.status(statusCode).json(response);
  };
};

export default errorMiddleware;
