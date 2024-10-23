import { ErrorHandler } from '@/helpers/response.helper';
import prisma from '@/prisma';
import { Request } from 'express';
export class PropertiesService {
  static async get(req: Request) {
    const { slug } = req.params;
    const data = await prisma.properties.findMany({
      where: {
        slug_address: slug,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        rooms: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
          },
        },
        address: {
          select: {
            id: true,
            lng: true,
            lat: true,
            provinces: {
              select: {
                name: true,
              },
            },
            district: {
              select: {
                name: true,
              },
            },
            detail: true,
          },
        },
        tenant: { select: { id: true, name: true } },
      },
    });

    return data;
  }

  static async getByIdService(req: Request) {
    const { id } = req.params;
    if (id) {
      const data = await prisma.properties.findUnique({
        include: {
          rooms: {
            include: {
              available: true,
              peakSeasonRate: {
                select: {
                  id: true,
                  room_id: true,
                  rates: true,
                  start_date: true,
                  end_date: true,
                },
              },
            },
          },
          address: { include: { provinces: true, district: true } },
          reviews: true,
          category: true,
        },
        where: { slug_address: id },
      });
      console.log(data);
      return data;
    }
    return null;
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
    const [data, totalCount] = await Promise.all([
      prisma.properties.findMany({
        where: {
          // Filter by property name if provided
          name: {
            contains: name as string | undefined,
          },
          // Filter by location (province, district, or address detail)

          address: {
            is: {
              OR: [
                {
                  detail: {
                    contains: location?.toString(),
                  },
                },
                {
                  district: {
                    name: {
                      contains: location?.toString(),
                    },
                  },
                },
                {
                  provinces: {
                    name: {
                      contains: location?.toString(),
                    },
                  },
                },
              ],
            },
          },

          // Filter by property category if provided
          category: { name: { contains: category as string | undefined } },
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
        orderBy: { created_at: sortBy as 'desc' | 'asc' },
        // Skip and take for pagination
        skip: (Number(page) - 1) * Number(size),
        take: Number(size),
        select: {
          id: true,
          image: true,
          slug_address: true,
          name: true,
          description: true,
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
          address: {
            select: {
              id: true,
              detail: true,
              district: { select: { id: true, name: true } },
              provinces: { select: { id: true, name: true } },
            },
          },
        },
      }),
      prisma.properties.count({
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
          category: { name: { contains: category as string | undefined } },
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
      }),
    ]);

    return {
      data,
      page,
      size,
      totalCount,
      totalPages: Math.ceil(totalCount / Number(size)),
    };
  }

  static async createProperti(req: Request) {
    const { tenant_id, name, description, category_id, address_id, image } = req.body;
  
    try {
      const newProperty = await prisma.properties.create({
        data: {
          tenant_id,
          name,
          description,
          category_id,
          address_id,
          image,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      return newProperty;
    } catch (error) {
      throw new ErrorHandler(500);
    }
  }
  

  static async updateProperti(req: Request) {
    const { id } = req.params;
    const { tenant_id, name, description, category_id, address_id, image } = req.body;
  
    try {
      const updatedProperty = await prisma.properties.update({
        where: { id: Number(id) },
        data: {
          tenant_id,
          name,
          description,
          category_id,
          address_id,
          image,
          updated_at: new Date(),
        },
      });
      return updatedProperty;
    } catch (error) {
      throw new ErrorHandler(500);
    }
  }
  

  static async deleteProperti(req: Request) {
    const { id } = req.params;
  
    try {
      const deletedProperty = await prisma.properties.delete({
        where: { id: Number(id) },
      });
      return deletedProperty;
    } catch (error) {
      throw new ErrorHandler(500);
    }
  }
}
