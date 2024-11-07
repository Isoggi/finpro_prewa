import React from 'react';

type Props = {};

export default function propertyReport({}: Props) {
  return (
    <div>
      {' '}
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
  );
}
