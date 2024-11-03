import React from 'react';
import AddRoom from './addRoom';
import UpdateRoom from '@/components/room/updateRoom';
import DeleteRoom from '@/components/room/deleteRoom';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getRooms = async () => {
  const res = await prisma.rooms.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      capacity: true,
      property_id: true,
      image: true,
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
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Property</th>
            <th>Image</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={room.id}>
              <td>{index + 1}</td>
              <td>{room.name}</td>
              <td>{room.description}</td>
              <td>{room.price.toLocaleString()}</td>
              <td>{room.capacity}</td>
              <td>{room.property_id}</td>
              <td>
                {' '}
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
              <td className="flex justify-center space-x-1">
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
  );
};

export default formRooms;
