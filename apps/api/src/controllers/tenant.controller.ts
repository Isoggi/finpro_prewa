import { TenantService } from '@/services/tenant.service';
import { NextFunction, Request, Response } from 'express';

export class TenantController {
  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TenantService.getTransactions(req);

      return res.status(200).json({
        message: 'Get Tenant Transaction History',
        data,
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
