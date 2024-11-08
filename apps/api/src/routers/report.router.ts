import { Router } from 'express';
import { ReportController } from '../controllers/report.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
// import { uploader } from "../libs/uploader.lib";

export class ReportRouter {
  private router: Router = Router();
  private reportController = new ReportController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get(
      '/sales',
      AuthMiddleware,
      this.reportController.getSalesReport,
    );
    this.router.get(
      '/property',
      AuthMiddleware,
      this.reportController.getPropertyReport,
    );
  }
  public getRouter(): Router {
    return this.router;
  }
}
