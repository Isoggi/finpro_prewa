import { OrderDetail } from '@/interfaces/order.interface';
import { formatStyledDate } from '@/lib/utils';
import React from 'react';

type Props = { order: OrderDetail };

export default function checkoutDetail({ order }: Props) {
  console.log(order);
  const normalPrice = order.amount;
  const ratedPrice = order.transactionItems?.length
    ? order.transactionItems[0].room.peak_season_rate
      ? order.transactionItems[0].room.peak_season_rate[0].price + order.amount
      : order.amount
    : order.amount;
  const isSamePrice = normalPrice === ratedPrice;
  return (
    <div>
      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">Ringkasan Pesananmu</h3>
        <div className="flex justify-between text-gray-600">
          <p>Tanggal</p>
          <p className="underline">
            {formatStyledDate(
              order.transactionItems
                ? order.transactionItems[0].start_date
                : '',
            )}
            {' - '}
            {formatStyledDate(
              order.transactionItems ? order.transactionItems[0].end_date : '',
            )}
          </p>
        </div>
        <div className="flex justify-between text-gray-600">
          <p>Harga</p>
          <p className="underline">
            {isSamePrice ? `${normalPrice}` : `${ratedPrice}`}
          </p>
        </div>
        <div className="flex justify-between text-gray-600">
          <p>Pemesan</p>
          <p className="underline">1 tamu</p>
        </div>
      </section>
    </div>
  );
}
