import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
// import { validateAuth } from "../middlewares/authValidator.middleware";
// import { loginSchema, registerSchema } from "../schemas/auth.schema";
// import { AuthMiddleware } from "../middlewares/auth.middleware";
// import { uploader } from "../libs/uploader.lib";

export class ReviewRouter {
  private router: Router = Router();
  private reviewController = new ReviewController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get('/', this.reviewController.get);
    this.router.post('/', AuthMiddleware, this.reviewController.post);
    this.router.get('/:id', this.reviewController.get);
  }
  public getRouter(): Router {
    return this.router;
  }
}
