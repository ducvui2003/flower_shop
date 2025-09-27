import envConfig from '@/config/env.config';
import * as jose from 'jose';
import { injectable } from 'tsyringe';

type ExtendTokenPayload<T> = T & {
  exp: number;
};

type AccessTokenPayload = {
  id: number;
  email: string;
  name: string;
};
type RefreshTokenPayload = {
  id: number;
  email: string;
  name: string;
};
type TokenResult = {
  token: string;
  iat: number;
  exp: number;
  expiresAt: Date;
};

interface TokenService<P> {
  create(payload: P): Promise<TokenResult>;

  verify(token: string): Promise<ExtendTokenPayload<P> | null>;
}

class AccessTokenServiceImpl implements TokenService<AccessTokenPayload> {
  async create(payload: AccessTokenPayload): Promise<TokenResult> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + envConfig.AT_EXPIRIES;
    const secret = new TextEncoder().encode(envConfig.AT_SECRET);
    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(exp)
      .sign(secret);

    // Convert exp (seconds) to Date
    const expiresAt = new Date(exp * 1000);

    return {
      token: jwt,
      iat,
      exp,
      expiresAt,
    };
  }

  async verify(
    token: string,
  ): Promise<ExtendTokenPayload<AccessTokenPayload> | null> {
    try {
      const secret = new TextEncoder().encode(envConfig.AT_SECRET);
      const { payload } = await jose.jwtVerify<
        jose.JWTPayload & AccessTokenPayload
      >(token, secret);

      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        exp: payload?.exp ?? 0,
      };
    } catch (_) {
      return null;
    }
  }
}

class RefreshTokenServiceImpl implements TokenService<RefreshTokenPayload> {
  async create(payload: RefreshTokenPayload): Promise<TokenResult> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + envConfig.RT_EXPIRIES;
    const secret = new TextEncoder().encode(envConfig.RT_SECRET);
    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(exp)
      .sign(secret);

    // Convert exp (seconds) to Date
    const expiresAt = new Date(exp * 1000);

    return {
      token: jwt,
      iat,
      exp,
      expiresAt,
    };
  }

  async verify(
    token: string,
  ): Promise<ExtendTokenPayload<RefreshTokenPayload> | null> {
    try {
      const secret = new TextEncoder().encode(envConfig.RT_SECRET);
      const { payload } = await jose.jwtVerify<
        jose.JWTPayload & AccessTokenPayload
      >(token, secret);

      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        exp: payload?.exp ?? 0,
      };
    } catch (_) {
      return null;
    }
  }
}

const accessTokenService = new AccessTokenServiceImpl();
const refreshTokenService = new RefreshTokenServiceImpl();

export { accessTokenService, refreshTokenService };
export type { AccessTokenPayload, RefreshTokenPayload, TokenResult };
