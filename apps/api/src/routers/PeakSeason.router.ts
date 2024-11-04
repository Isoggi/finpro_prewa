import { Router } from 'express';
import { PeakSeasonController } from '@/controllers/peakSeason.controller';

export class PeakSeasonRouter {
  private router: Router = Router();
  private PeakSeasonController = new PeakSeasonController();

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get('/:id', this.PeakSeasonController.getById);
    this.router.post('/', this.PeakSeasonController.createPeakSeason);
    this.router.put('/:id', this.PeakSeasonController.updatePeakSeason);
    this.router.delete('/:id', this.PeakSeasonController.deletePeakSeason);
  }

  public getRouter(): Router {
    return this.router;
  }
}
