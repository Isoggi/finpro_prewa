import React from 'react';
import ModalComponent from '../modal';
import { Order } from '@/interfaces/order.interface';
import Image from 'next/image';
import Link from 'next/link';

interface Props extends Order {
  user_role: string;
}

export default function OrderCardComponent({
  id,
  name,
  category,
  description,
  startDate,
  endDate,
  status,
  image,
  payment_method,
  user_role,
}: Props) {
  // console.log(payment_method, user_role, status);

  return (
    <div className="card lg:card-side w-full bg-base-100 shadow-md">
      <figure>
        {image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_PROPERTY_IMAGE}${image}`}
            alt="image"
            className="w-12 h-12 object-cover"
          />
        ) : (
          <Image
            src={'/default-hotel.jpg'}
            alt="image"
            width={100}
            height={100}
            className="w-12 h-12 object-cover"
          />
        )}
      </figure>
      <div className="card-body">
        <div className="card-actions justify-end">
          <Link href={`/dashboard/pesanan/${id}`}>Detail {'>'}</Link>
        </div>
      </div>
      <div className="card-body">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex flex-col lg:flex-row items-center">
            <div>
              <div className="flex flex-col lg:flex-row">
                <span className="text-white badge badge-info">{category}</span>
                <h2 className="card-title">{name}</h2>
              </div>

              <p className="text-sm">{description}</p>
              <p className="text-sm text-gray-500">
                {startDate} - {endDate}
              </p>
            </div>
          </div>
          <div>
            <span
              className={`badge ${status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}
            >
              {status}
            </span>
          </div>
        </div>
        {user_role === 'user' &&
          status === 'pending' &&
          payment_method === 'manual' && (
            <ModalComponent
              id="upload_proof_modal"
              btnTitle="Bukti Bayar"
              modalTitle="Bukti Bayar"
              modalDesc="Silahkan unggah hasil pembayaran anda ke dalam aplikasi"
            />
          )}
      </div>
    </div>
  );
}
