import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
// import { validateAuth } from "../middlewares/authValidator.middleware";
// import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { uploader } from '@/libs/uploader.lib';
// import { uploader } from "../libs/uploader.lib";

export class TransactionRouter {
  private router: Router = Router();
  private transactionController = new TransactionController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get('', AuthMiddleware, this.transactionController.get);
    this.router.get('/:id', AuthMiddleware, this.transactionController.getById);

    this.router.post(
      '/upload-payment-proof',
      AuthMiddleware,
      uploader('PAYMENT', 'trx').single('image'),
      this.transactionController.uploadProof,
    );
  }
  public getRouter(): Router {
    return this.router;
  }
}
