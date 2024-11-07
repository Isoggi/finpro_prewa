import { NextFunction, Request, Response } from 'express';
import { ReportService } from '@/services/report.service';

export class ReportController {
  async getSalesReport(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ReportService.getSales(req);

      return res
        .status(200)
        .json({ message: 'Get Review Success', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getPropertyReport(req: Request, res: Response, next: NextFunction) {
    const data = await ReportService.getProperty(req);

    return res
      .status(200)
      .json({ message: 'Posting Review Success', data, success: true });
  }
}
