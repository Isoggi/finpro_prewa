import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { uploader } from '@/libs/uploader.lib';
// import { validateAuth } from "../middlewares/authValidator.middleware";
// import { loginSchema, registerSchema } from "../schemas/auth.schema";
// import { uploader } from "../libs/uploader.lib";

export class AuthRouter {
  private router: Router = Router();
  private authController = new AuthController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.post(
      '/login',
      //   validateAuth(loginSchema),
      this.authController.login,
    );
    this.router.post(
      '/register',
      //   validateAuth(registerSchema),
      this.authController.register,
    );

    this.router.put('/verify-password', this.authController.confirmPassword);
    this.router.patch(
      '/confirm-verify-password',
      this.authController.confirmPassword,
    );
    this.router.get(
      '/forget-password',
      AuthMiddleware,
      this.authController.forgetPassword,
    );

    this.router.patch(
      '/confirm-forget-password',
      AuthMiddleware,
      this.authController.forgetPassword,
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
  }
  public getRouter(): Router {
    return this.router;
  }
}
