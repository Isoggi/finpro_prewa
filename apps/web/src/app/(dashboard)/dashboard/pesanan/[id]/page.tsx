import OrderDetailComponent from '@/components/order/orderDetail';
import  getServerSession  from 'next-auth';
import { signIn, signOut, handlers, auth, unstable_update } from '@/auth';
import { api } from '@/config/axios.config';
import React from 'react';

type Props = { params: { id: string } };

export default async function OrderDetailTenantPage({ params }: Props) {
    
  const response = await api.get(`/tenant/transaction/${params.id}`, {headers: {Authorization: `Bearer ${}`}});
  const { data } = response.data.data;
  return (
    <div>
      <OrderDetailComponent data={data} />
    </div>
  );
}
