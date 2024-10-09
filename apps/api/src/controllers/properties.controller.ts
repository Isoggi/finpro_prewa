import { PropertiesService } from '@/services/properties.service';
import { Request, Response, NextFunction } from 'express';

export class PropertiesController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PropertiesService.get(req);

      return res
        .status(200)
        .json({ message: 'Get Property', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PropertiesService.get(req);
      return res
        .status(200)
        .json({ message: 'Get Property', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
