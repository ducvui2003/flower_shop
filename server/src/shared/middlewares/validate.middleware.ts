import { AppResponseWrapper } from '@/types/app';
import MESSAGE from '@/shared/utils/message.util';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodTypeAny } from 'zod/v4';

const validationBodyMiddleware = (schema: ZodTypeAny): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        const groupedErrors = err.issues.reduce(
          (acc, issue) => {
            const path = issue.path.join('.');
            if (!acc[path]) acc[path] = [];
            acc[path].push(issue.message);
            return acc;
          },
          {} as Record<string, string[]>,
        );
        const response: AppResponseWrapper = {
          code: StatusCodes.UNPROCESSABLE_ENTITY,
          message: MESSAGE.VALIDATION.HTTP.COMMON,
          error: groupedErrors,
          isSuccess: false,
          time: new Date(),
          url: req.originalUrl,
        };
        res.status(response.code).json(response);
      } else res.status(StatusCodes.BAD_REQUEST).json();
    }
  };
};

export default validationBodyMiddleware;
