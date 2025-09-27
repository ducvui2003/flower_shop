import envConfig from '@/config/env.config';
import { HTTP_STATUS_CODE } from '@/utils/const.util';
import http, { EntityError } from '@/lib/http.client';
import userService from '@/service/user.service';
import { ResponseApi } from '@/types/api.type';
import {
  LoginReqType,
  LoginResType,
  OTPReqType,
  OTPResType,
  RefreshTokenResType,
  RegisterReqType,
  ResetPasswordReqType,
  Role,
  VerifyOTPReqType,
} from '@/types/auth.type';
import { RegisterFormType } from '@/types/schema/auth.schema';
import { User } from '@/types/user.type';

const authService = {
  login: async (data: LoginReqType): Promise<User> => {
    const res = await http.post<ResponseApi<LoginResType>>(
      '/api/v1/auth/login',
      data,
      undefined,
      false,
    );
    const body = res.payload.data;

    const userInfo = await userService.getInfo(body.accessToken);
    return {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      role: userInfo.role as Role,
      avatar: userInfo.avatar,
      accessToken: body.accessToken,
      refreshToken: body.refreshToken,
      expiresAt: body.exp,
    };
  },

  register: (data: RegisterReqType) => {
    return http.post<ResponseApi<RegisterFormType>>(
      '/api/v1/auth/register',
      data,
    );
  },

  sendOTPVerify: async (data: OTPReqType): Promise<OTPResType> => {
    try {
      const response = await http.post<ResponseApi<OTPResType>>(
        '/api/v1/auth/send-otp',
        {
          email: data.email,
          type: 'REGISTER',
        },
      );
      return response.payload.data;
    } catch (_) {
      throw new EntityError({
        status: HTTP_STATUS_CODE.UNAUTHORIZED,
        payload: {
          error: '',
          message: [
            {
              field: 'email',
              error: 'Email này đã tồn tại',
            },
          ],
        },
      });
    }
  },

  renewToken: async (refreshToken: string): Promise<User | null> => {
    const body = {
      refreshToken: refreshToken,
    };
    const res = await fetch(
      `${envConfig.NEXT_PUBLIC_SERVER_EXTERNAL}/api/v1/auth/refresh-token`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (!res.ok) {
      return null;
    }

    const data: ResponseApi<RefreshTokenResType> = await res.json();

    const userInfo = await userService.getInfo(data.data.accessToken);

    return {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      role: userInfo.role as Role,
      avatar: userInfo.avatar,
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
      expiresAt: data.data.exp,
    };
  },

  logout: async (accessToken: string, refreshToken: string): Promise<void> => {
    try {
      const body = {
        refreshToken: refreshToken,
      };
      await fetch(
        `${envConfig.NEXT_PUBLIC_SERVER_EXTERNAL}/api/v1/auth/logout`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log('✅ Successfully logged out from external API');
    } catch (error) {
      console.error('⚠️ Error calling logout API:', error);
    }
  },

  sendOTPForgetPassword: (email: string): Promise<any> => {
    return http.post<ResponseApi<void>>(
      '/api/v1/auth/send-otp',
      {
        email: email,
        type: 'FORGOT_PASSWORD',
      },
      undefined,
      false,
    );
  },

  verifyOTPForgetPassword: (data: VerifyOTPReqType) => {
    return http.post<ResponseApi<void>>(
      '/api/v1/auth/verify-otp',
      {
        email: data.email,
        type: 'FORGOT_PASSWORD',
        code: data.otp,
      },
      undefined,
      false,
    );
  },

  resetPassword: (data: ResetPasswordReqType) => {
    return http.post<ResponseApi<void>>(
      '/api/v1/auth/forget-password',
      {
        email: data.email,
        otp: data.otp,
        password: data.password,
      },
      undefined,
      false,
    );
  },
};
export default authService;
