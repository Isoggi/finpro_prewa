'use client';
import { showAlert } from '@/lib/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = { invoice: string; total: number; token: string | null };

export default function CheckoutGateway({ invoice, total, token }: Props) {
  console.log('midtrans start');
  const router = useRouter();
  const [midtransToken, setMidtransToken] = React.useState<string | null>(null);
  React.useEffect(() => {
    const snapScript: string = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey: any = process.env.MIDTRANS_CLIENT_KEY;

    const script = document.createElement('script');
    script.src = snapScript;

    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handlePayment = async (
    order_invoice: string,
    total: number,
    token: string | null,
  ) => {
    console.log(order_invoice);

    try {
      console.log(token, 'ini token after try');

      if (!midtransToken) {
        token = null;
        console.log(token, 'ini token didalem if try');
        const response = await axios.post('/api/midtrans', {
          order_id: order_invoice,
          total: total || 0, // Mengirim biaya pengiriman
        });
        token = response.data.token;
        setMidtransToken(token);
        // console.log(token, 'ini token after dimasukin tokennya');
        // const inputToken = await api.post(
        //   `/order/update-midtrans-token`,
        //   {
        //     invoice: order_invoice,
        //     order_token: token,
        //   },
        //   {
        //     headers: {
        //       Authorization: 'Bearer ' + token,
        //     },
        //   },
        // );
        // const check = inputToken;
        // console.log(check, 'ini check');
      }

      // console.log(response, 'ini response');
      console.log(
        window.snap.pay(String(midtransToken), {
          onSuccess: async function (result) {
            console.log('success');
            console.log(result);
            showAlert({
              title: order_invoice,
              text: 'Pembayaran berhasil',
              icon: 'success',
            });
            // await api.post(
            //   `/order/update-token`,
            //   {
            //     invoice: order_invoice,
            //   },
            //   {
            //     headers: {
            //       Authorization: 'Bearer ' + token,
            //     },
            //   },
            // );
            router.push('/order');
          },
          onPending: function (result) {
            console.log('pending');
            console.log(result);
            showAlert({
              title: 'Payment pending!',
              icon: 'warning',
            });
          },
          onError: function (result) {
            console.log('error');
            console.log(result);
            showAlert({
              title: 'Payment Error!',
              text: '',
              icon: 'error',
            });
          },
          onClose: function () {
            console.log(
              'customer closed the popup without finishing the payment',
            );
            showAlert({
              title: 'Payment Closed',
              text: '',
              icon: 'info',
            });
          },
        }),
      );
    } catch (error) {
      console.error('Payment error:', error);
    }
  };
  React.useEffect(() => {
    console.log('midtrans handle payment');
    handlePayment(invoice, total, midtransToken);
  }, []);
  return <div></div>;
}
