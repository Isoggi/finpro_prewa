import prisma from '@/prisma';
import { Request } from 'express';

export class ReportService {
  static async getSales(req: Request) {
    const user = req.user;
    const {
      start_date,
      end_date,
      sort_by = 'created_at',
      order_by = 'desc',
    } = req.query;
    console.log('start report', start_date, end_date, sort_by, order_by);
    const startDate = start_date
      ? new Date(Date.parse(start_date as string))
      : new Date(new Date().setDate(new Date().getDate() - 7));
    const endDate = end_date
      ? new Date(Date.parse(end_date as string))
      : new Date();
    const transactions = await prisma.transactions.findMany({
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
        transactionItems: {
          some: {
            room: {
              is: {
                property: { is: { tenant_id: user?.id } },
                // property: { is: { tenant_id: 2 } },
              },
            },
          },
        },
      },
      include: {
        user: true, // Include User details
        transactionItems: {
          include: {
            room: {
              include: {
                property: true, // Include Property details
              },
            },
          },
        },
      },
      orderBy:
        sort_by === 'amount'
          ? { created_at: (order_by as 'asc' | 'desc') ?? 'asc' }
          : { amount: (order_by as 'asc' | 'desc') ?? 'desc' },
    });
    const report = transactions.map((transaction) => {
      const transactionTotal = transaction.transactionItems.reduce(
        (sum, item) => sum + Number(item.total_price),
        0,
      );

      return {
        transactionId: transaction.id,
        date: transaction.created_at,
        user: {
          id: transaction.user.id,
          name: transaction.user.name,
          email: transaction.user.email,
        },
        properties: transaction.transactionItems.map((item) => ({
          propertyId: item.room.property.id,
          propertyName: item.room.property.name,
          totalSales: Number(item.total_price),
        })),
        transactionTotal,
      };
    });

    return report;
  }
  static async getProperty(req: Request) {
    const user = req.user;
    const { slug, start_date, end_date } = req.query;
    const properties = await prisma.properties.findMany({
      include: {
        rooms: {
          include: {
            available: {
              where: {
                date: {
                  gte: new Date(start_date as string),
                  lte: new Date(end_date as string),
                },
              },
              select: {
                date: true,
                stock: true,
              },
            },
            peakSeasonRate: {
              where: {
                start_date: { lte: new Date(end_date as string) },
                end_date: { gte: new Date(start_date as string) },
              },
              select: {
                start_date: true,
                end_date: true,
                rates: true,
              },
            },
          },
        },
      },
      // where:{slug_address:slug}
    });

    return properties.map((property) => ({
      propertyId: property.id,
      propertyName: property.name,
      rooms: property.rooms.map((room) => ({
        roomId: room.id,
        roomName: room.name,
        capacity: room.capacity,
        availability: room.available.map((availability) => ({
          date: availability.date,
          stock: availability.stock,
        })),
        peakSeasonRates: room.peakSeasonRate.map((rate) => ({
          startDate: rate.start_date,
          endDate: rate.end_date,
          rate: rate.rates,
        })),
      })),
    }));
  }
}
