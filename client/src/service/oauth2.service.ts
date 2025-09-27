import httpServer from '@/lib/http.server';
import userServerService from '@/service/user.server.service';
import { ResponseApi } from '@/types/api.type';
import { LoginResType, Role } from '@/types/auth.type';
import { User } from '@/types/user.type';

const oauth2Api = {
  login: async (
    accessToken: string,
    provider: 'google' | 'facebook',
  ): Promise<User> => {
    const res = await httpServer.post<ResponseApi<LoginResType>>(
      '/api/oauth2',
      {
        accessToken,
        provider,
      },
    );
    const body = res.payload.data;

    const userInfo = await userServerService.getInfo(body.accessToken);
    return {
      ...userInfo,
      role: userInfo.role as Role,
      avatar: userInfo.avatar,
      accessToken: body.accessToken,
      refreshToken: body.refreshToken,
      expiresAt: body.exp,
    };
  },
};

export default oauth2Api;
