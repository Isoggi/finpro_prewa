import OrderDetailComponent from '@/components/order/orderDetail';
import { api } from '@/config/axios.config';
import React from 'react';

type Props = { params: { id: string } };

export default async function page({ params }: Props) {
  const response = await api.get(`/api/tenant//transaction/${params.id}`);
  const { data } = response.data.data;
  return (
    <div>
      <OrderDetailComponent data={data} />
    </div>
  );
}
