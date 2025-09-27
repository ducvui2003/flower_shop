import { getToken } from '@/contexts/request.context';
import {
  CreateUserReqType,
  LoginUserReqType,
  LogoutReqType,
  RenewReqType,
} from '@/dto/request/auth.dto';
import authService from '@/services/auth.service';
import { errors } from '@/utils/error.util';
import { NextFunction, Request, Response } from 'express';

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
      if (!accessToken) throw errors.TOKEN;
      const response = await authService.logout(accessToken, data.refreshToken);
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
