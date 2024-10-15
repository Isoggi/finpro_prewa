import React from 'react';
import ModalComponent from '../modal';

type Props = {
  category: 'apartemen' | 'hotel' | 'kos' | undefined;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
};

export default function OrderCardComponent({
  name,
  category,
  description,
  startDate,
  endDate,
  status,
}: Props) {
  return (
    <div className="card w-full bg-base-100 shadow-md">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-primary p-3 rounded-lg mr-3">
              <span className="text-white text-2xl">{category}</span>
            </div>
            <div>
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
          </span>
          {status === 'pending' && (
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
                    btnTitle="Ajukan pembatalan"
                    modalTitle="Ajukan pembatalan?"
                    modalDesc="Ingin mengajukan pembatalan?"
                  />
                  {/* <div
                    className="hover:cursor-pointer hover:text-red-500"
                    onClick={() =>
                      document.getElementById('cancel_order_modal')?.showModal()
                    }
                  >
                    Ajukan pembatalan
                  </div>
                  <dialog id="cancel_order_modal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p className="py-4">Ingin mengajukan pembatalan?</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog> */}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
