import React from 'react';
import { Order } from '@/interfaces/order.interface';
import Link from 'next/link';
import { FaEllipsisV } from 'react-icons/fa';
import { dateDiff, formatStyledDate } from '@/lib/utils';
import CancelOrderUser from '../modal/cancelOrderUser';
import CountdownTimer from '../countdownTimer';
import UploadPayementProofModal from '../modal/uploadPaymentProof';
import ModalVerifyProofComponent from '../modal/verifyPaymentProof';

interface Props extends Order {
  user_role: string;
  token: string;
}

export default function OrderCardComponent({
  name,
  category,
  description,
  startDate,
  endDate,
  status,
  image,
  invoice_number,
  payment_expire,
  payment_method,
  user_role,
  token,
}: Props) {
  // console.log(payment_method, user_role, status);
  const isTestReview = true;
  return (
    <div className="card w-full bg-[#AA77FF] dark:bg-[#535C91] shadow-md">
      {/* <figure>
        {image ? (
          <img
            src={
              image?.startsWith('http')
                ? image
                : `${process.env.NEXT_PUBLIC_PROPERTY_IMAGE}${image}`
            }
            alt="image"
            className="rounded-xl w-24"
          />
        ) : (
          <Image
            src={'/default-hotel.jpg'}
            alt="image"
            width={100}
            height={100}
            className="rounded-xl w-24"
          />
        )}
      </figure> */}

      <div className="card-body">
        <div className="card-actions justify-end">
          {status === 'waitingpayment' && payment_expire && (
            <CountdownTimer targetDate={payment_expire ?? new Date()} />
          )}
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              title="Lihat menu tambahan "
              tabIndex={0}
              role="button"
              className="m-1"
            >
              <FaEllipsisV />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {status === 'waitingpayment' && user_role === 'user' && (
                <>
                  <li>
                    <CancelOrderUser
                      id={`CancelOrder${invoice_number}`}
                      invoice_number={invoice_number ?? ''}
                      token={token}
                    />
                  </li>
                  <li>
                    <UploadPayementProofModal
                      id={`UploadProof${invoice_number}`}
                      invoice_number={invoice_number ?? ''}
                      token={token}
                    />
                  </li>
                </>
              )}
              {status === 'waitingpayment' && user_role === 'tenant' && (
                <li>
                  <ModalVerifyProofComponent
                    id={`VerifyOrder${invoice_number}`}
                    invoice_number={invoice_number ?? ''}
                    image={payment_method}
                    token={token}
                  />
                </li>
              )}
              <li>
                <Link
                  href={
                    user_role === 'tenant'
                      ? `/dashboard/pesanan/${invoice_number}`
                      : `/pesanan/${invoice_number}`
                  }
                  className="hover:text-secondary text-primary"
                >
                  Lihat detail
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <div className="hidden lg:block">
            <span
              className={`badge ${status === 'completed' ? 'badge-success' : 'badge-warning'}`}
            >
              {status === 'waitingpayment' ? 'Menunggu bayar' : status}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex flex-row items-start">
              <span className="text-white badge badge-info">{category}</span>
              <h2 className="card-title">{name} </h2>
            </div>
            <div className="flex flex-row items-start">
              <p className="text-sm">{description} </p>
              <p className="text-sm">
                {formatStyledDate(startDate)}{' '}
                <span className="text-info">
                  {dateDiff(startDate, endDate)}
                </span>
              </p>
            </div>
          </div>
          <div className="block lg:hidden">
            <span
              className={`badge ${status === 'completed' ? 'badge-success' : 'badge-warning'}`}
            >
              {status === 'waitingpayment' ? 'Menunggu bayar' : status}
            </span>
          </div>
        </div>
        {user_role === 'user' &&
          (new Date() > new Date(startDate) || isTestReview) && (
            <div className="card-actions justify-end">
              <button
                title="Tambah komentar"
                type="button"
                className="text-sm text-info"
              >
                Review anda
              </button>
            </div>
          )}
        {user_role === 'tenant' && (
          <div className="card-actions justify-end divider">
            <button
              title="Balas komentar"
              type="button"
              className="text-sm text-info"
            >
              Balas komentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
