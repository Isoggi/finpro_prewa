'use client';
import { useEffect, useState } from 'react';
import OrderCardComponent from './orderCard';
import { Order } from '@/interfaces/order.interface';
import { api } from '@/config/axios.config';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';

type Props = { url?: string };

export default function OrderContainerComponent({ url }: Props) {
  const [orderNumber, setOrderNumber] = useState<string>(''); // Order number filter
  const [startDate, setStartDate] = useState<string>(''); // Start date filter
  const [endDate, setEndDate] = useState<string>(''); // End date filter
  const [bookings, setBookings] = useState<Order[]>([]); // Filtered booking results
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  ); // Timeout ID for debounce
  const session = useSession();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (session.data?.user) setUser(session.data?.user);
  }, [session]);

  // Function to fetch bookings from API
  const fetchBookings = async (
    orderNumber: string,
    startDate: string,
    endDate: string,
  ) => {
    try {
      console.log(url, session.data?.user);
      // Example API call, replace with your API URL
      const response = await api.get(`${url ? url : '/order'}`, {
        params: {
          orderNumber,
          startDate,
          endDate,
        },
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      const data = await response.data.data;

      // Update bookings state
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  };

  // Effect to trigger fetch after input changes
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      fetchBookings(orderNumber, startDate, endDate);
    }, 500); // Delay of 500ms

    setDebounceTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [orderNumber, startDate, endDate]);

  return (
    <>
      {/* Filter and Sort */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 my-4">
        {/* Order Number Input */}
        <input
          type="text"
          title="Order Number"
          placeholder="Order No."
          className="input input-bordered w-full md:max-w-xs"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />

        {/* Start Date Picker */}
        <input
          type="date"
          title="Start Date"
          placeholder="Tanggal Mulai"
          className="input input-bordered w-full md:max-w-xs"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        {/* End Date Picker */}
        <input
          type="date"
          title="End Date"
          placeholder="Tanggal Selesai"
          className="input input-bordered w-full md:max-w-xs"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Booking History Cards */}
      <div className="space-y-4">
        {bookings.length ? (
          bookings.map((order, index) => (
            <OrderCardComponent
              key={index}
              name={order.name}
              category={order.category}
              description={order.description}
              startDate={order.startDate}
              endDate={order.endDate}
              status={order.status}
            />
          ))
        ) : (
          <p className="text-center w-full">No data</p>
        )}
      </div>
    </>
  );
}
