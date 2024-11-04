import { IRooms } from '@/interfaces/property.interface';
import Image from 'next/image';
import React from 'react';

type Props = { room: IRooms; func: (value: any) => void };

export default function roomCard({ room, func }: Props) {
  return (
    <div
      key={room.id}
      className="flex items-start border rounded-lg p-4 shadow-lg"
    >
      <Image
        src={room.image || '/default-room.jpg'}
        alt={room.name}
        width={200}
        height={150}
        className="rounded-lg object-cover"
      />
      <div className="ml-6 flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold">{room.name}</h3>
          <p className="text-gray-700">{room.description}</p>
        </div>
        <div className="mt-2">
          <p className="text-xl font-bold text-black">
            Rp {room.price.toLocaleString()}
          </p>
        </div>
        <button
          type="button"
          onClick={func}
          title={`select ${room.name}`}
          className="mt-4 bg-[#7AB2D3] text-white py-2 px-4 rounded-lg"
        >
          Pilih Kamar
        </button>
      </div>
    </div>
  );
}
