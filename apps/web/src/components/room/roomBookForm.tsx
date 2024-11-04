'use client';
import { showAlert } from '@/lib/utils';
import React from 'react';
import DateRangePicker from '../DatePickerRange';
import { api } from '@/config/axios.config';
import { IRooms } from '@/interfaces/room.interface';
import { User } from 'next-auth';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { properties_src } from '@/config/images.config';
import { useRouter } from 'next/navigation';
import { differenceInDays } from 'date-fns';

type Props = { room: IRooms };

export default function RoomBookForm({ room }: Props) {
  console.log(room);
  const session = useSession();
  const user: User | null = React.useMemo(() => {
    if (session.data?.user) {
      return session.data.user;
    }
    return null;
  }, [session]);

  const router = useRouter();

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const handleDate = (formStartDate: Date | null, formEndDate: Date | null) => {
    console.log(formStartDate, formEndDate);
    setStartDate(formStartDate);
    setEndDate(formEndDate);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('room book ', startDate, endDate, user?.access_token);
      const response = await api.post(
        '/order/create',
        { room_id: room.id, start_date: startDate, end_date: endDate },
        { headers: { Authorization: `Bearer ${user?.access_token}` } },
      );

      console.log(response.data.data);
      router.push(`/periksa?inv=${response.data.data}`);
      showAlert({
        title: 'Berhasil booking!',
        text: 'Tunggu kami arahkan ke halaman pembayaran...',
        icon: 'success',
      });
    } catch (error) {
      console.log(error);
      showAlert({
        title: 'Gagal!',
        text: 'Sepertinya ada masalah',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DateRangePicker name={'bookingDate'} onDateChange={handleDate} />
        <div className="divider"></div>
        <div className="mb-6">
          <Image
            src={
              room.image
                ? room.image?.startsWith('http')
                  ? room.image
                  : `${properties_src}}${room.image}`
                : '/default-hotel.jpg'
            }
            alt="Tempat"
            className="rounded-lg"
            height={100}
            width={100}
          />
          <p className="text-gray-600 mt-4">
            {room.name}: {room.property?.name}
          </p>
        </div>
        <div className="text-gray-600 mb-4">
          <p>
            Rp{room.price.toLocaleString('id-ID')} x{' '}
            {differenceInDays(endDate ?? new Date(), startDate ?? new Date())}{' '}
            hari
          </p>
          <p>
            Rp
            {(
              room.price *
              differenceInDays(endDate ?? new Date(), startDate ?? new Date())
            ).toLocaleString('id-ID')}
          </p>
        </div>
        {room.peakSeasonRate && (
          <div className="text-gray-600 mb-4">
            <p>Biaya Musim Puncak</p>
            <p>Rp {room.peakSeasonRate[0].rates.toLocaleString('id-ID')}</p>
          </div>
        )}
        <hr />
        <div className="text-lg font-semibold flex justify-between mt-4">
          <p>Total (IDR)</p>
          <p>
            Rp{' '}
            {((room.peakSeasonRate ? room.peakSeasonRate[0].rates : 0) +
              room.price) *
              differenceInDays(endDate ?? new Date(), startDate ?? new Date())}
          </p>
        </div>
        <button
          type="submit"
          title="booking"
          disabled={!user || (!startDate && !endDate)}
          className="btn btn-primary text-black dark:text-white disabled:text-gray-900"
        >
          {user ? 'Pesan sekarang' : 'Masuk untuk memesan'}
        </button>
      </form>
    </div>
  );
}
