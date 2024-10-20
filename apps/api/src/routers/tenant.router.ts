import { Router } from 'express';
import { TenantController } from '../controllers/tenant.controller';
// import { validateAuth } from "../middlewares/authValidator.middleware";
// import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { AuthMiddleware } from '../middlewares/auth.middleware';
// import { uploader } from "../libs/uploader.lib";

export class TenantRouter {
  private router: Router = Router();
  private tenantController = new TenantController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get(
      '/transaction',
      AuthMiddleware,
      this.tenantController.getTransactions,
    );
    this.router.get(
      '/transaction/:id',
      AuthMiddleware,
      this.tenantController.getTransactionById,
    );
    this.router.post(
      '/transaction/verifyOrder',
      AuthMiddleware,
      this.tenantController.verifyOrder,
    );
  }
  public getRouter(): Router {
    return this.router;
  }
}
