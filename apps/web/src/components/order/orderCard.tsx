import React from 'react';

type Props = {
  category: 'apartemen' | 'hotel' | 'kos' | undefined;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'waitingpayment' | 'confirmed' | 'cancelled';
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
        </div>
      </div>
    </div>
  );
}
