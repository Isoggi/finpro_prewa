import React from 'react';

type Props = {};

export default function OrderCardLoader({}: Props) {
  return (
    <div className="card w-full bg-base-100 shadow-md">
      <div className="skeleton card-body">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="skeleton w-32 h-32 p-3 rounded-lg mr-3"></div>
            <div>
              <h2 className="skeleton card-title"></h2>
              <p className="skeleton text-sm"></p>
              <p className="skeleton *:text-sm text-gray-500"></p>
            </div>
          </div>
          <span className={'skeleton'}></span>
        </div>
      </div>
    </div>
  );
}
