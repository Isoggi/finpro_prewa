'use client';
import { api } from '@/config/axios.config';
import { Order } from '@/interfaces/order.interface';
import { User } from 'next-auth';
import React from 'react';

interface Props {
  data: any;
}

export default function OrderDetailComponent({ data }: Props) {
  return (
    <div className="p-6 bg-base-100 shadow-lg rounded-lg w-full max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <span
            className={`badge ${data.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}
          >
            {data.status}
          </span>
          <p className="text-sm text-gray-500">{data.payment_method}</p>
        </div>
        <button className="btn btn-primary">Unggah Bukti Bayar</button>
      </div>
      <div className="divider"></div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            {data.transactionItems.room.property.name}
          </h2>
          <p className="text-sm text-gray-500">
            {data.transactionItems.room.property.address.name}
          </p>
        </div>
        <button className="btn btn-primary">Book Again</button>
      </div>

      <div className="divider"></div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg">Reservation Details</h3>
        <div className="mt-2">
          <p>
            <strong>Guest Name:</strong> {data.user.name}
          </p>
          <p>
            <strong>Room:</strong> {data.transactionItems.room.name}
          </p>
          <p>
            <strong>Check-in:</strong> {data.startDate}
          </p>
          <p>
            <strong>Check-out:</strong> {data.endDate}
          </p>
        </div>
      </div>

      {/* <div className="mb-4">
        <h3 className="font-semibold text-lg">Amenities</h3>
        <ul className="list-disc ml-5">
          {amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>

      {specialRequest && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg">Special Request</h3>
          <p>{specialRequest}</p>
        </div>
      )} */}

      <div className="divider"></div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg">Location</h3>
        <p>{data.address.detail}</p>
        {/* You can use Google Maps Embed here */}
      </div>

      <div className="divider"></div>

      <div className="text-right">
        <h3 className="font-semibold text-lg">Total Price</h3>
        <p className="text-2xl font-bold">{data.price}</p>
      </div>
    </div>
  );
}
