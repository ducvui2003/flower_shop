import { AppResponseWrapper } from '@/types/app';
import MESSAGE from '@/shared/utils/message.util';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodTypeAny } from 'zod/v4';

const validationBodyMiddleware = (schema: ZodTypeAny): RequestHandler => {
  return async (req, res, next) => {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      const groupedErrors = result.error.issues.reduce(
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

      return res.status(response.code).json(response);
    }

    // ⭐ IMPORTANT: replace body with parsed + transformed value
    req.body = result.data as any;

    next();
  };
};
const validateQueryMiddleware = <T extends ZodTypeAny>(
  schema: T,
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req.query);

    if (!result.success) {
      const groupedErrors = result.error.issues.reduce(
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

      return res.status(response.code).json(response);
    }
    if (!req.locals) {
      req.locals = {};
    }
    // ⭐ IMPORTANT: assign parsed + preprocessed result
    req.locals.query = result.data as any;

    next();
  };
};

const validateParamsMiddleware = (schema: ZodTypeAny): RequestHandler => {
  return async (req, res, next) => {
    const result = await schema.safeParseAsync(req.params);

    if (!result.success) {
      const groupedErrors = result.error.issues.reduce(
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

      return res.status(response.code).json(response);
    }

    // ⭐ IMPORTANT: replace body with parsed + transformed value
    req.params = result.data as any;

    next();
  };
};

export default validationBodyMiddleware;
export { validateQueryMiddleware, validateParamsMiddleware };
