import APP_CONFIG from '@/config/app.config';
import { runWithContext } from '@/contexts/request.context';
import { AuthService } from '@/services/auth.service';
import { AccessTokenPayload, TokenService } from '@/services/token.service';
import { errorsApi } from '@/utils/error.util';
import { isFree } from '@/utils/http.util';
import logger from '@/utils/logger.util';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

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
    const authService = container.resolve<AuthService>(
      APP_CONFIG.INJECT.SERVICE.AUTH,
    );
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
