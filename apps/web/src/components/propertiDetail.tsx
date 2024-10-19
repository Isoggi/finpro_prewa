'use client';
import Link from 'next/link';
import React from 'react';
import { IProperties } from '@/interfaces/property.interface';
import { api } from '@/config/axios.config';
import {
  FaCalendar,
  FaChevronRight,
  FaClock,
  FaMapMarker,
  FaUser,
} from 'react-icons/fa';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { User } from 'next-auth';

const MySwal = withReactContent(Swal);

type Props = {
  slug: string;
};

const ProppertiDetail = ({ slug }: Props) => {
  const { data: session } = useSession();
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    if (session?.user) setUser(session?.user);
  }, [session]);
  const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  const [properties, setProperti] = React.useState<IProperties | null>(null);

  console.log(`/properti/${slug}`);

  React.useEffect(() => {
    const fetchEvents = async () => {
      console.log(`/properti/${slug}`);
      const response = await api.get(`/properti/${slug}`);
      const data = (await response.data.data) as IProperties;
      console.log(response.data.data);
      setProperti(data);
    };
    fetchEvents();
  }, []);

  //   const onAddCart = async (id: number) => {
  //     await api
  //       .post(
  //         `/purchase`,
  //         { id, quantity: 1 },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session?.user.access_token}`,
  //           },
  //         },
  //       )
  //       .then((res) => {
  //         Toast.fire({
  //           icon: 'success',
  //           title: 'Add to cart success',
  //         });
  //       })
  //       .catch((error) => {
  //         Toast.fire({
  //           icon: 'error',
  //           title: error.message,
  //         });
  //       });
  //   };

  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="top">
        <div className="breadcrumbs">
          <ul className="flex items-center space-x-2">
            <li className="flex items-center">
              <Link href="/" className="text-blue-500">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="/properties" className="text-blue-500">
                Properti
              </Link>

              <Link
                href={`/properti?rooms=${properties?.name}`}
                className="text-blue-500"
              >
                {properties?.name}
              </Link>
            </li>
            <li className="flex items-center">
              <label className="text-gray-600">
                {properties?.category.name}
              </label>
            </li>
          </ul>
        </div>

        <div className="event-detail-banner my-4 flex justify-center items-center">
          <img
            src={properties ? properties.image || '' : ''}
            alt=""
            onError={(e) =>
              (e.currentTarget.src =
                'https://assets.loket.com/images/banner-event?.jpg')
            }
            className="w-64 h-64"
          />
        </div>

        <div className="event-detail-info">
          <div className="event-detail-breadcrumbs mb-2">
            <ul className="flex items-center space-x-2">
              <li className="flex items-center">
                <Link href="/properti" className="text-blue-500">
                  Properti
                </Link>
                <span className="mx-1">•</span>
                <Link
                  href={`/properti?category=${properties?.category.name}`}
                  className="text-blue-500"
                >
                  {properties?.category.name}
                </Link>
              </li>
            </ul>
          </div>

          <div className="info-title mb-4">
            <h1 id="gt-event-name" className="text-2xl font-bold">
              {properties?.name}
            </h1>
            <p className="">{properties?.description}</p>
          </div>

          <div className="info-additional space-y-4">
            <div className="event-venue flex items-center space-x-2">
              <FaMapMarker />
              <Link
                rel="noopener"
                href="https://www.google.com/maps/search/?api=1&amp;query=0,0"
                target="_blank"
                className="text-blue-500"
              >
                {properties?.address.detail},{properties?.address.district.name}
              </Link>
            </div>

            <div className="event-organizer-mobile flex items-center space-x-2">
              <div className="properties-avatar">
                {properties?.image ? (
                  <Image
                    className="rounded-full h-8 w-8"
                    src={properties.image}
                    alt="tenant"
                    onError={(e) =>
                      (e.currentTarget.src =
                        'https://assets.loket.com/images/default-logo-organization.png')
                    }
                    width={64}
                    height={64}
                  />
                ) : (
                  <div className="bg-gray-200 p-3 rounded-full">
                    <FaUser />
                  </div>
                )}
              </div>
              <div className="tenant-name">
                <span className="text-gray-600">Diselenggarakan oleh: </span>
                <span className="text-blue-500">{properties?.name}</span>
              </div>
            </div>
          </div>

          <div>
            <h2>Tiket</h2>
          </div>
          <div className="flex flex-col md:flex-row justify-center md:justify-start">
            {properties?.rooms.map((rooms) => {
              return (
                <div key={rooms.id} className="card bg-base-100 w-96 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{rooms.name}</h2>
                    <p>{rooms.description}</p>
                    <p>{`Harga: ${rooms.price ? rooms.price : 'Gratis'}`}</p>
                    {/* <p>
                      {`Sisa: ${
                        ticket.rest ? ticket.rest : ticket.maxNumber
                      } / ${ticket.maxNumber}`}
                    </p> */}
                    {/* <div className="card-actions justify-end">
                      <button
                        title="Add to cart"
                        type="button"
                        onClick={(e) => onAddCart(Number(ticket.id))}
                        className="btn btn-primary"
                      >
                        Tambah ke keranjang
                      </button>
                    </div> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProppertiDetail;
