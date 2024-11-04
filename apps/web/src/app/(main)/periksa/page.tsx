import CheckoutContainer from '@/components/checkout/checkoutContainer';
import React from 'react';

type Props = {};

export default function CheckOutPage({}: Props) {
  return (
    <div className={'p-4 md:p-8 lg:p-12'}>
      <h1 className="text-3xl font-bold mb-4">Periksa</h1>
      <CheckoutContainer />
    </div>
  );
}
