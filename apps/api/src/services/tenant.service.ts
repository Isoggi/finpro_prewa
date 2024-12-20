import { ErrorHandler } from '@/helpers/response.helper';
import { Request } from 'express';
import prisma from '@/prisma';
import { Order } from '@/interfaces/transaction.interface';
import { transaction_items_status, transactions_status } from '@prisma/client';

export class TenantService {
  static async getTransactions(req: Request) {
    const { user } = req;
    console.log('access tenant transaction:', user?.name);
    const {
      page = 1,
      size = 8,
      orderNumber,
      startDate,
      endDate,
      type = transactions_status.waitingpayment,
    } = req.query;
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
          status:
            type === 'undefined' ? undefined : (type as transactions_status),
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
                      image: true,
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
                  property: { is: { tenant_id: user?.id } },
                  // property: { is: { tenant_id: 2 } },
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
        invoice_number: order.invoice_number ?? '',
        category: order.transactionItems[0].room.property.category.name,
        name: order.transactionItems[0].room.property.name,
        description: order.transactionItems[0].room.name,
        startDate: order.transactionItems[0].start_date.toDateString(),
        endDate: order.transactionItems[0].end_date.toDateString(),
        status: order.status,
        payment_method: order.payment_method,
        image: order.transactionItems[0].room.property.image,
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

  static async verifyOrder(req: Request) {
    const { user } = req;
    if (!user) throw new ErrorHandler('Unauthorized', 401);
    const { invoice_number, status } = req.body;
    if (!invoice_number) throw new ErrorHandler('Invalid request', 400);
    const trxData = await prisma.transactions.findFirst({
      where: { invoice_number: invoice_number },
      select: { id: true },
    });
    if (!trxData) throw new ErrorHandler('Transaction not found', 404);
    await prisma.$transaction(async (trx) => {
      const transaction = await trx.transactions.update({
        where: {
          id: trxData?.id,
          transactionItems: {
            some: { room: { property: { tenant_id: user?.id } } },
          },
        },
        data: Number(status)
          ? {
              status: transactions_status.completed,
            }
          : {
              status: transactions_status.waitingpayment,
            },
      });
      return transaction;
    });
    return true;
  }

  static async getTransactionById(req: Request) {
    const user = req.user;
    const { invoice_number } = req.params;

    const result = await prisma.transactions.findFirst({
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
                    image: true,
                    tenant: { select: { id: true, name: true } },
                    address: {
                      select: {
                        id: true,
                        detail: true,
                        provinces: { select: { name: true } },
                        district: { select: { name: true } },
                        lat: true,
                        lng: true,
                      },
                    },
                  },
                },
              },
            }, // You can select specific room fields here
          },
        },
        user: true,
      },
      where: {
        invoice_number: invoice_number,
        transactionItems: {
          some: { room: { property: { tenant_id: user?.id } } },
        },
      },
    });
    if (!result) throw new ErrorHandler('Unauthorized tenant access', 401);

    return result;
  }
}
