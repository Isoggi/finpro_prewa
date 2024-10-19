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
  async getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TenantService.getTransactionById(req);

      return res.status(200).json({
        message: 'Get Tenant Transaction Detail',
        data,
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TenantService.cancelOrder(req);

      return res.status(200).json({
        message: 'Cancel Tenant Transaction',
        data,
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
