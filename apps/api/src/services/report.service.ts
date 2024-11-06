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
    await prisma.transactions.findMany({
      where: {
        transactionItems: {
          some: {
            start_date: start_date
              ? { gte: new Date(start_date.toString()) }
              : undefined,
            end_date: end_date
              ? { lte: new Date(end_date.toString()) }
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
    });

    const [sales, total] = await prisma.$transaction([
      prisma.transactions.findMany({
        where: {
          transactionItems: {
            some: {
              start_date: start_date
                ? { gte: new Date(start_date.toString()) }
                : undefined,
              end_date: end_date
                ? { lte: new Date(end_date.toString()) }
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
        orderBy: {},
      }),
      prisma.transactions.count({
        where: {
          transactionItems: {
            some: {
              start_date: start_date
                ? { gte: new Date(start_date.toString()) }
                : undefined,
              end_date: end_date
                ? { lte: new Date(end_date.toString()) }
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
    return;
  }
  static async getProperty(req: Request) {
    return;
  }
}
