import { Request, Response, NextFunction } from 'express';
import { PeakSeasonService } from '@/services/PeakSeason.service';
export class PeakSeasonController {
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PeakSeasonService.getByIdService(req);
      return res.status(200).json({
        message: 'Get Peak Season By Id Success',
        data,
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async createPeakSeason(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PeakSeasonService.createPeakSeason(req);
      return res
        .status(200)
        .json({ data, message: 'Create Availability Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updatePeakSeason(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PeakSeasonService.updatePeakSeason(req);
      return res
        .status(200)
        .json({ data, message: 'Update Availability Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deletePeakSeason(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PeakSeasonService.deletePeakSeason(req);
      return res
        .status(200)
        .json({ data, message: 'Delete Availability Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
