import { Request } from 'express';
import prisma from '@/prisma';
import { ErrorHandler } from '@/helpers/response.helper';
import { Prisma } from '@prisma/client';
export class CategoryService {
  static async getAllCategory(req: Request) {
    const { categoryId } = req.query;
    let where: Prisma.CategoriesWhereInput = {};
    if (categoryId) where.id = Number(categoryId);

    return await prisma.categories.findMany({ where });
  }
  static async getByIdService(req: Request) {
    const { id } = req.params;
    const data = await prisma.categories.findUnique({
      where: { id: Number(id) },
    });
  }

  static async createCategory(req: Request) {
    const { name } = req.body;
    if (!name) throw new ErrorHandler(400);

    const newCategory = await prisma.categories.create({
      data: { name },
    });
    return newCategory;
  }

  static async updateCategory(req: Request) {
    const { id } = req.params;
    const { name } = req.body;

    const category = await prisma.categories.findUnique({
      where: { id: Number(id) },
    });
    if (!category) throw new ErrorHandler(404);

    const updatedCategory = await prisma.categories.update({
      where: { id: Number(id) },
      data: { name },
    });
    return updatedCategory;
  }

  static async deleteCategory(req: Request) {
    const { id } = req.params;

    const category = await prisma.categories.findUnique({
      where: { id: Number(id) },
    });
    if (!category) throw new ErrorHandler(404);

    await prisma.categories.delete({
      where: { id: Number(id) },
    });

    return { message: 'Category deleted successfully' };
  }
}
