'use client';
import Link from 'next/link';
import React from 'react';
import { IProperties } from '@/interfaces/property.interface';
import { api } from '@/config/axios.config';
import { FaMapMarker } from 'react-icons/fa';
import Image from 'next/image';
import Footer from '@/components/footer';
import { MdApartment, MdVilla } from 'react-icons/md';
import { FaWifi, FaBed, FaWind, FaConciergeBell } from 'react-icons/fa';
import { MdFreeBreakfast, MdShower } from 'react-icons/md';
import { CgSortAz } from 'react-icons/cg';
import MapLocation from './maplocation';
import Loading from '@/app/loading';
type Props = {
  slug: string;
};

const ProppertiDetail = ({ slug }: Props) => {
  const [properties, setProperti] = React.useState<IProperties | null>(null);
  const [sortOption, setSortOption] = React.useState({
    field: 'name',
    order: 'asc',
  });

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
    const sortModal = document.getElementById(
      'sort_modal',
    ) as HTMLDialogElement | null;
    sortModal?.close();
  };

  const showSortModal = () => {
    const sortModal = document.getElementById(
      'sort_modal',
    ) as HTMLDialogElement | null;
    sortModal?.showModal();
  };
  if (!properties)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div className="container mx-auto px-4 max-w-screen-xl">
      <div className="top">
        <div className="flex flex-col md:flex-row md:space-x-4 py-4">
          <div className=" md:w-2/3">
            <Image
              src={
                properties?.image
                  ? properties?.image?.includes('http')
                    ? properties?.image
                    : `${process.env.NEXT_PUBLIC_PROPERTY_IMAGE}${properties?.image}`
                  : '/default-hotel.jpg'
              }
              alt={properties?.name ?? ''}
              width={500}
              height={300}
              className="rounded-lg object-cover  h-auto"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm w-full md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">
              <MdApartment className="inline-block mr-2" />
              {properties?.name}
            </h3>
            <div>
              <FaMapMarker className="inline-block mr-2" />
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${properties?.address?.lat},${properties?.address?.lng}`}
                className="text-blue-500"
                target="_blank"
              >
                {properties?.address?.provinces.name},{' '}
                {properties?.address?.district.name}
              </Link>
              <p className="text-gray-700 ">
                <MdVilla className="inline-block mr-1" />
                {properties?.category.name}
              </p>
              <p className="pt-2">Deskripsi Properti</p>
              <div className="border border-gray-300 rounded-md p-2 mt-1">
                <p className="text-gray-700 mb-4 ">{properties?.description}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={showSortModal}
          className="mt-6 w-full md:w-auto p-2 bg-white text-blue-500 rounded-full text-sm font-semibold flex items-center justify-center space-x-1 border border-blue-500"
        >
          <CgSortAz className="text-3xl" />
          <span>Urutkan</span>
        </button>
        <dialog id="sort_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Sort by</h3>
            <div className="grid gap-2">
              <button
                onClick={() => handleSortChange('name', 'asc')}
                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
              >
                Name (A-Z)
              </button>
              <button
                onClick={() => handleSortChange('name', 'des')}
                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
              >
                Name (Z-A)
              </button>
              <button
                onClick={() => handleSortChange('price', 'asc')}
                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
              >
                Price (Low to High)
              </button>
              <button
                onClick={() => handleSortChange('price', 'des')}
                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
              >
                Price (High to Low)
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>
        <div className="flex flex-col md:flex-row mt-6 w-full max-w-screen-xl mx-auto py-6">
          <div className="w-full pr-4 md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Select Room</h2>
            <div className="space-y-6">
              {sortedRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex flex-col sm:flex-row items-center border rounded-lg shadow-lg p-4"
                >
                  <Image
                    src={
                      room.image
                        ? room.image?.includes('http')
                          ? room.image
                          : `${process.env.NEXT_PUBLIC_ROOM_IMAGE}${room.image}`
                        : '/default-hotel.jpg'
                    }
                    alt={room.name}
                    width={300}
                    height={330}
                    className="rounded-lg object-cover w-full sm:w-1/3"
                  />
                  <div className="flex-grow mt-4 sm:mt-0 sm:ml-10 py-2 w-full sm:w-auto">
                    <h3 className="text-lg font-bold mb-2">{room.name}</h3>
                    <div className="flex flex-wrap items-center space-x-2 text-gray-600 mb-2">
                      <FaWifi /> <span>Wifi</span>
                      <FaBed /> <span>Double bed</span>
                      <MdShower /> <span>Shower</span>
                      <FaWind /> <span>AC</span>
                    </div>
                    <p className="text-xl font-bold text-black py-4">
                      Rp {room.price.toLocaleString()}/malam
                    </p>
                    <Link
                      href={`/room/${room.slug}`}
                      className="bg-[#62CDFF] text-white py-2 px-4 rounded-lg font-medium"
                    >
                      Pilih
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/3 mt-6 md:mt-0">
            {properties?.address && (
              <MapLocation
                lat={properties.address.lat}
                lng={properties.address.lng}
                className="h-full w-full"
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProppertiDetail;
