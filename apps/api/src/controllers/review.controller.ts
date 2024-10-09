import { NextFunction, Request, Response } from 'express';
import { ReviewService } from '@/services/review.service';

export class ReviewController {
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ReviewService.postReview(req);

      return res
        .status(200)
        .json({ message: 'Posting Review Success', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async get(req: Request, res: Response) {
    const data = await ReviewService.getReview(req);

    return res
      .status(200)
      .json({ message: 'Posting Review Success', data, success: true });
  }
}
