import React from 'react';
import { Order } from '@/interfaces/order.interface';
import Image from 'next/image';
import Link from 'next/link';
import { FaEllipsisV } from 'react-icons/fa';
import { dateDiff, formatStyledDate } from '@/lib/utils';
import CancelOrderUser from '../modal/cancelOrderUser';

interface Props extends Order {
  user_role: string;
  token: string;
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
  invoice_number,
  user_role,
  token,
}: Props) {
  // console.log(payment_method, user_role, status);

  return (
    <div className="card lg:card-side w-full bg-base-300 shadow-md">
      <figure>
        {image ? (
          <img
            src={
              image?.startsWith('http')
                ? image
                : `${process.env.NEXT_PUBLIC_PROPERTY_IMAGE}${image}`
            }
            alt="image"
            className="max-w-none h-auto"
          />
        ) : (
          <Image
            src={'/default-hotel.jpg'}
            alt="image"
            width={100}
            height={100}
            className="max-w-none h-auto"
          />
        )}
      </figure>

      <div className="card-body">
        <div className="card-actions justify-end">
          <div className="dropdown dropdown-bottom dropdown-end">
            <div title="cek detail" tabIndex={0} role="button" className="m-1">
              <FaEllipsisV />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {status === 'waitingpayment' && (
                <li>
                  <CancelOrderUser
                    id={'cancel_order_user'}
                    invoice_number={invoice_number ?? ''}
                    token={token}
                  />
                  <a className="text-red-500">Batalkan pesanan</a>
                </li>
              )}
              <li>
                <Link
                  href={
                    user_role === 'tenant'
                      ? `/dashboard/pesanan/${id}`
                      : `/pesanan/${id}`
                  }
                  className="hover:text-secondary text-primary"
                >
                  Lihat detail
                </Link>
              </li>
            </ul>
          </div>{' '}
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex flex-col items-left">
            <span className="text-white badge badge-info">{category}</span>
            <div>
              <h2 className="card-title">{name}</h2>
              <span
                className={`badge ${status === 'completed' ? 'badge-success' : 'badge-warning'}`}
              >
                {status}
              </span>
            </div>

            <p className="text-sm">{description}</p>
            <p className="text-sm">
              {formatStyledDate(startDate)}{' '}
              <span className="text-info">{dateDiff(startDate, endDate)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
