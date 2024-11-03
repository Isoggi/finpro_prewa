import React from 'react';
import AddCategory from './addCategory';
import UpdateCategory from './updateCategory';
import DeleteCategory from './deleteCategory';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getCategories = async () => {
  const res = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return res;
};

const FormCategory = async () => {
  const categories = await getCategories();
  return (
    <div>
      <div className="mb-2">
        <AddCategory />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td className="flex justify-center space-x-1">
                <UpdateCategory category={category} />
                <DeleteCategory id={category.id} name={category.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormCategory;
