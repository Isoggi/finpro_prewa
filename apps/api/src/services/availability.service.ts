import { Request } from 'express';
import prisma from '@/prisma';
import { ErrorHandler } from '@/helpers/response.helper';

export class AvailabilityService {
  static async getByIdService(req: Request) {
    const { id } = req.params;
    const data = await prisma.availability.findUnique({
      where: { id: Number(id) },
    });
  }

  static async createAvailability(req: Request) {
    const { room_id, stock, date } = req.body;
    if (!room_id || !stock || !date) {
      throw new ErrorHandler(400);
    }
    const newAvailability = await prisma.availability.create({
      data: {
        room_id,
        stock,
        date: new Date(date),
      },
    });
    return newAvailability;
  }

  static async updateAvailability(req: Request) {
    const { id } = req.params;
    const { room_id, stock, date, isCanceled } = req.body;

    const availability = await prisma.availability.findUnique({
      where: { id: Number(id) },
    });
    if (!availability) throw new ErrorHandler(404);

    const updatedAvailability = await prisma.availability.update({
      where: { id: Number(id) },
      data: {
        room_id: room_id ? Number(room_id) : undefined,
        stock: stock ? Number(stock) : undefined,
        date: date ? new Date(date) : undefined,
        isCanceled: isCanceled ?? availability.isCanceled,
      },
    });

    return updatedAvailability;
  }

  static async deleteAvailability(req: Request) {
    const { id } = req.params;

    const availability = await prisma.availability.findUnique({
      where: { id: Number(id) },
    });
    if (!availability) throw new ErrorHandler(404);

    await prisma.availability.delete({
      where: { id: Number(id) },
    });

    return { message: 'Availability deleted successfully' };
  }
}
