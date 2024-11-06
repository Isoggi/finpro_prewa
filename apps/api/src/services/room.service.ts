import { Request } from 'express';
import prisma from '@/prisma';
import { ErrorHandler } from '@/helpers/response.helper';
import fs from 'fs';
import path from 'path';

export class RoomService {
  static async getByIdService(req: Request) {
    const { slug } = req.params;
    const slugName = decodeURI(slug);
    if (slug) {
      const data = await prisma.rooms.findFirst({
        where: { slug: slug, isActive: true },
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
      return data;
    }
  }

  static async createRoom(req: Request) {
    const {
      property_id,
      name,
      description,
      price,
      capacity,
      availability,
      peakSeasonRate,
    } = req.body;
    let image = null;

    try {
      if (!property_id || !name || !price || !capacity) {
        throw new Error('Missing required fields');
      }
      const parsedPropertyId = parseInt(property_id);
      const parsedPrice = parseFloat(price);
      const parsedCapacity = parseInt(capacity);

      if (req.file) {
        image = req.file.filename;
      }

      // Buat data Room
      const newRoom = await prisma.rooms.create({
        data: {
          property_id: parsedPropertyId,
          name,
          description,
          price: parsedPrice,
          capacity: parsedCapacity,
          image,
          slug: name.toLowerCase().replace(/\s+/g, '-'), // generate a slug from the name
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      // Tambahkan Availability jika ada
      if (availability && Array.isArray(availability)) {
        const availabilityData = availability.map((avail: any) => ({
          room_id: newRoom.id,
          date: new Date(avail.date),
          stock: avail.stock,
        }));
        await prisma.availability.createMany({ data: availabilityData });
      }

      // Tambahkan PeakSeasonRate jika ada
      if (peakSeasonRate && Array.isArray(peakSeasonRate)) {
        const peakRateData = peakSeasonRate.map((rate: any) => ({
          room_id: newRoom.id,
          start_date: new Date(rate.start_date),
          end_date: new Date(rate.end_date),
          rates: rate.rates,
          rateCategory: rate.rateCategory,
        }));
        await prisma.peakSeasonRate.createMany({ data: peakRateData });
      }
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
      throw error instanceof ErrorHandler ? error : new ErrorHandler(500);
    }
  }

  static async updateRoom(req: Request) {
    const { id } = req.params;
    const { name, description, price, capacity, property_id } = req.body;
    try {
      const existingRoom = await prisma.rooms.findUnique({
        where: { id: Number(id) },
        select: { image: true },
      });

      if (!existingRoom) throw new ErrorHandler(404);

      let image = existingRoom.image;
      if (req.file) {
        if (existingRoom.image) {
          const oldFilePath = path.join(
            __dirname,
            '../public/images',
            existingRoom.image,
          );
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
        image = req.file.filename;
      }

      const updateData: any = {
        name,
        description,
        image,
        updated_at: new Date(),
      };

      if (price !== undefined) updateData.price = parseFloat(price);
      if (capacity !== undefined) updateData.capacity = parseInt(capacity);
      if (property_id !== undefined) {
        const parsedPropertyId = parseInt(property_id);
        if (isNaN(parsedPropertyId))
          throw new Error('Invalid property ID format');
        updateData.property_id = parsedPropertyId;
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
          '../public/images',
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
        select: { image: true, id: true },
      });

      if (!room) throw new ErrorHandler(404);
      await prisma.$transaction(async (prisma) => {
        await prisma.availability.deleteMany({
          where: { room_id: room.id },
        });

        await prisma.peakSeasonRate.deleteMany({
          where: { room_id: room.id },
        });

        await prisma.rooms.delete({
          where: { id: room.id },
        });
      });
      if (room.image) {
        const filePath = path.join(__dirname, '../public/images', room.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      return { message: 'Room and related data deleted successfully' };
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error instanceof ErrorHandler ? error : new ErrorHandler(500);
    }
  }
}
