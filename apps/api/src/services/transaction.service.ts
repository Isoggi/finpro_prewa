import { ErrorHandler } from '@/helpers/response.helper';
import { Order } from '@/interfaces/transaction.interface';
import prisma from '@/prisma';
import {
  transaction_items_status,
  transactions_payment_method,
  transactions_status,
} from '@prisma/client';
import { Request } from 'express';
import fs from 'fs';

export class TransactionService {
  static async get(req: Request) {
    const { user } = req;
    const { page = 1, size = 8, orderNumber, startDate, endDate } = req.query;

    if (!user) throw new ErrorHandler('Unauthorized', 401);
    const [data, totalCount] = await Promise.all([
      prisma.transactions.findMany({
        where: {
          user_id: user?.id,
          // user_id: 1,
          OR: [
            {
              invoice_number: {
                contains: orderNumber ? orderNumber?.toString() : undefined,
              },
            },
            {
              transactionItems: {
                some: {
                  start_date: startDate
                    ? new Date(startDate.toString())
                    : undefined,
                  end_date: endDate ? new Date(endDate.toString()) : undefined,
                },
              },
            },
          ],
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
          user_id: user?.id,
          // user_id: 1,
          OR: [
            {
              invoice_number: {
                contains: orderNumber ? orderNumber?.toString() : undefined,
              },
            },
            {
              transactionItems: {
                some: {
                  start_date: startDate
                    ? new Date(startDate.toString())
                    : undefined,
                  end_date: endDate ? new Date(endDate.toString()) : undefined,
                },
              },
            },
          ],
        },
      }),
    ]);
    const result = data.map((order) => {
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
    return {
      data: result,
      page,
      size,
      totalCount,
      totalPages: Math.ceil(totalCount / Number(size)),
    };
  }

  static async uploadProof(req: Request) {
    const data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    if (req.user) {
      const { id } = req.user;

      const exist = await prisma.transactions.findUnique({
        where: { id: Number(data.id), user_id: id },
      });
      if (!exist) {
        throw new ErrorHandler('Transaction not found', 404);
      }
      await prisma.$transaction(async (trx) => {
        await trx.transactions.update({
          where: { id: Number(data.id), user_id: id },
          data: {
            payment_proof: data.image,
            status: transactions_status.waitingapproval,
          },
        });
      });
      if (
        exist.payment_proof &&
        data.image &&
        exist.payment_proof !== data.image
      )
        fs.unlink(
          __dirname + '/../public/images/trx/' + exist.payment_proof,
          (err: unknown) => {
            if (err) console.log(err);
          },
        );

      return 'Upload success';
    } else {
      throw new ErrorHandler('Unauthorized', 401);
    }
  }

  static async getById(req: Request) {
    const user = req.user;
    const { id } = req.params;
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
        invoice_number: id,
        user_id: user?.id,
      },
    });
    if (!result)
      throw new ErrorHandler('Unaothorized access by other user', 401);

    return result;
  }
}
