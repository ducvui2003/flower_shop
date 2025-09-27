import APP_CONFIG from '@/config/app.config';
import {
  PrismaUserRepository,
  UserRepository,
} from '@/repository/user.repository';
import { AuthService, AuthServiceImpl } from '@/services/auth.service';
import PrismaService from '@/services/db.service';
import { Argon2HashingService, HashService } from '@/services/hash.service';
import RedisService from '@/services/redis.service';
import {
  AccessTokenPayload,
  AccessTokenServiceImpl,
  RefreshTokenPayload,
  RefreshTokenServiceImpl,
  TokenService,
} from '@/services/token.service';
import { container } from 'tsyringe';

export default function registerDependencies() {
  container.registerSingleton(PrismaService);

  container.registerSingleton(RedisService);

  container.register<UserRepository>(APP_CONFIG.INJECT.REPOSITORY.USER, {
    useClass: PrismaUserRepository,
  });
  container.register<HashService>(APP_CONFIG.INJECT.SERVICE.HASH, {
    useClass: Argon2HashingService,
  });

  container.register<TokenService<AccessTokenPayload>>(
    APP_CONFIG.INJECT.SERVICE.ACCESS_TOKEN,
    {
      useClass: AccessTokenServiceImpl,
    },
  );

  container.register<TokenService<RefreshTokenPayload>>(
    APP_CONFIG.INJECT.SERVICE.REFRESH_TOKEN,
    {
      useClass: RefreshTokenServiceImpl,
    },
  );

  container.register<AuthService>(APP_CONFIG.INJECT.SERVICE.AUTH, {
    useClass: AuthServiceImpl,
  });
}
