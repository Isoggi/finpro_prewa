import React from 'react';

type Props = {};

export default function LaporanPage({}: Props) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Sales Report</h1>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
