import envConfig from '@/shared/config/env.config';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function signToken(payload: object) {
  return jwt.sign(payload, envConfig.AT_SECRET, {
    expiresIn: envConfig.AT_EXPIRIES,
  });
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, envConfig.RT_SECRET, {
    expiresIn: envConfig.RT_EXPIRIES,
  });
}

export function verifyToken<T extends object = JwtPayload>(token: string): T {
  return jwt.verify(token, envConfig.AT_SECRET) as T;
}
