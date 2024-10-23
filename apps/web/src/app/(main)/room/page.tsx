import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/config/axios.config';
import { IRooms } from '@/interfaces/property.interface';
import Footer from '@/components/footer';
import { FaWifi, FaParking, FaClock, FaSwimmingPool, FaUsers } from 'react-icons/fa';

type RoomDetailPageProps = {
  room: IRooms;
};

const RoomDetailPage: React.FC<RoomDetailPageProps> = ({ room }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto max-w-screen-xl py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-500 hover:underline">
              Home
            </Link>
            <span>{'>'}</span>
            <Link href="/properties" className="text-blue-500 hover:underline">
              Properties
            </Link>
            <span>{'>'}</span>
            <span className="text-gray-600">{room.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-screen-xl py-8">
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2 md:row-span-2">
            <Image
              src={room.image || '/default-room.jpg'}
              alt={room.name}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative">
              <Image
                src={room.image || '/default-room.jpg'}
                alt={`Room view ${i}`}
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          ))}
          <button className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-100 transition-opacity">
            Lihat Semua Foto
          </button>
        </div>
        </div>
        </div>