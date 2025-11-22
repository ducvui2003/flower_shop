import { getToken } from '@/shared/contexts/request.context';
import {
  CreateUserReqType,
  LoginUserReqType,
  LogoutReqType,
  RenewReqType,
} from '@/modules/auth/auth.request';
import authService from '@/modules/auth/auth.service';
import { NextFunction, Request, Response } from 'express';
import AUTH_CONST from '@/modules/auth/auth.const';

const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateUserReqType = req.body;
      const response = await authService.register(data);
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LoginUserReqType = req.body;
      const response = await authService.login(data);
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
  renew: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: RenewReqType = req.body;
      const response = await authService.renew(data.refreshToken);
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LogoutReqType = req.body;
      const accessToken = getToken();
      if (!accessToken) throw AUTH_CONST.ERROR.TOKEN;
      const response = await authService.logout(accessToken, data.refreshToken);
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
