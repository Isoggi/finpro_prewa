'use client';
import React from 'react';
import CheckoutMethod from './checkoutMethod';
import { useSearchParams } from 'next/navigation';
import { api } from '@/config/axios.config';
import { OrderDetail } from '@/interfaces/order.interface';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

type Props = {};

export default function CheckoutContainer({}: Props) {
  const session = useSession();
  const [user, setUser] = React.useState<User | null>(null);
  const [order, setOrder] = React.useState<OrderDetail | null>(null);
  const params = useSearchParams();

  React.useEffect(() => {
    if (user) return;
    if (session?.data?.user) setUser(session.data.user);
  }, [session]);
  React.useEffect(() => {
    const fetchOrder = async () => {
      const response = await api.get(`/order/${params.get('inv')}`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrcmlzdGFudG9zYXB0YWRpQGdtYWlsLmNvbSIsIm5hbWUiOiJLcmlzdGFudG8iLCJwaG9uZV9udW1iZXIiOiIwODExMjIyMjMzMzMiLCJpbWFnZSI6bnVsbCwicm9sZSI6InVzZXIiLCJpc1ZlcmlmaWVkIjp0cnVlLCJ1c2VyX3JvbGUiOiJ1c2VyIiwiaWF0IjoxNzI5NzU4NDc3LCJleHAiOjE3Mjk3NjkyNzd9.-0X5JoPG7zuRH_fDNjtDbcudGft3ftRQ7gDsLP_ips4`,
        },
      });
      setOrder(response.data.data);
    };
    fetchOrder();
  }, []);
  return <div>{order && <CheckoutMethod data={order} />}</div>;
}
