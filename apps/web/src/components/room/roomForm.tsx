import React from 'react';
import { PrismaClient } from '@prisma/client';
import AddRoom from './addRoom';
import UpdateProperti from '@/components/properti/updateProperti';
import DeleteProperti from '@/components/properti/deleteProperti';
import { get, property } from 'cypress/types/lodash';

const prisma = new PrismaClient();

const getRooms = async () => {
  const res = await prisma.rooms.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      capacity: true,
      image: true,
      property_id: true,
    },
  });
  return res;
};

const getProperties = async () => {
  const res = await prisma.properties.findMany({
    select: {
      id: true,
      tenant_id: true,
      name: true,
      description: true,
      category_id: true,
      address_id: true,
      slug_address: true,
      image: true,
      created_at: true,
      updated_at: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      address: {
        select: {
          id: true,
          lng: true,
          lat: true,
          province_id: true,
          district_id: true,
          detail: true,
        },
      },
    },
  });
  return res;
};

const formRooms = async () => {
  const [properties, rooms] = await Promise.all([getProperties(), getRooms()]);

  return (
    <div>
      <div className="mb-2">
        <AddRoom property={properties} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Property</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={room.id}>
              <td>{index + 1}</td>
              <td>{room.name}</td>
              <td>{room.description}</td>
              <td>{room.price.toString()}</td>
              <td>{room.capacity}</td>
              <td>{room.property_id}</td>
              <td className="flex justify-center space-x-1"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default formRooms;
