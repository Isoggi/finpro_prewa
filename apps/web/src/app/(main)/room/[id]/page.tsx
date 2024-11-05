'use client';
import React, { useEffect, useState } from 'react';
import { api } from '@/config/axios.config';
import { IRooms } from '@/interfaces/room.interface';
import Image from 'next/image';
import Footer from '@/components/footer';
import { FaBed, FaConciergeBell, FaWifi, FaWind } from 'react-icons/fa';
import { MdFreeBreakfast, MdShower } from 'react-icons/md';
import Loading from '@/app/loading';
import RoomBookForm from '@/components/room/roomBookForm';
import { CiLocationOn } from 'react-icons/ci';
import { MdVilla } from 'react-icons/md';

const RoomDetail = ({ params }: { params: { id: string } }) => {
  const [room, setRoom] = useState<IRooms | null>(null);

  useEffect(() => {
    if (params.id) {
      const fetchRoomDetail = async () => {
        const response = await api.get(`/room/${params.id}`);
        const data = response.data.data as IRooms;
        console.log(data);

        setRoom(data);
      };
      fetchRoomDetail();
    }
  }, [params.id]);

  if (!room)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="container mx-auto max-w-screen-xl py-4">
      <div className="flex flex-col md:flex-row">
        <Image
          src={
            room.image
              ? room.image.includes('http')
                ? room.image
                : `${process.env.NEXT_PUBLIC_ROOM_IMAGE}${room.image}`
              : '/default-hotel.jpg'
          }
          alt={room.name}
          width={200}
          height={200}
          className="rounded-xl object-contain w-full mx-auto md:mr-2"
        />
        <div className="border p-4 rounded-lg shadow-md bg-white md:w-2/4">
          <RoomBookForm room={room} />
        </div>
      </div>

      <div className="box mt-4 p-4 py-8 bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{room.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <p className="text-lg font-bold ">
                Rp {room.price.toLocaleString()}/malam
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex flex-col">
            <div className="flex items-center text-sm">
              <CiLocationOn className="mr-1" />
              <p>{room.address?.provinces.name || 'Tidak tersedia'}</p>
              <span className="mx-1">-</span>
              <p>{room.address?.district.name || 'Tidak tersedia'}</p>
            </div>
          </div>
          <h2 className="flex items-center text-sm">
            <MdVilla className="mr-1" />
            {room.category?.name || 'Tidak tersedia'}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white md:col-span-3">
            <h2 className="text-xl font-semibold">Deskripsi Kamar</h2>
            <p className="mt-2 mb-8 text-gray-600">{room.description}</p>
          </div>
          <div className="bg-white md:col-span-2">
            <h3 className="text-xl font-semibold">Fasilitas Utama</h3>
            <div className="grid md:col-span-2 grid-cols-2 gap-4 text-blue-500 mt-4">
              <div className="flex items-center space-x-2">
                <FaWind />
                <span className="text-gray-700">AC</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaBed />
                <span className="text-gray-700">Double bed</span>
              </div>
              <div className="flex items-center space-x-2">
                <MdShower />
                <span className="text-gray-700">Shower</span>
              </div>
              <div className="flex items-center space-x-2">
                <MdFreeBreakfast />
                <span className="text-gray-700">Breakfast</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaConciergeBell />
                <span className="text-gray-700">Resepsionis 24 Jam</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaWifi />
                <span className="text-gray-700">WiFi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoomDetail;
