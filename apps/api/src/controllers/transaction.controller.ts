import { TransactionItems } from '@/interfaces/transaction.interface';
import { TransactionService } from '@/services/transaction.service';
import { Request, Response, NextFunction } from 'express';

export class TransactionController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TransactionService.get(req);

      return res
        .status(200)
        .json({ message: 'Get Transaction History', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { transactionItems } = req.body;
      if (transactionItems) {
        const data = transactionItems as TransactionItems[];
      }

      return res;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
