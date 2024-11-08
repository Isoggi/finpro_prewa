import React from 'react';

type Props = { data: SalesReport[] };

export default function SalesReportTable({ data }: Props) {
  return (
    <div>
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Properties</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>
                <div>
                  <span className="font-semibold">{transaction.user.name}</span>
                  <p className="text-sm text-gray-500">
                    {transaction.user.email}
                  </p>
                </div>
              </td>
              <td>
                <ul>
                  {transaction.properties.map((property) => (
                    <li
                      key={property.propertyId}
                      className="border-b last:border-b-0 py-1"
                    >
                      {property.propertyName} - Rp{property.totalSales}
                    </li>
                  ))}
                </ul>
              </td>
              <td>Rp {transaction.transactionTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
