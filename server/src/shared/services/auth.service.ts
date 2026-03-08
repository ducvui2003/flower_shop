import redisService from '@/shared/services/redis.service';
import {
  AccessTokenPayload,
  accessTokenService,
} from '@/shared/services/token.service';

interface AuthService {
  verifyATokenValid(token: string): Promise<AccessTokenPayload | null>;
}

const authService: AuthService = {
  async verifyATokenValid(token: string): Promise<AccessTokenPayload | null> {
    const payload = await accessTokenService.verify(token);
    if (!payload) return null;
    const accessToken = await redisService.get(`accessToken:${payload.id}`);
    if (accessToken !== token) return null;
    return payload;
  },
};

export default authService;
