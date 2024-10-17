'use client';
import { useEffect, useState } from 'react';
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
  const searchParams = useSearchParams();
  const session = useSession();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (user) return;
    if (session.data?.user) setUser(session.data?.user);
  }, [session]);
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

      // Update bookings state
      setBookings(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  };

  // Effect to trigger fetch after input changes
  useEffect(() => {
    // Clear the previous timeout if it's set
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to delay the API call
    const timeoutId = setTimeout(() => {
      fetchBookings(orderNumber, startDate, endDate);
    }, 500); // Delay of 500ms

    // Save the timeout ID to the state
    setDebounceTimeout(timeoutId);

    // Cleanup the timeout if the component is unmounted or inputs change before 500ms
    return () => {
      clearTimeout(timeoutId);
    };
  }, [orderNumber, startDate, endDate, user]); // Re-run effect when these dependencies change

  return (
    <>
      {/* Filter and Sort */}
      <div className="flex flex-col lg:flex-row space-x-4 my-4">
        {/* Order Number Input */}
        <input
          type="text"
          title="Order Number"
          placeholder="Order No."
          className="input input-bordered w-full max-w-xs"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)} // Update order number state
        />

        {/* Start Date Picker */}
        <input
          type="date"
          title="Start Date"
          placeholder="Tanggal Mulai"
          className="input input-bordered"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)} // Update start date
        />

        {/* End Date Picker */}
        <input
          type="date"
          title="End Date"
          placeholder="Tanggal Selesai"
          className="input input-bordered"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)} // Update end date
        />
      </div>

      {/* Booking History Cards */}
      <div className="space-y-4 my-4">
        {bookings ? (
          bookings.length ? (
            bookings.map((order, index) => (
              <OrderCardComponent
                key={index}
                name={order.name}
                category={order.category}
                description={order.description}
                startDate={order.startDate}
                endDate={order.endDate}
                status={order.status}
                image={order.image}
                payment_type={order.payment_type}
                user_role={user?.user_role as string}
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
