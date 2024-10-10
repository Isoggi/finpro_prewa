import { ErrorHandler } from '@/helpers/response.helper';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class TransactionService {
  static async get(req: Request) {
    const { user } = req;
    const { page = 1, size = 8, orderNumber, startDate, endDate } = req.query;
    if (!user) throw new ErrorHandler('Unauthorized', 401);
    const result = await prisma.transactions.findMany({
      where: {
        user_id: user?.id,
        invoice_number: {
          contains: orderNumber ? orderNumber?.toString() : undefined,
        },
        transactionItems: {
          some: {
            start_date: startDate ? new Date(startDate.toString()) : undefined,
            end_date: endDate ? new Date(endDate.toString()) : undefined,
          },
        },
      },
      include: {
        transactionItems: {
          select: {
            id: true,
            total_price: true,
            start_date: true,
            end_date: true,
            status: true,
            room: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            }, // You can select specific room fields here
          },
        },
      },
      take: Number(size),
      skip: (Number(page) - 1) * Number(size),
      orderBy: { created_at: 'desc' },
    });

    return result;
  }
}
