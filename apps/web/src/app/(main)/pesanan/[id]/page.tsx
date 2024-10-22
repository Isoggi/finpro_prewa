import OrderDetailComponent from '@/components/order/orderDetail';
import { api } from '@/config/axios.config';
import React from 'react';

type Props = { params: { id: string } };

export default async function page({ params }: Props) {
  return (
    <div>
      <OrderDetailComponent id={Number(params.id)} />
    </div>
  );
}
