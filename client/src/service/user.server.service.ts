import envConfig from '@/config/env.config';
import { ResponseApi } from '@/types/api.type';
import { UserInfoResType } from '@/types/user.type';

const userServerService = {
  getInfo: async (accessToken: string): Promise<UserInfoResType> => {
    try {
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_SERVER_CONTAINER}/api/v1/user/info`,
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
};

export default userServerService;
