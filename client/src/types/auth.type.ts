type RefreshTokenResType = {
  accessToken: string;
  refreshToken: string;
  exp: number;
};

type LoginResType = RefreshTokenResType & {
  id: number;
  email: string;
  image?: string | undefined;
};

type RegisterReqType = {
  email: string;
  otp: string;
  name: string;
  password: string;
};

type LoginReqType = {
  email: string;
  password: string;
};

type OTPReqType = {
  email: string;
};

type VerifyOTPReqType = {
  email: string;
  otp: string;
};

type ResetPasswordReqType = {
  email: string;
  otp: string;
  password: string;
};

type OTPResType = {
  email: string;
  type: TypeOTP;
  expiredAt: Date;
};

enum TypeOTP {
  'REGISTER',
  'FORGOT_PASSWORD',
}

type Role = 'ADMIN' | 'SELLER' | 'USER';

export type {
  RefreshTokenResType,
  RegisterReqType,
  LoginResType,
  LoginReqType,
  OTPReqType,
  OTPResType,
  VerifyOTPReqType,
  ResetPasswordReqType,
  Role,
};
