import { ErrorHandler } from '@/helpers/response.helper';
import prisma from '@/prisma';
import { Request } from 'express';
import { number } from 'zod';

export class ReviewService {
  static async getReview(req: Request) {
    const { id } = req.query;
    const propertyId = await prisma.properties.findUnique({
      where: { slug_address: id as string },
      select: { id: true },
    });
    if (!propertyId) throw new ErrorHandler('Not found', 404);

    const data = await prisma.reviews.findMany({
      where: { property_id: propertyId.id, prev_review_id: null },
    });
    return data;
  }

  static async getReviewChildren(req: Request) {
    const { id } = req.query;

    const data = await prisma.reviews.findMany({
      where: { prev_review_id: Number(id) },
      include: {
        user: true,
      },
    });
    return data;
  }

  static async postReview(req: Request) {
    const { id, text, prev_review_id } = req.body;
    return true;
  }
}
