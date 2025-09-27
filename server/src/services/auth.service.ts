import APP_CONFIG from '@/config/app.config';
import { CreateUserReqType, LoginUserReqType } from '@/dto/request/auth.dto';
import {
  CreateUserResponseType,
  LoginResponseType,
  RenewResponseType,
} from '@/dto/response/auth.dto';
import { UserRepository } from '@/repository/user.repository';
import { HashService } from '@/services/hash.service';
import RedisService from '@/services/redis.service';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
  TokenService,
} from '@/services/token.service';
import { AppResponse } from '@/types/app-response';
import { errors, isUniqueCode } from '@/utils/error.util';
import logger from '@/utils/logger.util';
import MESSAGE from '@/utils/message.util';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';

interface AuthService {
  register(
    req: CreateUserReqType,
  ): Promise<AppResponse<CreateUserResponseType>>;

  login(req: LoginUserReqType): Promise<AppResponse<LoginResponseType>>;

  renew(refreshToken: string): Promise<AppResponse<RenewResponseType>>;

  logout(accessToken: string, refreshToken: string): Promise<AppResponse<void>>;

  verifyATokenValid(token: string): Promise<AccessTokenPayload | null>;
}

@injectable()
class AuthServiceImpl implements AuthService {
  constructor(
    @inject(APP_CONFIG.INJECT.REPOSITORY.USER)
    private readonly userRepo: UserRepository,
    @inject(APP_CONFIG.INJECT.SERVICE.HASH)
    private readonly hashService: HashService,
    @inject(APP_CONFIG.INJECT.SERVICE.ACCESS_TOKEN)
    private accessTokenService: TokenService<AccessTokenPayload>,
    @inject(APP_CONFIG.INJECT.SERVICE.REFRESH_TOKEN)
    private refreshTokenService: TokenService<RefreshTokenPayload>,
    private redis: RedisService,
  ) {}
  async register(
    req: CreateUserReqType,
  ): Promise<AppResponse<CreateUserResponseType>> {
    const password = await this.hashService.hash(req.password);
    try {
      const model = await this.userRepo.create({
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
  }
  async login(req: LoginUserReqType): Promise<AppResponse<LoginResponseType>> {
    const model = await this.userRepo.findByEmailWithLogin(req.email);
    if (!(await this.hashService.verify(model.password, req.password))) {
      throw errors.UNAUTHORIZED;
    }
    const accessToken = await this.accessTokenService.create({
      id: model.id,
      email: model.email,
      name: model.name,
    });
    const refreshToken = await this.refreshTokenService.create({
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
  }

  async renew(refreshToken: string): Promise<AppResponse<RenewResponseType>> {
    const payload = await this.verifyRTokenValid(refreshToken);
    if (!payload) {
      throw errors.TOKEN;
    }
    const accessToken = await this.accessTokenService.create({
      id: payload.id,
      email: payload.email,
      name: payload.name,
    });
    await this.saveAToken(payload.id, accessToken.token, accessToken.exp);
    return {
      code: StatusCodes.OK,
      message: MESSAGE.HTTP.RENEW,
      data: {
        access: accessToken,
      },
    };
  }

  async logout(
    accessToken: string,
    refreshToken: string,
  ): Promise<AppResponse<void>> {
    const accessTokenPayload =
      await this.accessTokenService.verify(accessToken);
    if (!accessTokenPayload) throw errors.TOKEN;
    const refreshTokenPayload =
      await this.refreshTokenService.verify(refreshToken);
    if (!refreshTokenPayload) throw errors.TOKEN;
    await this.saveRToken(
      accessTokenPayload.id,
      accessToken,
      accessTokenPayload.exp,
    );
    await this.saveRToken(
      refreshTokenPayload.id,
      refreshToken,
      refreshTokenPayload.exp,
    );

    return {
      code: StatusCodes.OK,
      message: MESSAGE.HTTP.LOGOUT,
    };
  }

  private async saveAToken(id: number, token: string, exp: number) {
    const ttl = Math.floor(Math.max(0, exp - Date.now() / 1000));
    const event = await this.redis.set(`accessToken:${id}`, token, ttl);
    logger.info(event);
  }

  private async saveRToken(id: number, token: string, exp: number) {
    const ttl = Math.floor(Math.max(0, exp - Date.now() / 1000));
    const event = await this.redis.set(`refreshToken:${id}`, token, ttl);
    logger.info(event);
  }

  public async verifyATokenValid(
    token: string,
  ): Promise<AccessTokenPayload | null> {
    const payload = await this.accessTokenService.verify(token);
    if (!payload) return null;
    if (!(await this.redis.get<string>(`accessToken:${payload.id}`)))
      return null;
    return payload;
  }

  public async verifyRTokenValid(token: string) {
    const payload = await this.refreshTokenService.verify(token);
    if (!payload) return null;
    if (!(await this.redis.get<string>(`refreshToken:${payload.id}`)))
      return null;
    return payload;
  }
}

export { AuthService, AuthServiceImpl };
