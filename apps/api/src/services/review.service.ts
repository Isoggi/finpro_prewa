import { Request } from 'express';

export class ReviewService {
  static async getReview(req: Request) {
    const { id } = req.query;
    return true;
  }

  static async postReview(req: Request) {
    const { id, text } = req.body;
    return true;
  }
}
