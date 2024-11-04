'use client';
import Link from 'next/link';
import React from 'react';
import { IProperties } from '@/interfaces/property.interface';
import { api } from '@/config/axios.config';
import { FaMapMarker } from 'react-icons/fa';
import Image from 'next/image';
// import Map from '@/components/map';
import Footer from '@/components/footer';
import RoomDetail from './roomDetail';

import { property_src } from '@/config/images.config';
import { User } from 'next-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import MapLocation from './maplocation';
import { IRooms } from '@/interfaces/property.interface';
import { useSession } from 'next-auth/react';
import { showAlert } from '@/lib/utils';

type Props = {
  slug: string;
};

const ProppertiDetail = ({ slug }: Props) => {
  const [properties, setProperti] = React.useState<IProperties | null>(null);
  const [sortOption, setSortOption] = React.useState({
    field: 'name',
    order: 'asc',
  });

  const [selectedRoomId, setSelectedRoomId] = React.useState<string | null>(
    null,
  );

  // const router = useRouter();
  const params = useSearchParams();
  // const start_date = params.get('start_date');
  // const end_date = params.get('end_date');

  React.useEffect(() => {
    const fetchProperties = async () => {
      const response = await api.get(`/properti/${slug}`);
      const data = response.data.data as IProperties;
      setProperti(data);
    };
    fetchProperties();
  }, [slug]);

  const sortedRooms = React.useMemo(() => {
    if (!properties) return [];
    const roomsCopy = [...properties.rooms];
    roomsCopy.sort((a, b) => {
      if (sortOption.field === 'name') {
        return sortOption.order === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortOption.field === 'price') {
        return sortOption.order === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      }
      return 0;
    });
    return roomsCopy;
  }, [properties, sortOption]);

  const handleSortChange = (field: string, order: string) => {
    setSortOption({ field, order });
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="top">
        <div className="breadcrumbs">
          <ul className="flex items-center space-x-2">
            <li className="flex items-center">
              <Link href="/" className="text-blue-500">
                Home
              </Link>
              <span className="mx-1">{'>'}</span>
              <Link href="/" className="text-black">
                Properti
              </Link>
              <span className="mx-1">{'>'}</span>
              <label className="text-black">{properties?.name}</label>
            </li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 py-4">
          <div className="bg-white p-4 rounded-lg shadow-sm md:w-2/3">
            <Image
              src={
                properties?.image?.includes('http')
                  ? properties?.image
                  : `${process.env.NEXT_PUBLIC_PROPERTY_IMAGE}${properties?.image}`
              }
              alt={properties?.image ?? ''}
              width={280}
              height={250}
              className="rounded-lg object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">{properties?.name}</h3>
            <p className="text-gray-700">{properties?.description}</p>
            <div className="mt-2">
              <FaMapMarker className="inline-block mr-2" />
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${properties?.address?.lat},${properties?.address?.lng}`}
                className="text-blue-500"
                target="_blank"
              >
                {properties?.address?.detail},{' '}
                {properties?.address?.district.name}
              </Link>
            </div>
          </div>

          <div className="md:w-2/3">
            {properties?.address && (
              <MapLocation
                lat={properties.address.lat}
                lng={properties.address.lng}
              />
            )}
          </div>
        </div>

        <div className="flex mt-6">
          <div className="w-full lg:w-1/3 p-4 bg-gray-50 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Sort by</h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">property list</label>
              <select
                title="select properti list"
                className="p-2 border rounded-lg w-full"
                value={`${sortOption.field}-${sortOption.order}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  handleSortChange(field, order);
                }}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-des">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-des">Price (High to Low)</option>
              </select>
            </div>
          </div>

          <div className="w-full lg:w-2/3 p-4">
            <h2 className="text-2xl font-bold mb-4">Pilih Room</h2>
            <div className="space-y-6">
              {sortedRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-start border rounded-lg shadow-lg "
                >
                  <Image
                    src={
                      room.image?.includes('http')
                        ? room.image
                        : `${process.env.NEXT_PUBLIC_ROOM_IMAGE}${room.image}`
                    }
                    alt={room.name}
                    width={280}
                    height={250}
                    className="rounded-lg object-cover"
                  />
                  <div className=" flex-grow flex px-2 py-2 flex-col justify-between">
                    <div className="flex justify-between xitems-start">
                      <h3 className="text-lg mx-auto font-bold">{room.name}</h3>
                      <p className="text-xl px-2 font-bold text-black">
                        Rp {room.price.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/room/${room.id}`}
                      className="bg-[#7AB2D3] text-white py-1 px-3 rounded-lg mt-2 self-end text-sm"
                    >
                      Select Room
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProppertiDetail;
