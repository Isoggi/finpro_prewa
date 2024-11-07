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
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <AddCategory />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-2">
                    <UpdateCategory category={category} />
                    <DeleteCategory id={category.id} name={category.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormCategory;
