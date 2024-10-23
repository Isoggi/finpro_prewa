'use client';
import React from 'react';
import CheckoutMethod from './checkoutMethod';
import CheckoutProcess from './checkoutProcess';
import CheckOutConfirm from './checkOutConfirm';
import { useSearchParams } from 'next/navigation';

type Props = {};
const tabs: { id: string; label: string }[] = [
  { id: 'method', label: 'Pilh Metode' },
  { id: 'process', label: 'Bayar' },
  { id: 'confirm', label: 'Selesai' },
];

export default function CheckoutContainer({}: Props) {
  const [activeTab, setActiveTab] = React.useState<string>('method');
  const params = useSearchParams();
  React.useEffect(() => {
    if (params) {
      setActiveTab(params.get('tab') || 'method');
    }
  }, []);

  return (
    <div>
      <div>
        <ul className="steps steps-vertical lg:steps-horizontal">
          <li className={'step step-primary'}>Pilih Metode</li>
          <li
            className={`step ${activeTab === 'process' ? 'step-primary' : ''}`}
          >
            Bayar
          </li>
          <li
            className={`step ${activeTab === 'confirm' ? 'step-primary' : ''}`}
          >
            Selesai
          </li>
        </ul>
      </div>

      {activeTab === 'method' && <CheckoutMethod />}
      {activeTab === 'process' && <CheckoutProcess />}
      {activeTab === 'confirm' && <CheckOutConfirm />}
    </div>
  );
}
