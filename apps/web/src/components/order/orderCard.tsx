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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
          <div className="flex items-center w-full">
            <div
              className="p-3 rounded-lg mr-3"
              style={{ backgroundColor: '#00A9FF' }}
            >
              <span className="text-white text-2xl">{category}</span>
            </div>
            <div>
              <h2 className="card-title text-lg md:text-xl">{name}</h2>
              <p className="text-sm md:text-base">{description}</p>
              <p className="text-xs md:text-sm text-gray-500">
                {startDate} - {endDate}
              </p>
            </div>
          </div>
          <span
            className={`badge ${status === 'confirmed' ? 'badge-success' : 'badge-error'} text-xs md:text-sm ml-auto`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
