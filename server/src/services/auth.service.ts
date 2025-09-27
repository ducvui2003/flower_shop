import { CreateUserReqType, LoginUserReqType } from '@/dto/request/auth.dto';
import {
  CreateUserResponseType,
  LoginResponseType,
  RenewResponseType,
} from '@/dto/response/auth.dto';
import userRepository from '@/repository/user.repository';
import hashingService from '@/services/hash.service';
import redisService from '@/services/redis.service';
import {
  AccessTokenPayload,
  accessTokenService,
  refreshTokenService,
} from '@/services/token.service';
import { AppResponse } from '@/types/app-response';
import { errors, isUniqueCode } from '@/utils/error.util';
import logger from '@/utils/logger.util';
import MESSAGE from '@/utils/message.util';
import { StatusCodes } from 'http-status-codes';

interface AuthService {
  register(
    req: CreateUserReqType,
  ): Promise<AppResponse<CreateUserResponseType>>;

  login(req: LoginUserReqType): Promise<AppResponse<LoginResponseType>>;

  renew(refreshToken: string): Promise<AppResponse<RenewResponseType>>;

  logout(accessToken: string, refreshToken: string): Promise<AppResponse<void>>;

  verifyATokenValid(token: string): Promise<AccessTokenPayload | null>;
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
        message: MESSAGE.HTTP.REGISTER,
        data: {
          id: model.id,
          name: model.name,
        },
      };
    } catch (err) {
      if (isUniqueCode(err)) throw errors.EMAIL_REGISTER;
      throw errors.NO_DEFINE;
    }
  },
  async login(req: LoginUserReqType): Promise<AppResponse<LoginResponseType>> {
    const model = await userRepository.findByEmailWithLogin(req.email);
    if (!(await hashingService.verify(model.password, req.password))) {
      throw errors.UNAUTHORIZED;
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
      message: MESSAGE.HTTP.LOGIN,
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
      throw errors.TOKEN;
    }
    const accessToken = await accessTokenService.create({
      id: payload.id,
      email: payload.email,
      name: payload.name,
    });
    await saveAToken(payload.id, accessToken.token, accessToken.exp);
    return {
      code: StatusCodes.OK,
      message: MESSAGE.HTTP.RENEW,
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
    if (!accessTokenPayload) throw errors.TOKEN;
    const refreshTokenPayload = await refreshTokenService.verify(refreshToken);
    if (!refreshTokenPayload) throw errors.TOKEN;
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
      message: MESSAGE.HTTP.LOGOUT,
    };
  },
  async verifyATokenValid(token: string): Promise<AccessTokenPayload | null> {
    const payload = await accessTokenService.verify(token);
    if (!payload) return null;
    if (!(await redisService.get<string>(`accessToken:${payload.id}`)))
      return null;
    return payload;
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
