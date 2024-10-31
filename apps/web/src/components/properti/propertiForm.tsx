import React from 'react';
import { PrismaClient } from '@prisma/client';
import AddProperti from './addProperti';
import UpdateProperti from '@/components/properti/updateProperti';
import DeleteProperti from '@/components/properti/deleteProperti';
import { DecimalLocale } from 'validator';
const prisma = new PrismaClient();

const getProperti = async () => {
  const res = await prisma.properties.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      slug_address: true,
      category: true,
      address: {
        select: {
          id: true,
          lng: true,
          lat: true,
          detail: true,
          district: true,
          provinces: true,
        },
      },
      tenant: true,
      rooms: true,
      category_id: true,
      address_id: true,
    },
  });

  return res.map((properties) => ({
    ...properties,
    rooms: properties.rooms.map((rooms) => ({
      ...rooms,
      price: rooms.price.toString(),
    })),
  }));
};
const getCategory = async () => {
  const res = await prisma.categories.findMany();
  return res;
};

const getAddress = async () => {
  const res = await prisma.address.findMany();
  return res;
};

const getRooms = async () => {
  const res = await prisma.rooms.findMany();
  return res;
};

const formProperti = async () => {
  const [properti, category, addresses] = await Promise.all([
    getProperti(),
    getCategory(),
    getAddress(),
  ]);

  return (
    <div>
      <div className="mb-2">
        <AddProperti categories={category} addresses={addresses} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Address</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properti.map((properties, index) => (
            <tr key={properties.id}>
              <td>{index + 1}</td>
              <td>{properties.name}</td>
              <td>{properties.description}</td>
              <td>{properties.category.name}</td>
              <td>{properties.address.detail}</td>
              <td className="flex justify-center space-x-1">
                <DeleteProperti properties={properties} />
                <UpdateProperti
                  categories={category}
                  addresses={addresses}
                  properties={properties}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default formProperti;
