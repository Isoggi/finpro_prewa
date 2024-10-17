import React from 'react';
import ModalComponent from '../modal';
import { Order } from '@/interfaces/order.interface';

interface Props extends Order {
  user_role: string;
}

export default function OrderCardComponent({
  name,
  category,
  description,
  startDate,
  endDate,
  status,
  image,
  payment_type,
  user_role,
}: Props) {
  return (
    <div className="card w-full bg-base-100 shadow-md">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-primary p-3 rounded-lg mr-3">
              {image ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_PROPERTY_IMAGE}${image}`}
                  alt="image"
                  className="w-12 h-12 object-cover"
                />
              ) : (
                'Data'
              )}
            </div>
            <div>
              <span className="text-white badge badge-info">{category}</span>
              <h2 className="card-title">{name}</h2>
              <p className="text-sm">{description}</p>
              <p className="text-sm text-gray-500">
                {startDate} - {endDate}
              </p>
            </div>
          </div>
          <span
            className={`badge ${status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}
          >
            {status}
            {user_role === 'tenant'
              ? status === 'pending' && (
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                      ...
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li>
                        <ModalComponent
                          id="cancel_order_modal"
                          btnTitle="Ajukan pembatalan?"
                          modalTitle="Ajukan pembatalan?"
                          modalDesc="Ingin mengajukan pembatalan?"
                        />
                      </li>
                    </ul>
                  </div>
                )
              : status === 'pending' && (
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                      ...
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li>
                        <ModalComponent
                          id="cancel_order_modal"
                          btnTitle="Ajukan pembatalan?"
                          modalTitle="Ajukan pembatalan?"
                          modalDesc="Ingin mengajukan pembatalan?"
                        />
                      </li>
                    </ul>
                  </div>
                )}
          </span>
        </div>
      </div>
    </div>
  );
}
