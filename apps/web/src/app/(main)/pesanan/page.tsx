import OrderContainerComponent from '@/components/order/orderContainer';
import { api } from '@/config/axios.config';
import React from 'react';

type Props = { data: any };

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await api.get('/transactions');
  // Pass data to the page via props
  return { props: { data: res.data.data } };
}

export default function OrderPage({ data }: Props) {
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Riwayat</h1>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <a className="tab tab-bordered tab-active">Pesanan Lama</a>
        </div>
        {<OrderContainerComponent data={data} />}
      </div>
    </div>
  );
}
