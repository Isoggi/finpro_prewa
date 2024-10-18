import { Router } from 'express';
import { PropertiesController } from '@/controllers/properties.controller';

export class PropertiesRouter {
  private router: Router = Router();
  private propertiesController = new PropertiesController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get('/', this.propertiesController.getBySearch);
    // this.router.get("/category", this.eventController.getCategories);
    // this.router.get("/venue", this.eventController.getVenues);
    // this.router.get("/location", this.eventController.getLocations);
    this.router.get('/:id', this.propertiesController.getById);
  }

  public getRouter(): Router {
    return this.router;
  }
}
