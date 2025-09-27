import { runWithContext } from '@/contexts/request.context';
import authService from '@/services/auth.service';
import { errorsApi } from '@/utils/error.util';
import { isFree } from '@/utils/http.util';
import logger from '@/utils/logger.util';
import { NextFunction, Request, Response } from 'express';

const authMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (isFree(req.path)) {
      next();
      return;
    }

    const bearer = getBearerToken(req);

    if (!bearer) {
      res.status(errorsApi.UNAUTHORIZED.code).json(errorsApi.UNAUTHORIZED);
      return;
    }

    const payload = await authService.verifyATokenValid(bearer);
    if (!payload) {
      logger.warn('token not exist in redis');
      res.status(errorsApi.UNAUTHORIZED.code).json(errorsApi.UNAUTHORIZED);
      return;
    }

    runWithContext(
      {
        user: {
          email: payload.email,
          id: payload.id,
          username: payload.name,
        },
        token: bearer,
      },
      () => {
        next();
      },
    );
  };
};

const getBearerToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) return null;

  return token;
};

export default authMiddleware;
