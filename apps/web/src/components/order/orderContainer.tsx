'use client';
import { useEffect, useState, useMemo } from 'react';
import OrderCardComponent from './orderCard';
import { Order } from '@/interfaces/order.interface';
import { api } from '@/config/axios.config';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import NavbarPaginationComponent from '../pagination/navbar';
import OrderCardLoader from './orderCardLoader';
import { useSearchParams } from 'next/navigation';

type Props = { url?: string };

export default function OrderContainerComponent({ url }: Props) {
  const [orderNumber, setOrderNumber] = useState<string>(''); // Order number filter
  const [startDate, setStartDate] = useState<string>(''); // Start date filter
  const [endDate, setEndDate] = useState<string>(''); // End date filter
  const [bookings, setBookings] = useState<Order[] | null>(null); // Filtered booking results
  const [totalPages, setTotalPages] = useState(0);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  ); // Timeout ID for debounce

  const { data: session } = useSession();
  const user: User | null = useMemo(() => {
    if (session?.user) {
      return session.user;
    }
    return null;
  }, [session]);

  const searchParams = useSearchParams();

  useEffect(() => {
    setEndDate(searchParams.get('endDate') ?? '');
    setStartDate(searchParams.get('startDate') ?? '');
    setOrderNumber(searchParams.get('orderNumber') ?? '');
  }, []);

  // const page = searchParams.get('page') ? searchParams.get('page') : 1;
  // const size = searchParams.get('size') ? searchParams.get('size') : 8;

  // Function to fetch bookings from API
  const fetchBookings = async (
    orderNumber?: string,
    startDate?: string,
    endDate?: string,
    page = 1,
    size = 8,
    userData = user,
  ) => {
    try {
      console.log(url, userData);
      setBookings(null);
      const response = await api.get(`${url ? url : '/order'}`, {
        params: {
          orderNumber,
          startDate,
          endDate,
          page,
          size,
        },
        headers: {
          Authorization: `Bearer ${userData?.access_token}`,
        },
      });
      const data = await response.data.data;
      console.log(data.data);
      // Update bookings state
      setBookings(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  };

  // Effect to trigger fetch after input changes
  useEffect(() => {
    console.log('order start');
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      console.log('order fetch');
      fetchBookings(orderNumber, startDate, endDate);
    }, 500); // Delay of 500ms

    setDebounceTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [orderNumber, startDate, endDate, user]); // Re-run effect when these dependencies change

  return (
    <>
      {/* Filter and Sort */}
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center bg-white dark:bg-base-100 p-3 rounded-xl shadow-lg">
        {/* Order Number Input */}
        <div className="flex items-center border-b md:border-b-0 md:border-none pr-4 pb-2 md:pb-0">
          <input
            type="text"
            title="Order Number"
            placeholder="Order No."
            className="input input-bordered w-full md:max-w-xs"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </div>

        <div className="flex items-center border-b md:border-b-0 md:border-none pr-4 pb-2 md:pb-0">
          {/* Start Date Picker */}
          <input
            type="date"
            title="Start Date"
            placeholder="Tanggal Mulai"
            className="input input-bordered w-full md:max-w-xs"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        {/* End Date Picker */}
        <div className="flex items-center border-b md:border-b-0 md:border-none pr-4 pb-2 md:pb-0">
          <input
            type="date"
            title="End Date"
            placeholder="Tanggal Selesai"
            className="input input-bordered w-full md:max-w-xs"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Booking History Cards */}
      <div className="space-y-4 my-4">
        {bookings ? (
          bookings.length ? (
            bookings.map((order, index) => (
              <OrderCardComponent
                key={index}
                id={order.id}
                name={order.name}
                category={order.category}
                description={order.description}
                startDate={order.startDate}
                endDate={order.endDate}
                status={order.status}
                image={order.image}
                amount={order.amount}
                payment_method={order.payment_method}
                user_role={user?.user_role as string}
                token={user?.access_token as string}
              />
            ))
          ) : (
            <div className="flex justify-center items-center w-full">
              <p className="text-right ml-auto w-full">Tidak ada transaksi</p>
            </div>
          )
        ) : (
          <OrderCardLoader />
        )}
      </div>
      {bookings && (
        <NavbarPaginationComponent
          totalPages={totalPages}
          onPageChange={(page) =>
            fetchBookings(orderNumber, startDate, endDate, page)
          }
        />
      )}
    </>
  );
}
