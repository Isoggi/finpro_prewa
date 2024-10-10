// export const authUser = () => {

// }
import { AuthService } from '../services/auth.service';
import { Request, Response, NextFunction } from 'express';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.login(req);

      return res
        .status(200)
        .json({ message: 'Login Success', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.register(req);
      return res
        .status(201)
        .json({ message: 'Register Success', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async confirmPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.confirmPassword(req);
      return res
        .status(200)
        .json({ message: 'Success confirm password', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async verifyPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.sendVerifyEmail(req);
      return res
        .status(200)
        .json({ message: 'Success send verify email', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async forgetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.forgetPassword(req);
      return res
        .status(200)
        .json({ message: 'Success confirm password', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async confirmForgetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.confirmPassword(req);
      return res.status(200).json({
        message: 'Success reset confirm password',
        data,
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.getProfile(req);
      return res
        .status(200)
        .json({ message: 'Get Profile Success', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.updateProfile(req);
      return res
        .status(200)
        .json({ message: 'Update Profile Success', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
