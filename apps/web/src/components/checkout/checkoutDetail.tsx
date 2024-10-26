import { OrderDetail } from '@/interfaces/order.interface'
import { formatStyledDate } from '@/lib/utils'
import React from 'react'

type Props = {order: OrderDetail}

export default function checkoutDetail({order}: Props) {
  return (
    <div>    <section className="mb-6">
    <h3 className="text-lg font-medium mb-2">Ringkasan Pesananmu</h3>
    <div className="flex justify-between text-gray-600">
      <p>Tanggal</p>
      <p className="underline">{formatStyledDate(order.startDate)} {formatStyledDate(order.endDate)}</p>
    </div>
    <div className="flex justify-between text-gray-600">
      <p>Pemesan</p>
      <p className="underline">1 guest</p>
    </div>
  </section></div>
  )
}