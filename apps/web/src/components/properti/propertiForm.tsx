import React from 'react';
import { PrismaClient } from '@prisma/client';
import AddProperti from './addProperti';
import deleteProperti from './deleteProperti';
import updateProperti from './updateProperti';
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
      address: true,
      tenant: true,
      rooms: true,
    },
  });
  return res;
};

const getCategory: () => Promise<any> = async () => {
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

const getTenant = async () => {
  const res = await prisma.tenants.findMany();
  return res;
};

const formProperti = async () => {
  const [properti, category, addresses] = await Promise.all([
    getProperti(),
    getCategory(),
    getAddress(), // assuming getAddress() returns the addresses
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
              <td className="flex justify-center space-x-1"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default formProperti;
