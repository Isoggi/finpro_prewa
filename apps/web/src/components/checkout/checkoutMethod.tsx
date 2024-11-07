'use client';
import { api } from '@/config/axios.config';
import { OrderDetail, TransactionItems } from '@/interfaces/order.interface';
import { dateDiff, formatStyledDate, showAlert } from '@/lib/utils';
import { User } from 'next-auth';
import React from 'react';
import CheckoutDetail from './checkoutDetail';
import { useRouter } from 'next/navigation';
import CountdownTimer from '../countdownTimer';

type Props = { data?: OrderDetail | null; user?: User | null };

export default function CheckoutMethod({ data }: Props) {
  const router = useRouter();
  const order = data;
  const [expired, setExpired] = React.useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = React.useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = await api.patch(
        `/order/update`,
        {
          invoice_number: order?.invoice_number,
          payment_method: order?.payment_method,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      );
      showAlert({
        title: 'Berhasil',
        text: 'Pembayaran Berhasil',
        icon: 'success',
      });
      // (response.data.data);
      router.push('/pesanan');
    } catch (error) {
      showAlert({
        title: 'Gagal',
        text: 'Ada masalah padad pembayaran',
        icon: 'error',
      });
    }
  };
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column - Payment Options */}
      <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
        <CountdownTimer
          targetDate={
            order?.payment_expire ??
            new Date(new Date().setTime(new Date().getTime() + 60 * 60 * 1000))
          }
          onExpired={() => setExpired(true)}
        />

        {order && <CheckoutDetail order={order} />}
        <h2 className="font-semibold text-lg mb-4">Metode Pembayaran</h2>
        <form onSubmit={handleSubmit}>
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
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
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
          type="submit"
          className="btn btn-primary w-full mt-6"
          disabled={!paymentMethod && expired}
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
}
