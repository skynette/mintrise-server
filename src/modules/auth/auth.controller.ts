import { type Response, type NextFunction, type Request } from 'express';
import { HttpStatusCode } from 'axios';
import AuthService from './auth.service';
import Api from '@/lib/api';

export default class AuthController extends Api {
  private readonly userService = new AuthService();

  public loginToronet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.toronetLogin(req.body);
      this.send(res, user, HttpStatusCode.Created, 'loginToronet');
    } catch (e) {
      next(e);
    }
  };

  public mintriseRigeterUserToronet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.mintriseUserRegister(req.body);
      this.send(res, user, HttpStatusCode.Created);
    } catch (e) {
      next(e);
    }
  };

  public mintriseRigeterProjectToronet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.mintriseProjectRegister(req.body);
      this.send(res, user, HttpStatusCode.Created);
    } catch (e) {
      next(e);
    }
  };
}
