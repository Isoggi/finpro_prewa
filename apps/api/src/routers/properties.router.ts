import { Router } from 'express';
import { PropertiesController } from '@/controllers/properties.controller';
import { uploader } from '@/libs/uploader.lib';

export class PropertiesRouter {
  private router: Router = Router();
  private propertiesController = new PropertiesController();
  private uploadMiddleware = uploader('property', 'properties');

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get('/', this.propertiesController.getBySearch);
    this.router.get('/:id', this.propertiesController.getById);

    this.router.post(
      '/',
      this.uploadMiddleware.single('image'),
      this.propertiesController.createProperti,
    );

    this.router.put(
      '/:id',
      this.uploadMiddleware.single('image'),
      this.propertiesController.updateProperti,
    );

    this.router.delete('/:id', this.propertiesController.deleteProperti);
  }

  public getRouter(): Router {
    return this.router;
  }
}
