'use client';
import { api } from '@/config/axios.config';
import { OrderDetail, TransactionItems } from '@/interfaces/order.interface';
import { dateDiff, formatStyledDate } from '@/lib/utils';
import { User } from 'next-auth';
import React from 'react';

type Props = { data?: OrderDetail | null; user?: User | null };

export default function CheckoutMethod({ data }: Props) {
  const [order, setOrder] = React.useState<OrderDetail | null>(null);
  React.useEffect(() => {
    if (data) {
      setOrder(data);
    }
  });
  // } else {
  //   const fetchOrder = async () => {
  //     const response = await api.get(`/order/${order?.invoice_number}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //       },
  //     });
  //     setOrder(response.data.data);
  //   };
  //   fetchOrder();
  // }

  const [paymentMethod, setPaymentMethod] = React.useState<string | null>(null);

  return (
    <div className="flex gap-6">
      {/* Left Column - Payment Options */}
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-semibold text-lg mb-4">Metode Pembayaran</h2>
        <form>
          <div className="form-control">
            <label className="cursor-pointer label">
              <input
                type="radio"
                name="payment"
                className="radio"
                onChange={() => setPaymentMethod('manual')}
                checked={paymentMethod === 'manual'}
              />
              <span className="label-text">Manual transfer</span>
            </label>
          </div>

          <div className="form-control">
            <label className="cursor-pointer label">
              <input
                type="radio"
                name="payment"
                className="radio"
                onChange={() => setPaymentMethod('midtrans')}
                checked={paymentMethod === 'midtrans'}
              />
              <span className="label-text">Midtrans</span>
            </label>
          </div>

          <div className="form-control">
            <label className="cursor-pointer label">
              <input
                type="radio"
                name="payment"
                className="radio"
                onChange={() => setPaymentMethod('doku')}
                checked={paymentMethod === 'doku'}
              />
              <span className="label-text">Dokus</span>
            </label>
          </div>
        </form>
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
              1 Kamar •{' '}
              {formatStyledDate(order?.startDate ?? new Date().toString())} •{' '}
              {dateDiff(
                order?.startDate ?? new Date().toString(),
                order?.endDate ?? new Date().toString(),
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
