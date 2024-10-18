import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { uploader } from '@/libs/uploader.lib';

export class AuthRouter {
  private router: Router = Router();
  private authController = new AuthController();

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.post('/login', this.authController.login);
    this.router.post('/register', this.authController.register);

    this.router.patch('/verify-password', this.authController.verifyPassword);
    this.router.patch(
      '/confirm-verify-password',
      this.authController.confirmPassword,
    );
    this.router.post('/forget-password', this.authController.forgetPassword);
    this.router.patch(
      '/confirm-forget-password',
      this.authController.confirmForgetPassword,
    );
    this.router.get('/profile', AuthMiddleware, this.authController.profile);
    this.router.patch(
      '/profile',
      AuthMiddleware,
      uploader('AVATAR', 'avatars').single('image'),
      this.authController.updateProfile,
    );
    this.router.put(
      '/profile',
      AuthMiddleware,
      uploader('AVATAR', 'avatars').single('image'),
      this.authController.updateProfile,
    );

    this.router.post(
      '/refresh-token',
      AuthMiddleware,
      this.authController.refreshToken,
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
