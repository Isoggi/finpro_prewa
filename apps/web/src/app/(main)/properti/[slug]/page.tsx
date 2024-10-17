import React from 'react';
import { PropertiesData } from '@/app/api/data';

export default function PropertyDetailPage({
  params,
}: {
  params: { roomId: string };
}) {
  const roomId = parseInt(params.roomId);
  const room = PropertiesData.rooms.find((r) => r.id === roomId);
  const property = room
    ? PropertiesData.properties.find((p) => p.id === room.property_id)
    : null;
  const address = property
    ? PropertiesData.addresses.find((a) => a.id === property.address_id)
    : null;
  const province = address
    ? PropertiesData.provinces.find((p) => p.id === address.province_id)
    : null;
  const district = address
    ? PropertiesData.districts.find((d) => d.id === address.district_id)
    : null;

  if (!room || !property) {
    return <div className="p-4">Property not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{room.name}</h1>
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-xl font-semibold mb-2">Rp {room.price}</p>
      <p className="mb-4">{property.description}</p>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Location</h2>
        <p>{property.name}</p>
        <p>
          {district?.name}, {province?.name}
        </p>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
}
