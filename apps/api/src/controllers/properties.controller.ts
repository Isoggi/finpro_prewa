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

  async getBySearch(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PropertiesService.search(req);
      return res.status(200).json({
        message: 'Get Properties By Search Success',
        data,
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PropertiesService.getByIdService(req);
      return res
        .status(200)
        .json({ message: 'Get Event By Id Success', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createProperti(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PropertiesService.createProperti(req);
      return res.status(200).json({ data, message: 'Create Properti Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateProperti(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PropertiesService.updateProperti(req);
      return res.status(200).json({ data, message: 'Update Properti Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteProperti(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PropertiesService.deleteProperti(req);
      return res.status(200).json({ data, message: 'Delete Properti Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
