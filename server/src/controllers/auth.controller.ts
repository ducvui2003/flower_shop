import APP_CONFIG from '@/config/app.config';
import { getToken } from '@/contexts/request.context';
import {
  CreateUserReqType,
  LoginUserReqType,
  LogoutReqType,
  RenewReqType,
} from '@/dto/request/auth.dto';
import { LoginResponseType } from '@/dto/response/auth.dto';
import { AuthService } from '@/services/auth.service';
import { errors } from '@/utils/error.util';
import logger from '@/utils/logger.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
class AuthController {
  constructor(
    @inject(APP_CONFIG.INJECT.SERVICE.AUTH)
    private readonly authService: AuthService,
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateUserReqType = req.body;
      const response = await this.authService.register(data);
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LoginUserReqType = req.body;
      const response = await this.authService.login(data);
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  };
  renew = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: RenewReqType = req.body;
      const response = await this.authService.renew(data.refreshToken);
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LogoutReqType = req.body;
      const accessToken = getToken();
      if (!accessToken) throw errors.TOKEN;
      const response = await this.authService.logout(
        accessToken,
        data.refreshToken,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
