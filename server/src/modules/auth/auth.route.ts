import {
  CreateUserReqSchema,
  LoginReqSchema,
  LogoutReqSchema,
  RenewReqSchema,
} from '@/modules/auth/auth.request';
import authMiddleware from '@/shared/middlewares/auth.middleware';
import validationBodyMiddleware from '@/shared/middlewares/validate.middleware';
import authController from '@/modules/auth/auth.controller';
import { Router } from 'express';

const authRouters = Router();

authRouters
  .post(
    '/auth/register',
    validationBodyMiddleware(CreateUserReqSchema),
    authController.register,
  )
  .post(
    '/auth/login',
    validationBodyMiddleware(LoginReqSchema),
    authController.login,
  )
  .post(
    '/auth/renew',
    validationBodyMiddleware(RenewReqSchema),
    authController.renew,
  )
  .post(
    '/auth/logout',
    authMiddleware(),
    validationBodyMiddleware(LogoutReqSchema),
    authController.logout,
  );

export default authRouters;
