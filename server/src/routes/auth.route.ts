import AuthController from '@/controllers/auth.controller';
import {
  CreateUserReqSchema,
  LoginReqSchema,
  LogoutReqSchema,
  RenewReqSchema,
} from '@/dto/request/auth.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import validationBodyMiddleware from '@/middlewares/validate.middleware';
import { Router } from 'express';
import { container } from 'tsyringe';

const authRouters = Router();

const authController = container.resolve(AuthController);

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

authRouters.post('/test', authMiddleware(), authController.login);

export default authRouters;
