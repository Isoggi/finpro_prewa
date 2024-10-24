import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { api } from '@/config/axios.config';
import { IRooms } from '@/interfaces/property.interface';
import Footer from '@/components/footer';

type RoomDetailPageProps = {
  room: IRooms;
};

const RoomDetailPage: React.FC<RoomDetailPageProps> = ({ room }) => {
  return (
    <div className="container mx-auto max-w-screen-xl py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
        <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
        <div className="flex flex-col md:flex-row">
          {/* Room Image */}
          <div className="md:w-1/2">
            <Image
              src={room.image || '/default-room.jpg'}
              alt={room.name}
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>

          {/* Room Details */}
          <div className="md:w-1/2 md:ml-6 mt-4 md:mt-0">
            <p className="text-lg text-gray-700 mb-4">{room.description}</p>
            <p className="text-lg font-semibold text-gray-700">
              Capacity:{' '}
              <span className="text-black">{room.capacity} people</span>
            </p>
            <p className="text-2xl font-bold text-black mt-4">
              Rp {room.price.toLocaleString()}
            </p>

            {/* Book Room Button */}
            <button className="mt-4 bg-[#7AB2D3] text-white py-2 px-4 rounded-lg">
              Book This Room
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoomDetailPage;

// Fetch room data based on the roomId from the URL
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { roomId } = context.params!;
  const response = await api.get(`/rooms/${roomId}`);
  const room = response.data.data as IRooms;

  return {
    props: {
      room,
    },
  };
};
