import OrderContainerComponent from '@/components/order/orderContainer';
import { api } from '@/config/axios.config';
import React from 'react';

export default async function OrderPage() {
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Riwayat</h1>
        </div>

        {/* Tabs */}
        {/* <div className="tabs">
          <a className="tab tab-bordered tab-active">Pesanan Lama</a>
        </div> */}
        {<OrderContainerComponent />}
      </div>
    </div>
  );
}
