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
    this.router.get('/:id', this.propertiesController.getById);
    this.router.post('/', this.propertiesController.createProperti); // Create
    this.router.put('/:id', this.propertiesController.updateProperti); // Update
    this.router.delete('/:id', this.propertiesController.deleteProperti); // Delete
  }

  public getRouter(): Router {
    return this.router;
  }
}
