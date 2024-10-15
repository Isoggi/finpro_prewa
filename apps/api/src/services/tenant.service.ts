import { ErrorHandler } from '@/helpers/response.helper';
import { Request } from 'express';
import prisma from '@/prisma';
import { Order } from '@/interfaces/transaction.interface';

export class TenantService {
  static async getTransactions(req: Request) {
    const { user } = req;

    console.log('access tenant transaction:', user?.name);
    const { page = 1, size = 8, orderNumber, startDate, endDate } = req.query;
    if (!user) throw new ErrorHandler('Unauthorized', 401);
    const [result, totalCount] = await Promise.all([
      prisma.transactions.findMany({
        where: {
          transactionItems: {
            some: {
              start_date: startDate
                ? { gte: new Date(startDate.toString()) }
                : undefined,
              end_date: endDate
                ? { lte: new Date(endDate.toString()) }
                : undefined,
              room: {
                is: {
                  property: { is: { tenant_id: user?.id } },
                  // property: { is: { tenant_id: 2 } },
                },
              },
            },
          },
          invoice_number: {
            contains: orderNumber ? orderNumber?.toString() : undefined,
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
                  property: {
                    select: {
                      category: true,
                      name: true,
                    },
                  },
                },
              }, // You can select specific room fields here
            },
          },
        },
        take: Number(size),
        skip: (Number(page) - 1) * Number(size),
        orderBy: { created_at: 'desc' },
      }),
      prisma.transactions.count({
        where: {
          transactionItems: {
            some: {
              start_date: startDate
                ? { gte: new Date(startDate.toString()) }
                : undefined,
              end_date: endDate
                ? { lte: new Date(endDate.toString()) }
                : undefined,
              room: {
                is: {
                  // property: { is: { tenant_id: user?.id } },
                  property: { is: { tenant_id: 2 } },
                },
              },
            },
          },
        },
      }),
    ]);
    // const result = await
    const data = result.map((order) => {
      let _res: Order = {
        id: order.id,
        category: order.transactionItems[0].room.property.category.name,
        name: order.transactionItems[0].room.property.name,
        description: order.transactionItems[0].room.name,
        startDate: order.transactionItems[0].start_date.toDateString(),
        endDate: order.transactionItems[0].end_date.toDateString(),
        status: order.status,
      };
      return _res;
    });
    console.log(data);
    return {
      data: data,
      page,
      size,
      totalCount,
      totalPages: Math.ceil(totalCount / Number(size)),
    };
  }
}
