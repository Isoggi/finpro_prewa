'use client';
import React, { useEffect, useState } from 'react';
import { api } from '@/config/axios.config';
import { IRooms } from '@/interfaces/room.interface';
import Image from 'next/image';
import Footer from '@/components/footer';
import { properties_src } from '@/config/images.config';
import DateRangePicker from '@/components/DatePickerRange';
import RoomBookForm from '@/components/room/roomBookForm';

const RoomDetail = ({ params }: { params: { id: string } }) => {
  const [room, setRoom] = useState<IRooms | null>(null);

  useEffect(() => {
    if (params.id) {
      const fetchRoomDetail = async () => {
        const response = await api.get(`/room/${params.id}`);
        const data = response.data.data as IRooms;

        setRoom(data);
      };
      fetchRoomDetail();
    }
  }, [params.id]);

  if (!room) return <div>Loading...</div>;

  return (
    <>
      <div className="container mx-auto max-w-screen-xl">
        <div className="w-full lg:w-2/3">
          <h1 className="text-3xl font-bold">{room.name}</h1>
          <Image
            src={room.image || '/default-hotel.jpg'}
            alt={room.name}
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
          <p className="mt-4">{room.description}</p>
          <p className="mt-2 text-xl font-bold">
            Rp {room.price.toLocaleString()}
          </p>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Additional Details</h2>

            <div className="mt-4">
              <h3 className="font-semibold">Category:</h3>
              <p>{room.category?.name}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Address:</h3>
              <p>{room.address?.detail}</p>
              <p>
                {room.address?.district?.name}, {room.address?.provinces?.name}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Availability:</h3>
              {room.availability?.length ? (
                room.availability.map((avail) => (
                  <div key={avail.id} className="border-b border-gray-200 py-2">
                    <p>
                      {avail.name} - Rp {avail.price.toLocaleString()}
                    </p>
                    <p>Capacity: {avail.capacity}</p>
                  </div>
                ))
              ) : (
                <p>No availability information available.</p>
              )}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Peak Season Rate:</h3>
              <p>{room.peakSeasonRate?.name || 'Not available'}</p>
              <p>
                Price: Rp{' '}
                {room.peakSeasonRate?.price
                  ? room.peakSeasonRate.price.toLocaleString()
                  : 'Not available'}
              </p>
              <p>
                Capacity: {room.peakSeasonRate?.capacity || 'Not available'}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div>
              <RoomBookForm room={room} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default RoomDetail;
