import prisma from '@/prisma';
import { Request } from 'express';
export class PropertiesService {
  static async get(req: Request) {
    const { id } = req.params;

    return true;
  }
  static async search(req: Request) {
    const {
      startDate,
      endDate,
      name,
      location,
      category,
      page = 1,
      size = 8,
      sortBy = 'desc',
    } = req.query;

    type sortByList = 'name' | 'price';

    const rooms = await prisma.properties.findMany({
      where: {
        // Filter by property name if provided
        name: {
          contains: name?.toString(),
        },
        // Filter by location (province, district, or address detail)
        OR: [
          {
            address: {
              provinces: {
                name: {
                  contains: location?.toString(),
                },
              },
            },
          },
          {
            address: {
              district: {
                name: {
                  contains: location?.toString(),
                },
              },
            },
          },
          {
            address: {
              detail: {
                contains: location?.toString(),
              },
            },
          },
        ],
        // Filter by property category if provided
        category: category
          ? {
              id: Number(category),
            }
          : undefined,
        // Filter rooms by availability either null or stock > 1 between startDate and endDate
        rooms: {
          some: {
            OR: [
              {
                // Case 1: Room has no availability records for the given date range (null availability)
                available: {
                  none: {
                    date: {
                      gte: startDate
                        ? new Date(startDate.toString()).toDateString()
                        : undefined,
                      lte: endDate
                        ? new Date(endDate.toString()).toDateString()
                        : undefined,
                    },
                  },
                },
              },
              {
                // Case 2: Room has availability with stock > 1
                available: {
                  some: {
                    stock: {
                      gte: 1,
                    },
                    date: {
                      gte: startDate
                        ? new Date(startDate.toString()).toDateString()
                        : undefined,
                      lte: endDate
                        ? new Date(endDate.toString()).toDateString()
                        : undefined,
                    },
                  },
                },
              },
            ],
          },
        },
      },
      // Sort the query based on the sortBy parameter
      orderBy: sortBy
        ? {
            [sortBy as unknown as sortByList]: 'asc',
          }
        : undefined,
      // Skip and take for pagination
      skip: (Number(page) - 1) * Number(size),
      take: Number(size),
      select: {
        name: true,
        rooms: {
          where: {
            OR: [
              {
                // Include rooms with no availability (null availability)
                available: {
                  none: {
                    date: {
                      gte: startDate
                        ? new Date(startDate.toString()).toDateString()
                        : undefined,
                      lte: endDate
                        ? new Date(endDate.toString()).toDateString()
                        : undefined,
                    },
                  },
                },
              },
              {
                // Include rooms with availability where stock > 1
                available: {
                  some: {
                    stock: {
                      gte: 1,
                    },
                    date: {
                      gte: startDate
                        ? new Date(startDate.toString()).toDateString()
                        : undefined,
                      lte: endDate
                        ? new Date(endDate.toString()).toDateString()
                        : undefined,
                    },
                  },
                },
              },
            ],
          },
          orderBy: {
            price: sortBy as unknown as 'asc' | 'desc',
          },
          select: {
            name: true,
            price: true,
            peakSeasonRate: {
              where: {
                start_date: {
                  lte: endDate
                    ? new Date(endDate.toString()).toDateString()
                    : undefined,
                },
                end_date: {
                  gte: startDate
                    ? new Date(startDate.toString()).toDateString()
                    : undefined,
                },
              },
              select: {
                rates: true,
              },
            },
          },
        },
      },
    });
    return rooms;
  }
}
