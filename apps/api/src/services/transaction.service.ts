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

      const exist = await prisma.transactions.findFirst({
        where: { invoice_number: data.invoice_number, user_id: id },
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
        user_id: user?.id,
      },
    });
    if (!result)
      throw new ErrorHandler('Unaothorized access by other user', 401);

    return result;
  }

  static async createTransaction(req: Request) {
    const user = req.user;
    const { room_id, start_date, end_date } = req.body;

    const availability = await prisma.availability.findMany({
      where: {
        room_id: room_id,
        date: { gte: start_date, lte: end_date },
        stock: { gt: 0 },
      },
    });

    const room = await prisma.rooms.findUnique({
      where: { id: Number(room_id) },
      include: { available: true, peakSeasonRate: true },
    });
    if (!room) {
      throw new ErrorHandler('Room not found', 404);
    }

    const data = await prisma.$transaction(async (trx) => {
      const newTrx = await trx.transactions.create({
        data: {
          invoice_number: `ORDER-${new Date().getTime()}`,
          amount: 0,
          payment_method: 'manual',
          status: transactions_status.waitingpayment,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: Number(user?.id),
          payment_expire: new Date(
            new Date().setTime(new Date().getTime() + 60 * 60 * 1000),
          ),
        },
      });
      const items = await trx.transactionItems.create({
        data: {
          transaction_id: newTrx.id,
          room_id: Number(room_id),
          start_date: new Date(start_date),
          end_date: new Date(end_date),
          status: transaction_items_status.waitingpayment,
          total_price: room.peakSeasonRate.length
            ? room.peakSeasonRate[0].rates + room.price.toNumber()
            : room.price.toNumber(),
        },
      });

      await trx.transactions.update({
        where: { id: newTrx.id },
        data: {
          amount: items.total_price,
        },
      });
      const diffInMs = end_date.getTime() - start_date.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      const arrayDay: Date[] = [];
      for (let i = 0; i <= diffInDays; i++) {
        const checkDay = new Date(start_date);
        arrayDay.push(new Date(checkDay.setDate(start_date.getDate() + i)));
      }
      arrayDay.map(async (availabilityDate) => {
        if (
          availability.some(
            (x) => x.date.getDate() === availabilityDate.getDate(),
          )
        ) {
          const roomAvail = availability.find(
            (x) => x.date.getDate() === availabilityDate.getDate(),
          );
          await trx.availability.update({
            where: { id: roomAvail?.id },
            data: {
              stock: roomAvail?.stock ?? room.capacity - 1,
              updated_at: new Date(),
            },
          });
        } else {
          await trx.availability.create({
            data: {
              room_id: Number(room_id),
              date: availabilityDate,
              stock: room.capacity,
              created_at: new Date(),
              updated_at: new Date(),
            },
          });
        }
      });
      return newTrx.invoice_number;
    });
    return data;
  }

  static async updateTransaction(req: Request) {
    const user = req.user;
    const [invoice_number, payment_method] = req.body;
    const trx_id = await prisma.transactions.findFirst({
      where: { invoice_number: invoice_number, user_id: user?.id },
      select: { id: true },
    });
    const result = await prisma.$transaction(async (trx) => {
      return await trx.transactions.update({
        where: { id: trx_id?.id },
        data: {
          payment_method: payment_method,
          status: transactions_status.waitingpayment,
        },
      });
    });
    return result;
  }

  static async cancelTransaction(req: Request) {
    const user = req.user;
    const { invoice_number } = req.body;
    const trx_id = await prisma.transactions.findFirst({
      where: { invoice_number: invoice_number, user_id: user?.id },
      select: {
        id: true,
        transactionItems: {
          select: {
            room: { select: { id: true, available: true } },
            start_date: true,
            end_date: true,
          },
        },
      },
    });
    if (!trx_id)
      throw new ErrorHandler('Unauthorized access by other user', 401);
    const result = await prisma.$transaction(async (trx) => {
      await trx.transactions.update({
        where: { id: trx_id?.id },
        data: {
          status: transactions_status.cancelled,
          updated_at: new Date(),
          payment_expire: null,
        },
      });
      await trx.availability.updateMany({
        where: {
          room_id: trx_id?.transactionItems[0].room.id,
          date: {
            gte: trx_id?.transactionItems[0].start_date,
            lte: trx_id?.transactionItems[0].end_date,
          },
        },
        data: { stock: { increment: 1 }, updated_at: new Date() },
      });
      return true;
    });
    return result;
  }
}
