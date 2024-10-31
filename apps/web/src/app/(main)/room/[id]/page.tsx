'use client';
import React, { useEffect, useState } from 'react';
import { api } from '@/config/axios.config';
import { IRooms } from '@/interfaces/room.interface';
import Image from 'next/image';
import Footer from '@/components/footer';
import {
  FaBed,
  FaMapMarkerAlt,
  FaUserAlt,
  FaMoneyBillWave,
  FaSwimmingPool,
  FaUtensils,
  FaParking,
  FaWifi,
  FaConciergeBell,
  FaWind,
} from 'react-icons/fa';
import { MdElevator } from 'react-icons/md';
import Link from 'next/link';

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
    <div className="container mx-auto max-w-screen-xl py-4">
      <Image
        src={
          room.image?.includes('http')
            ? room.image
            : `${process.env.NEXT_PUBLIC_ROOM_IMAGE}${room.image}`
        }
        alt={room.name}
        width={600}
        height={400}
        className="rounded-lg object-cover mx-auto"
      />

      <div className="box mt-4 p-4 border rounded-lg shadow-md bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{room.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaMoneyBillWave className="text-blue-500 text-xl mr-2" />
              <p className="text-xl font-bold">
                Rp {room.price.toLocaleString()}
              </p>
            </div>
            <Link
              href={`/room/${room.id}`}
              className="bg-[#62CDFF] text-white py-2 px-4 rounded-lg"
            >
              Pilih Room
            </Link>
          </div>
        </div>

        <div className="mt-2">
          <h3 className="font-semibold">Kategori:</h3>
          <p>{room.category?.name || 'Tidak tersedia'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="border p-4 rounded-lg shadow-md bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Fasilitas Utama</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-blue-500">
              <div className="flex items-center space-x-2">
                <FaWind />
                <span className="text-gray-700">AC</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUtensils />
                <span className="text-gray-700">Restoran</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaSwimmingPool />
                <span className="text-gray-700">Kolam Renang</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaConciergeBell />
                <span className="text-gray-700">Resepsionis 24 Jam</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaParking />
                <span className="text-gray-700">Parkir</span>
              </div>
              <div className="flex items-center space-x-2">
                <MdElevator />
                <span className="text-gray-700">Lift</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaWifi />
                <span className="text-gray-700">WiFi</span>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-lg shadow-md bg-white">
            <div className="mb-2">
              <h4 className="font-semibold">Alamat</h4>
              <p>{room.address?.detail}</p>
              <p>
                {room.address?.district?.name}, {room.address?.provinces?.name}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Kapasitas</h4>
              <p>{room.capacity}</p>
            </div>
          </div>

          <div className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-semibold mb-2">
              Ketersediaan & Tarif Musim Puncak
            </h3>
            <div className="mb-2">
              <h4 className="font-semibold">Tarif Musim Puncak:</h4>
              <p>{room.peakSeasonRate?.name || 'Tidak tersedia'}</p>
              <p>
                Harga: Rp{' '}
                {room.peakSeasonRate?.price
                  ? room.peakSeasonRate.price.toLocaleString()
                  : 'Tidak tersedia'}
              </p>
              <p>
                Kapasitas: {room.peakSeasonRate?.capacity || 'Tidak tersedia'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Ketersediaan:</h4>
              {room.availability?.length ? (
                room.availability.map((avail) => (
                  <div key={avail.id} className="border-b border-gray-200 py-2">
                    <p>
                      {avail.name} - Rp {avail.price.toLocaleString()}
                    </p>
                    <p>Kapasitas: {avail.capacity}</p>
                  </div>
                ))
              ) : (
                <p>Informasi ketersediaan tidak tersedia.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Deskripsi Kamar</h2>
          <p className="mt-2 text-gray-600">{room.description}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RoomDetail;
