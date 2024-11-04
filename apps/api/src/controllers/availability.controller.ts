import { Request, Response, NextFunction } from 'express';
import { AvailabilityService } from '@/services/availability.service';
export class AvailabilityController {
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AvailabilityService.getByIdService(req);
      return res.status(200).json({
        message: 'Get Availability By Id Success',
        data,
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async createAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AvailabilityService.createAvailability(req);
      return res
        .status(200)
        .json({ data, message: 'Create Availability Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AvailabilityService.updateAvailability(req);
      return res
        .status(200)
        .json({ data, message: 'Update Availability Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AvailabilityService.deleteAvailability(req);
      return res
        .status(200)
        .json({ data, message: 'Delete Availability Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
