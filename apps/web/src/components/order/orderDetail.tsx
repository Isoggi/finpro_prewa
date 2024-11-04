'use client';
import { api } from '@/config/axios.config';
import { Order, OrderDetail } from '@/interfaces/order.interface';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';
import ModalVerifyProofComponent from '../modal/verifyPaymentProof';
import { formatStyledDate } from '@/lib/utils';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import UploadPayementProofModal from '../modal/uploadPaymentProof';

interface Props {
  id: number;
}

export default function OrderDetailComponent({ id }: Props) {
  const session = useSession();

  const [user, setUser] = React.useState<User | null>(null);
  const [data, setData] = React.useState<OrderDetail | null>(null);
  React.useEffect(() => {
    if (user) {
      return;
    }
    if (session.data?.user) setUser(session.data?.user);
  }, [session]);

  const fetchOrder = async (role?: string) => {
    const response = await api.get(
      role === 'user' ? `/order/${id}` : `/tenant/transaction/${id}`,
      {
        headers: { Authorization: `Bearer ${user?.access_token}` },
      },
    );
    console.log(response.data.data);
    setData(response.data.data as OrderDetail);
  };

  React.useEffect(() => {
    if (user) fetchOrder(user.user_role);
  }, [user]);

  return (
    data && (
      <div className="p-6 shadow-lg rounded-lg w-full max-w-3xl mx-auto">
        <Link
          href={user?.user_role === 'user' ? '/pesanan' : `/dashboard/pesanan`}
          className="hover:text-secondary text-primary"
        >
          <FaChevronLeft />
        </Link>
        <div className="divider"></div>

        <div className="card bg-base-200 w-full shadow-xl mb-4">
          <div className="card-body flex flex-col lg:flex-row justify-between items-center">
            <span
              className={`card-title badge badge-lg ${data.status === 'completed' ? 'badge-success' : 'badge-warning'}`}
            >
              {data.status}
            </span>
            <span>
              <p className="text-lg">Pembayaran</p>
              <p className="badge badge-info text-sm">
                {data.payment_method.toUpperCase()}
              </p>
            </span>

            {data.status === 'waitingapproval' &&
              (user?.user_role === 'tenant' ? (
                // <button
                //   type="button"
                //   title="Lihat Bukti Bayar"
                //   className="btn btn-primary"
                // >
                //   Konfirmasi
                // </button>
                <ModalVerifyProofComponent
                  id="modalVerifyOrder"
                  trx_id={id}
                  image={data.payment_proof}
                  token={user.access_token}
                />
              ) : (
                <UploadPayementProofModal
                  id={'upload-proof-modal'}
                  trx_id={id}
                  token={user?.access_token}
                />
              ))}
          </div>
        </div>

        <div className="card lg:card-side bg-base-200 w-full shadow-xl mb-4">
          <figure>
            <img src="/default-hotel.jpg" alt="Hotel" />
          </figure>
          <div className="card-body flex justify-between items-center">
            {data.transactionItems && (
              <>
                <h2 className="text-lg font-semibold">
                  {data.transactionItems[0].room.property?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {`${data.transactionItems[0].room.property?.address?.district.name}, ${data.transactionItems[0].room.property?.address?.provinces.name}`}
                </p>
              </>
            )}
            {user?.user_role === 'user' && (
              <button
                title="Pesan Lagi"
                type="button"
                className="btn btn-primary"
              >
                Pesan Lagi
              </button>
            )}
          </div>
        </div>

        <div className="card bg-base-200 w-full shadow-xl mb-4">
          <div className="card-body">
            <h3 className="card-title">Detail Reservasi</h3>
            <div className="mt-2">
              <p>
                <strong>Detail Tamu:</strong> {data.user.name}
              </p>
              {data.transactionItems?.map((item, index) => (
                <div key={index}>
                  <p>
                    <strong>Kamar:</strong> {item?.room?.name}
                  </p>
                  <p>
                    <strong>Check-in:</strong>{' '}
                    {formatStyledDate(item?.start_date)}
                  </p>
                  <p>
                    <strong>Check-out:</strong>{' '}
                    {formatStyledDate(item?.end_date)}
                  </p>
                </div>
              ))}
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
          </div>
        </div>

        <div className="card bg-base-200 w-full mb-4 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Location</h3>
            {data.transactionItems && (
              <p>{data.transactionItems[0].room.property?.address?.detail}</p>
            )}
            <iframe
              title="maps"
              src={
                data.transactionItems
                  ? `https://maps.google.com/maps?q=${data.transactionItems[0].room.property?.address?.lat},${data.transactionItems[0].room.property?.address?.lng}&output=embed`
                  : ''
              }
              className="w-full h-64 mt-2"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="divider"></div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="font-semibold text-lg">Total Price</h3>
            <p className="text-2xl font-bold">{data.amount}</p>
          </div>
        </div>
      </div>
    )
  );
}
