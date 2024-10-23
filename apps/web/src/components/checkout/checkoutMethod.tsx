'use client';
import { api } from '@/config/axios.config';
import { OrderDetail, TransactionItems } from '@/interfaces/order.interface';
import { dateDiff, formatStyledDate } from '@/lib/utils';
import React from 'react';

type Props = {};

export default function CheckoutMethod({}: Props) {
  const [order, setOrder] = React.useState<OrderDetail | null>(null);
  const [paymentMethod, setPaymentMethod] = React.useState<string | null>(null);
  React.useEffect(() => {
    const fetchOrder = async () => {
      const response = await api.get(`/order/${order?.invoice_number}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setOrder(response.data.data);
    };
    fetchOrder();
  }, []);
  return (
    <div className="flex gap-6">
      {/* Left Column - Payment Options */}
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-semibold text-lg mb-4">Metode Pembayaran</h2>
      </div>
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-semibold text-lg mb-4">Ringkasan order</h2>
        <div className="text-sm">
          <div>
            <p className="font-semibold">Order ID:</p>
            <p>{order?.invoice_number}</p>
          </div>
          <div className="mt-4">
            <p className="font-semibold">
              {order?.transactionItems
                ? order.transactionItems[0].room.property?.name
                : ''}
            </p>
            <p>
              1 Kamar • {formatStyledDate(order?.startDate.toString() ?? '')} •{' '}
              {dateDiff(
                order?.startDate.toString() ?? '',
                order?.endDate.toString() ?? '',
              )}
            </p>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Total Pembayaran:</p>
            <p>{order?.amount}</p>
          </div>
        </div>

        <button
          className="btn btn-primary w-full mt-6"
          disabled={!paymentMethod}
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
}
