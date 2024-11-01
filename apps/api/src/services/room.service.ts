import { Request } from 'express';
import prisma from '@/prisma';
import { ErrorHandler } from '@/helpers/response.helper';
import fs from 'fs';
import path from 'path';

export class RoomService {
  static async getByIdService(req: Request) {
    const { id } = req.params;
    if (id) {
      const data = await prisma.rooms.findUnique({
        where: { id: parseInt(id) },
        include: {
          available: true,
          peakSeasonRate: true,
          property: {
            include: {
              category: true,
              address: { include: { district: true, provinces: true } },
            },
          },
        },
      });
      return {
        ...data,
        address: data?.property.address,
        category: data?.property.category,
      };
    }
    return null;
  }

  static async createRoom(req: Request) {
    const { property_id, name, description, price, capacity } = req.body;
    let image = null;

    try {
      console.log('Request Body:', req.body);
      if (!property_id || !name || !price || !capacity) {
        console.error('Missing fields:', {
          property_id,
          name,
          price,
          capacity,
        });
        throw new Error('Missing required fields');
      }

      const parsedPropertyId = parseInt(property_id);
      const parsedPrice = parseFloat(price);
      const parsedCapacity = parseInt(capacity);

      console.log('Parsed Values:', {
        parsedPropertyId,
        parsedPrice,
        parsedCapacity,
      });
      if (
        isNaN(parsedPropertyId) ||
        isNaN(parsedPrice) ||
        isNaN(parsedCapacity)
      ) {
        throw new Error('Invalid input format');
      }
      if (req.file) {
        image = `${req.file.filename}`;
      }

      const newRoom = await prisma.rooms.create({
        data: {
          property_id: parsedPropertyId,
          name,
          description,
          price: parsedPrice,
          capacity: parsedCapacity,
          image,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      return newRoom;
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

      console.error('Error creating room:', error);

      if (error instanceof Error) {
        switch (error.message) {
          case 'Missing required fields':
          case 'Invalid input format':
            throw new ErrorHandler(400);
          default:
            throw new ErrorHandler(500);
        }
      }
      throw new ErrorHandler(500);
    }
  }

  static async updateRoom(req: Request) {
    const { id } = req.params;
    const { name, description, price, capacity } = req.body;
    try {
      const existingRoom = await prisma.rooms.findUnique({
        where: { id: Number(id) },
      });

      if (!existingRoom) throw new ErrorHandler(404);

      let image = existingRoom.image;
      if (req.file) {
        if (existingRoom.image) {
          const oldFilePath = path.join(
            __dirname,
            '../public',
            existingRoom.image,
          );
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
        image = `${req.file.filename}`;
      }

      const updateData: any = {
        name,
        description,
        image,
        updated_at: new Date(),
      };

      if (price !== undefined) {
        updateData.price = parseFloat(price);
      }
      if (capacity !== undefined) {
        updateData.capacity = parseInt(capacity);
      }

      const updatedRoom = await prisma.rooms.update({
        where: { id: Number(id) },
        data: updateData,
      });

      return updatedRoom;
    } catch (error) {
      if (req.file) {
        const filePath = path.join(
          __dirname,
          '../public/images/',
          req.file.filename,
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      console.error('Error updating room:', error);
      throw error instanceof ErrorHandler ? error : new ErrorHandler(500);
    }
  }

  static async deleteRoom(req: Request) {
    const { id } = req.params;

    try {
      const room = await prisma.rooms.findUnique({
        where: { id: Number(id) },
      });

      if (!room) throw new ErrorHandler(404);

      if (room.image) {
        const filePath = path.join(__dirname, '../public', room.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      const deletedRoom = await prisma.rooms.delete({
        where: { id: Number(id) },
      });

      return deletedRoom;
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error instanceof ErrorHandler ? error : new ErrorHandler(500);
    }
  }
}
