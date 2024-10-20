import OrderDetailComponent from '@/components/order/orderDetail';
import React from 'react';

type Props = { params: { id: number } };

export default async function OrderDetailTenantPage({ params }: Props) {
  return (
    <div>
      <OrderDetailComponent id={params.id} />
    </div>
  );
}
