import React from 'react';
import AddRoom from './addRoom';
import UpdateRoom from '@/components/room/updateRoom';
import DeleteRoom from '@/components/room/deleteRoom';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getRooms = async () => {
  const res = await prisma.rooms.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      capacity: true,
      property_id: true,
      image: true,
      property: true,
      isActive: true,
    },
  });
  return res;
};

const getProperties = async () => {
  const res = await prisma.properties.findMany({
    where: { isActive: true },
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
      isActive: true,
    },
  });
  return res;
};

const formRooms = async () => {
  const [properties, rooms] = await Promise.all([getProperties(), getRooms()]);

  return (
    <div>
      <div className="mb-2">
        <AddRoom properties={properties} />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-1 text-left">ID</th>
              <th className="px-2 py-1 text-left">Name</th>
              <th className="px-2 py-1 text-left">Description</th>
              <th className="px-2 py-1 text-left">Price</th>
              <th className="px-2 py-1 text-left">Capacity</th>
              <th className="px-2 py-1 text-left">Property</th>
              <th className="px-2 py-1 text-left">Image</th>
              <th className="px-2 py-1 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room.id} className="border-b">
                <td className="px-2 py-1">{index + 1}</td>
                <td className="px-2 py-1">{room.name}</td>
                <td className="px-2 py-1">{room.description}</td>
                <td className="px-2 py-1">{room.price.toLocaleString()}</td>
                <td className="px-2 py-1">{room.capacity}</td>
                <td className="px-2 py-1">{room.property.name}</td>
                <td className="px-2 py-1">
                  <img
                    src={
                      room.image?.includes('http')
                        ? room.image
                        : `${process.env.NEXT_PUBLIC_ROOM_IMAGE}${room.image}`
                    }
                    alt={room.name}
                    className="w-full h-20 md:h-32 lg:h-40 object-cover rounded-md mb-2"
                  />
                </td>
                <td className="px-2 py-1 flex justify-center space-x-1">
                  <UpdateRoom
                    room={{ ...room, price: Number(room.price) }}
                    properties={properties}
                  />
                  <DeleteRoom id={room.id} name={room.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default formRooms;
