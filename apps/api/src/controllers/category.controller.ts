import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '@/services/category.service';
export class CategoryController {
  async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.getAllCategory(req);
      return res
        .status(200)
        .json({ message: 'Get All Category Success', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.getByIdService(req);
      return res
        .status(200)
        .json({ message: 'Get Category By Id Success', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.createCategory(req);
      return res.status(200).json({ data, message: 'Create Category Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.updateCategory(req);
      return res.status(200).json({ data, message: 'Update Category Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.deleteCategory(req);
      return res.status(200).json({ data, message: 'Delete Category Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
