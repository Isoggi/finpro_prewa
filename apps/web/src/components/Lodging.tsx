'use client';
import React, { useState } from 'react';
import { PropertiesData } from '@/app/api/data';
import { useRouter } from 'next/navigation';

interface Property {
  id: number;
  tenant_id: number;
  name: string;
  description: string;
  category_id: number;
  address_id: number;
  slug_address: string;
}

interface Room {
  id: number;
  property_id: number;
  name: string;
  price: number;
  image: string;
}

interface Address {
  id: number;
  province_id: number;
  district_id: number;
}

interface Province {
  id: number;
  name: string;
}

interface District {
  id: number;
  province_id: number;
  name: string;
}

interface PropertiesSectionProps {
  name: string;
  property: Property[];
  rooms: Room[];
  addresses: Address[];
  provinces: Province[];
  districts: District[];
}

const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  name,
  property,
  rooms,
  addresses,
  provinces,
  districts,
}) => {
  const [showAll, setShowAll] = useState(false);
  const propertiesToShow = showAll ? property : property.slice(0, 6);
  const router = useRouter();

  const getAddressDetails = (addressId: number) => {
    const address = addresses.find((addr) => addr.id === addressId);
    const district = address
      ? districts.find((dist) => dist.id === address.district_id)
      : null;
    const province = address
      ? provinces.find((prov) => prov.id === address.province_id)
      : null;

    return {
      provinceName: province ? province.name : 'N/A',
      districtName: district ? district.name : 'N/A',
    };
  };

  const handleCardClick = (roomName: string) => {
    router.push(`/properti/${roomName}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold text-black mb-4">{name}</h2>

      <div className="flex overflow-x-auto space-x-4 pb-4 mt-4">
        {rooms.map((room) => {
          const propertyForRoom = property.find(
            (p) => p.id === room.property_id,
          );
          const { provinceName, districtName } = getAddressDetails(
            propertyForRoom?.address_id || 0,
          );
          return (
            <div
              key={room.id}
              className="bg-[#ffffff] rounded-lg p-3 text-center transform hover:scale-105 transition duration-200 shadow-lg min-w-[200px] flex-shrink-0 cursor-pointer"
              onClick={() => handleCardClick(room.name)}
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-24 md:h-32 lg:h-40 object-cover rounded-md mb-2"
              />
              <p className="text-black text-sm font-medium">{room.name}</p>
              <p className="text-[#d96d62] text-sm font-semibold">
                {room.price === 0 ? 'Free' : `Rp ${room.price}`}
              </p>
              <div className="flex justify-center items-center gap-x-2">
                <p className="text-[#9a98a3] text-xs">{provinceName}</p>
                <p className="text-[#9a98a3] text-xs">- {districtName}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-500 hover:underline"
        >
          {showAll ? 'Tampilkan sebagian' : 'Tampilkan semua'}
        </button>
      </div>
    </div>
  );
};

export default function Lodging() {
  return (
    <div className="p-4 md:p-8 lg:p-12 ">
      <PropertiesSection
        name="Popular"
        property={PropertiesData.properties}
        rooms={PropertiesData.rooms}
        addresses={PropertiesData.addresses}
        provinces={PropertiesData.provinces}
        districts={PropertiesData.districts}
      />
    </div>
  );
}
