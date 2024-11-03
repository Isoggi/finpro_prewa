import { Router } from 'express';
import { CategoryController } from '@/controllers/category.controller';

export class CategoryRouter {
  private router: Router = Router();
  private categoryController = new CategoryController();

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get('/:id', this.categoryController.getById);
    this.router.post('/', this.categoryController.createCategory);
    this.router.put('/:id', this.categoryController.updateCategory);
    this.router.delete('/:id', this.categoryController.deleteCategory);
  }

  public getRouter(): Router {
    return this.router;
  }
}
