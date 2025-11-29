import AUTH_CONST from '@/modules/auth/auth.const';
import {
  CreateUserReqType,
  LoginUserReqType,
} from '@/modules/auth/auth.request';
import {
  CreateUserResponseType,
  LoginResponseType,
  RenewResponseType,
} from '@/modules/auth/auth.response';
import userRepository from '@/shared/repositories/user.repository';
import hashingService from '@/shared/services/hash.service';
import redisService from '@/shared/services/redis.service';
import {
  accessTokenService,
  refreshTokenService,
} from '@/shared/services/token.service';
import { isUniqueCode } from '@/shared/utils/error.util';
import logger from '@/shared/utils/logger.util';
import { AppResponse } from '@/types/app';
import { StatusCodes } from 'http-status-codes';

interface AuthService {
  register(
    req: CreateUserReqType,
  ): Promise<AppResponse<CreateUserResponseType>>;

  login(req: LoginUserReqType): Promise<AppResponse<LoginResponseType>>;

  renew(refreshToken: string): Promise<AppResponse<RenewResponseType>>;

  logout(accessToken: string, refreshToken: string): Promise<AppResponse<void>>;
}

const authService: AuthService = {
  async register(
    req: CreateUserReqType,
  ): Promise<AppResponse<CreateUserResponseType>> {
    const password = await hashingService.hash(req.password);
    try {
      const model = await userRepository.create({
        name: req.name,
        email: req.email,
        password: password,
      });
      return {
        code: StatusCodes.OK,
        message: AUTH_CONST.HTTP.REGISTER,
        data: {
          id: model.id,
          name: model.name,
        },
      };
    } catch (err) {
      if (isUniqueCode(err)) throw AUTH_CONST.ERROR.EMAIL_REGISTER;
      throw AUTH_CONST.ERROR.NO_DEFINE;
    }
  },
  async login(req: LoginUserReqType): Promise<AppResponse<LoginResponseType>> {
    const model = await userRepository.findByEmailWithLogin(req.email);
    if (!(await hashingService.verify(model.password, req.password))) {
      throw AUTH_CONST.ERROR.UNAUTHORIZED;
    }
    const accessToken = await accessTokenService.create({
      id: model.id,
      email: model.email,
      name: model.name,
    });
    const refreshToken = await refreshTokenService.create({
      id: model.id,
      email: model.email,
      name: model.name,
    });
    return {
      code: StatusCodes.OK,
      message: AUTH_CONST.HTTP.LOGIN,
      data: {
        access: {
          token: accessToken.token,
          exp: accessToken.exp,
          expiresAt: accessToken.expiresAt,
          iat: accessToken.iat,
        },
        refresh: {
          token: refreshToken.token,
          exp: refreshToken.exp,
          expiresAt: refreshToken.expiresAt,
          iat: refreshToken.iat,
        },
      },
    };
  },
  async renew(refreshToken: string): Promise<AppResponse<RenewResponseType>> {
    const payload = await verifyRTokenValid(refreshToken);
    if (!payload) {
      throw AUTH_CONST.ERROR.TOKEN;
    }
    const accessToken = await accessTokenService.create({
      id: payload.id,
      email: payload.email,
      name: payload.name,
    });
    await saveAToken(payload.id, accessToken.token, accessToken.exp);
    return {
      code: StatusCodes.OK,
      message: AUTH_CONST.HTTP.RENEW,
      data: {
        access: accessToken,
      },
    };
  },
  async logout(
    accessToken: string,
    refreshToken: string,
  ): Promise<AppResponse<void>> {
    const accessTokenPayload = await accessTokenService.verify(accessToken);
    if (!accessTokenPayload) throw AUTH_CONST.ERROR.TOKEN;
    const refreshTokenPayload = await refreshTokenService.verify(refreshToken);
    if (!refreshTokenPayload) throw AUTH_CONST.ERROR.TOKEN;
    await saveRToken(
      accessTokenPayload.id,
      accessToken,
      accessTokenPayload.exp,
    );
    await saveRToken(
      refreshTokenPayload.id,
      refreshToken,
      refreshTokenPayload.exp,
    );

    return {
      code: StatusCodes.OK,
      message: AUTH_CONST.HTTP.LOGOUT,
    };
  },
};

const saveRToken = async (id: number, token: string, exp: number) => {
  const ttl = Math.floor(Math.max(0, exp - Date.now() / 1000));
  const event = await redisService.set(`refreshToken:${id}`, token, ttl);
  logger.info(event);
};

const saveAToken = async (id: number, token: string, exp: number) => {
  const ttl = Math.floor(Math.max(0, exp - Date.now() / 1000));
  const event = await redisService.set(`accessToken:${id}`, token, ttl);
  logger.info(event);
};

const verifyRTokenValid = async (token: string) => {
  const payload = await refreshTokenService.verify(token);
  if (!payload) return null;
  if (!(await redisService.get<string>(`refreshToken:${payload.id}`)))
    return null;
  return payload;
};
export default authService;
