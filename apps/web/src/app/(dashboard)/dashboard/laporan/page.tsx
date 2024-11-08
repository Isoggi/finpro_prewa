import PropertyReport from '@/components/laporan/propertyReport';
import SalesReport from '@/components/laporan/salesReport';
import React from 'react';

type Props = {};

export default function LaporanPage({}: Props) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Sales Report</h1>
      <div className="overflow-x-auto">
        <SalesReport />
      </div>
      <h1 className='className="text-2xl font-bold text-center mt-6 mb-6'>
        Property Report
      </h1>
      <div className="overflow-x-auto">
        <PropertyReport />
      </div>
    </div>
  );
}
