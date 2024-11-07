import React from 'react';

type Props = {};

export default function checkoutGateway({}: Props) {
  const handlePayment = async (
    order_invoice: string,
    totalAmount: number,
    token: string | null,
  ) => {
    console.log(order_invoice);

    try {
      console.log(token, 'ini token after try');

      if (!token) {
        token = null;
        console.log(token, 'ini token didalem if try');
        const response = await axios.post('/api/payment', {
          order_id: order_invoice,
          shippingCost: totalAmount || 0, // Mengirim biaya pengiriman
        });
        token = response.data.token;
        console.log(token, 'ini token after dimasukin tokennya');
        const inputToken = await api.post(
          `/order/update-midtrans-token`,
          {
            invoice: order_invoice,
            order_token: token,
          },
          {
            headers: {
              Authorization: 'Bearer ' + session?.data?.user.access_token,
            },
          },
        );
        const check = inputToken;
        console.log(check, 'ini check');
      }

      // console.log(response, 'ini response');
      console.log(
        window.snap.pay(String(token), {
          onSuccess: async function (result) {
            console.log('success');
            console.log(result);
            toast({
              description: order_invoice,
            });
            await api.post(
              `/order/update-midtrans`,
              {
                invoice: order_invoice,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + session?.data?.user.access_token,
                },
              },
            );
            router.push('/order');
          },
          onPending: function (result) {
            console.log('pending');
            console.log(result);
            toast({
              description: 'Payment pending!',
            });
          },
          onError: function (result) {
            console.log('error');
            console.log(result);
            toast({
              description: 'Payment Error!',
            });
          },
          onClose: function () {
            console.log(
              'customer closed the popup without finishing the payment',
            );
            toast({
              description: 'Payment Closed',
            });
          },
        }),
      );
    } catch (error) {
      console.error('Payment error:', error);
    }
  };
  return <div>checkoutGateway</div>;
}
