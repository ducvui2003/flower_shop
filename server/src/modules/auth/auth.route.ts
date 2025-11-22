import {
  CreateUserReqSchema,
  LoginReqSchema,
  LogoutReqSchema,
  RenewReqSchema,
} from '@/modules/auth/auth.request';
import authMiddleware from '@/shared/middlewares/auth.middleware';
import validationBodyMiddleware from '@/shared/middlewares/validate.middleware';
import authController from '@/modules/auth/auth.controller';
import routers from '@/shared/router';
import { Router } from 'express';

const authRouters = Router();

authRouters.post(
  '/register',
  validationBodyMiddleware(CreateUserReqSchema),
  authController.register,
);

authRouters.post(
  '/login',
  validationBodyMiddleware(LoginReqSchema),
  authController.login,
);
authRouters.post(
  '/renew',
  validationBodyMiddleware(RenewReqSchema),
  authController.renew,
);

authRouters.post(
  '/logout',
  authMiddleware(),
  validationBodyMiddleware(LogoutReqSchema),
  authController.logout,
);
routers.use('/auth', authRouters);
