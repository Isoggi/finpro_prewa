import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
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
    this.router.get(
      '/review',
      // validateReview(),
      this.reviewController.get,
    );

    this.router.post(
      '/review',
      // validateReview('post'),
      this.reviewController.post,
    );
  }
  public getRouter(): Router {
    return this.router;
  }
}
