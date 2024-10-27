import { Request } from 'express';
import prisma from '@/prisma';
import { ErrorHandler } from '@/helpers/response.helper';

export class RoomService {
  static async getByIdService(req: Request) {
    const { id } = req.params;
    if (id) {
      const data = await prisma.rooms.findUnique({
        where: { id: parseInt(id) },
        include: {
          available: true,
          peakSeasonRate: true,
        },
      });
      console.log(data);
      return data;
    }
    return null;
  }

  static async createRoom(req: Request) {
    const { property_id, name, description, price, capacity, image } = req.body;

    try {
      const newRoom = await prisma.rooms.create({
        data: {
          property_id,
          name,
          description,
          price,
          capacity,
          image,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      return newRoom;
    } catch (error) {
      throw new ErrorHandler(500);
    }
  }

  static async updateRoom(req: Request) {
    const { id } = req.params;
    const { name, description, price, image } = req.body;
    const updatedRoom = await prisma.rooms.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        image,
        price: parseFloat(price),
      },
    });
    if (!updatedRoom) throw new ErrorHandler(404);
    return updatedRoom;
  }

  static async deleteRoom(req: Request) {
    const { id } = req.params;
    const deletedRoom = await prisma.rooms.delete({
      where: { id: Number(id) },
    });
    if (!deletedRoom) throw new ErrorHandler(404);
    return deletedRoom;
  }
}
