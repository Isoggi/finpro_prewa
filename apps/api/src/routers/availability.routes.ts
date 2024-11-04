import { Router } from 'express';
import { AvailabilityController } from '@/controllers/availability.controller';

export class AvailabilityRouter {
  private router: Router = Router();
  private availabilityController = new AvailabilityController();

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get('/:id', this.availabilityController.getById);
    this.router.post('/', this.availabilityController.createAvailability);
    this.router.put('/:id', this.availabilityController.updateAvailability);
    this.router.delete('/:id', this.availabilityController.deleteAvailability);
  }

  public getRouter(): Router {
    return this.router;
  }
}
