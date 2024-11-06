import { ErrorHandler } from '@/helpers/response.helper';
import prisma from '@/prisma';
import { Request } from 'express';
import fs from 'fs';
import path from 'path';

export class PropertiesService {
  static async get(req: Request) {
    const { slug } = req.params;
    const data = await prisma.properties.findMany({
      where: { slug_address: slug },
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
            provinces: { select: { name: true } },
            district: { select: { name: true } },
            detail: true,
          },
        },
        tenant: { select: { id: true, name: true } },
      },
    });
    return data;
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

    const [data, totalCount] = await Promise.all([
      prisma.properties.findMany({
        where: {
          name: { contains: name as string | undefined },
          address: {
            is: {
              OR: [
                { detail: { contains: location?.toString() } },
                { district: { name: { contains: location?.toString() } } },
                { provinces: { name: { contains: location?.toString() } } },
              ],
            },
          },
          category: { name: { contains: category as string | undefined } },
          rooms: {
            some: {
              OR: [
                {
                  available: {
                    none: {
                      date: {
                        gte: startDate
                          ? new Date(startDate.toString())
                          : undefined,
                        lte: endDate ? new Date(endDate.toString()) : undefined,
                      },
                    },
                  },
                },
                {
                  available: {
                    some: {
                      stock: { gte: 1 },
                      date: {
                        gte: startDate
                          ? new Date(startDate.toString())
                          : undefined,
                        lte: endDate ? new Date(endDate.toString()) : undefined,
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        orderBy: { created_at: sortBy as 'desc' | 'asc' },
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
                  available: {
                    none: {
                      date: {
                        gte: startDate
                          ? new Date(startDate.toString())
                          : undefined,
                        lte: endDate ? new Date(endDate.toString()) : undefined,
                      },
                    },
                  },
                },
                {
                  available: {
                    some: {
                      stock: { gte: 1 },
                      date: {
                        gte: startDate
                          ? new Date(startDate.toString())
                          : undefined,
                        lte: endDate ? new Date(endDate.toString()) : undefined,
                      },
                    },
                  },
                },
              ],
            },
            orderBy: { price: sortBy as unknown as 'asc' | 'desc' },
            select: {
              name: true,
              price: true,
              peakSeasonRate: {
                where: {
                  start_date: {
                    lte: endDate ? new Date(endDate.toString()) : undefined,
                  },
                  end_date: {
                    gte: startDate ? new Date(startDate.toString()) : undefined,
                  },
                },
                select: { rates: true },
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
          name: { contains: name?.toString() },
          OR: [
            {
              address: {
                provinces: { name: { contains: location?.toString() } },
              },
            },
            {
              address: {
                district: { name: { contains: location?.toString() } },
              },
            },
            { address: { detail: { contains: location?.toString() } } },
          ],
          category: { name: { contains: category as string | undefined } },
          rooms: {
            some: {
              OR: [
                {
                  available: {
                    none: {
                      date: {
                        gte: startDate
                          ? new Date(startDate.toString())
                          : undefined,
                        lte: endDate ? new Date(endDate.toString()) : undefined,
                      },
                    },
                  },
                },
                {
                  available: {
                    some: {
                      stock: { gte: 1 },
                      date: {
                        gte: startDate
                          ? new Date(startDate.toString())
                          : undefined,
                        lte: endDate ? new Date(endDate.toString()) : undefined,
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

  static async getByIdService(req: Request) {
    const { id } = req.params;
    if (id) {
      const data = await prisma.properties.findUnique({
        where: { slug_address: id, isActive: true },
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
      });
      return data;
    }
    return null;
  }

  static async createProperti(req: Request) {
    const {
      tenant_id,
      name,
      description,
      category_id,
      address_id,
      slug_address,
    } = req.body;

    try {
      if (!tenant_id || !name || !category_id || !address_id) {
        throw new Error('Missing required fields');
      }

      const parsedTenantId = parseInt(tenant_id);
      const parsedCategoryId = parseInt(category_id);
      const parsedAddressId = parseInt(address_id);

      if (
        isNaN(parsedTenantId) ||
        isNaN(parsedCategoryId) ||
        isNaN(parsedAddressId)
      ) {
        throw new Error('Invalid ID format');
      }

      const [tenant, category, address] = await Promise.all([
        prisma.tenants.findUnique({ where: { id: parsedTenantId } }),
        prisma.categories.findUnique({ where: { id: parsedCategoryId } }),
        prisma.address.findUnique({ where: { id: parsedAddressId } }),
      ]);

      if (!tenant || !category || !address) {
        throw new Error('Related record not found');
      }

      let image = null;
      if (req.file) {
        image = `${req.file.filename}`;
      }

      const finalSlugAddress =
        slug_address || name.toLowerCase().replace(/\s+/g, '-');

      const newProperty = await prisma.properties.create({
        data: {
          name,
          description,
          slug_address: finalSlugAddress,
          image,
          tenant: { connect: { id: parsedTenantId } },
          category: { connect: { id: parsedCategoryId } },
          address: { connect: { id: parsedAddressId } },
          created_at: new Date(),
          updated_at: new Date(),
        },
        include: {
          tenant: true,
          category: true,
          address: true,
        },
      });

      return newProperty;
    } catch (error) {
      if (req.file) {
        const filePath = path.join(
          __dirname,
          '/../public/images/',
          req.file.filename,
        );
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }

      console.error('Property creation error:', error);

      if (error instanceof Error) {
        switch (error.message) {
          case 'Missing required fields':
            throw new ErrorHandler(400);
          case 'Invalid ID format':
            throw new ErrorHandler(400);
          case 'Related record not found':
            throw new ErrorHandler(404);
          default:
            throw new ErrorHandler(500);
        }
      }

      throw new ErrorHandler(500);
    }
  }

  static async updateProperti(req: Request) {
    const { id } = req.params;
    const { name, description, category_id, address_id } = req.body;
    try {
      const existingProperty = await prisma.properties.findUnique({
        where: { id: Number(id) },
        select: { image: true },
      });

      let image = existingProperty?.image;
      if (req.file) {
        if (existingProperty?.image) {
          const oldFilePath = path.join(
            __dirname,
            '../public',
            existingProperty.image,
          );
          fs.unlink(oldFilePath, (err) => {
            if (err && err.code !== 'ENOENT') {
              console.error('Error deleting old file:', err);
            }
          });
        }
        image = `${req.file.filename}`;
      }

      const updatedProperty = await prisma.properties.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          image,
          updated_at: new Date(),
          ...(category_id
            ? { category: { connect: { id: parseInt(category_id) } } }
            : {}),
          ...(address_id
            ? { address: { connect: { id: parseInt(address_id) } } }
            : {}),
        },
      });

      return updatedProperty;
    } catch (error) {
      if (req.file) {
        const filePath = path.join(
          __dirname,
          '../public',
          'images/',
          req.file.filename,
        );
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
      throw new ErrorHandler(500);
    }
  }

  static async deleteProperti(req: Request) {
    const { id } = req.params;
    try {
      const property = await prisma.properties.findUnique({
        where: { id: Number(id) },
        select: { image: true },
      });

      if (!property) {
        throw new ErrorHandler(404);
      }
      const deletedProperty = await prisma.properties.delete({
        where: { id: Number(id) },
      });
      if (property.image) {
        const imagePath = path.join(__dirname, '../public', property.image);
        fs.unlink(imagePath, (err) => {
          if (err && err.code !== 'ENOENT') {
            console.error('Error deleting image file:', err);
          }
        });
      }
      return deletedProperty;
    } catch (error) {
      if (error instanceof ErrorHandler) {
        throw error;
      }
      throw new ErrorHandler(500);
    }
  }
}
