import { Request } from 'express';
import prisma from '@/prisma';
import { ErrorHandler } from '@/helpers/response.helper';
import { PeakSeasonRate } from '@prisma/client';
export class PeakSeasonService {
  static async getByIdService(req: Request) {
    const { id } = req.params;
    const peakSeason = await prisma.peakSeasonRate.findUnique({
      where: { id: Number(id) },
    });
    if (!peakSeason) {
      throw new ErrorHandler(404);
    }
    return peakSeason;
  }

  static async createPeakSeason(req: Request) {
    const { room_id, start_date, end_date, rates, rateCategory } = req.body;

    // Ensure dates are formatted correctly
    const formattedStartDate = new Date(start_date);
    const formattedEndDate = new Date(end_date);

    if (
      isNaN(formattedStartDate.getTime()) ||
      isNaN(formattedEndDate.getTime())
    ) {
      throw new ErrorHandler(400);
    }

    const newPeakSeason = await prisma.peakSeasonRate.create({
      data: {
        room_id,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        rates,
        rateCategory,
      },
    });

    return newPeakSeason;
  }

  static async updatePeakSeason(req: Request) {
    const { id } = req.params;
    const { start_date, end_date, rates, rateCategory } = req.body;

    // Ensure dates are formatted correctly
    const formattedStartDate = new Date(start_date);
    const formattedEndDate = new Date(end_date);

    if (
      isNaN(formattedStartDate.getTime()) ||
      isNaN(formattedEndDate.getTime())
    ) {
      throw new ErrorHandler(400);
    }

    const peakSeason = await prisma.peakSeasonRate.update({
      where: { id: Number(id) },
      data: {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        rates,
        rateCategory,
      },
    });

    return peakSeason;
  }

  static async deletePeakSeason(req: Request) {
    const { id } = req.params;

    const deletedPeakSeason = await prisma.peakSeasonRate.delete({
      where: { id: Number(id) },
    });

    return deletedPeakSeason;
  }
}
