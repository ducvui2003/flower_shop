import envConfig from '@/config/env.config';
import http from '@/lib/http.client';
import { ResponseApi } from '@/types/api.type';
import {
  InformationFormType,
  PasswordFormType,
  UserInfoResType,
} from '@/types/user.type';

const userService = {
  getInfo: async (accessToken: string): Promise<UserInfoResType> => {
    try {
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_SERVER_EXTERNAL}/api/v1/user/info`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const body: ResponseApi<UserInfoResType> = await res.json();

      return body.data;
    } catch (error) {
      throw error;
    }
  },
  updateInfo: async (req: InformationFormType) => {
    const res = await http.post<ResponseApi<UserInfoResType>>(
      `api/v1/user/info`,
      req,
    );
    return res.payload.data;
  },

  updateAvatar: async (avatarUrl: string) => {
    const res = await http.post<ResponseApi<UserInfoResType>>(
      `api/v1/user/info`,
      {
        avatar: avatarUrl,
      },
    );
    return res.payload.data;
  },

  changePassword: async (req: PasswordFormType) => {
    const res = await http.put<ResponseApi<void>>(`api/v1/auth/password`, req);
    return res.payload.data;
  },
};

export default userService;
