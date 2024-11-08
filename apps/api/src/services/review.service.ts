import { ErrorHandler } from '@/helpers/response.helper';
import prisma from '@/prisma';
import { Request } from 'express';

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
  static async getReviewOrder(req: Request) {
    const { id } = req.query;
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
    const { text, prev_review_id, transaction_id, property_id } = req.body;
    const user = req.user;
    if (!user) throw new ErrorHandler('Unauthorized', 401);
    const res = await prisma.$transaction(async (trx) => {
      let prop_id = '';
      let data = { prop: 0, trans: 0 };
      if (transaction_id) {
        let transaction = await trx.transactions.findFirst({
          where: { invoice_number: transaction_id },
          select: {
            id: true,
            transactionItems: {
              select: {
                room: { select: { property: { select: { id: true } } } },
              },
            },
          },
        });
        data.trans = transaction?.id ?? 0;
        data.prop = transaction?.transactionItems[0].room.property.id ?? 0;
      }
      const rev = await trx.reviews.create({
        data: {
          user_id: user?.id,
          property_id: data.prop ?? property_id,
          comment: text,
          prev_review_id: prev_review_id,
        },
      });
      const trx_rev = await trx.transactions_Review.create({
        data: {
          transaction_id: data.trans,
          review_id: rev.id,
        },
      });
      return trx_rev;
    });
    return res;
  }
}
