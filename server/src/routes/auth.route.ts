import authController from '@/controllers/auth.controller';
import {
  CreateUserReqSchema,
  LoginReqSchema,
  LogoutReqSchema,
  RenewReqSchema,
} from '@/dto/request/auth.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import validationBodyMiddleware from '@/middlewares/validate.middleware';
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

export default authRouters;
