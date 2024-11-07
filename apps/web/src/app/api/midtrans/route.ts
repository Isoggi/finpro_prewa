import { NextRequest, NextResponse } from 'next/server';
import Midtrans, { Snap } from 'midtrans-client';
import { api } from '@/config/axios.config';

const snap = new Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY ?? '', // Replace with your actual server key
  clientKey: process.env.MIDTRANS_CLIENT_KEY ?? '',
});

export async function POST(request: NextRequest) {
  try {
    const { id, productName, price, total, order_id, order_token } =
      await request.json();

    let token;
    console.log(order_token, 'ini order_token di route.ts');
    // const statusResponse = await snap.transaction.status(order_id);
    // token =  await api.get(`/order/get-midtrans-token/${order_id}`);
    // statusResponse.transaction_status === 'pending'
    //   ? statusResponse.transaction_id
    //   : null;
    // console.log(statusResponse, 'ini token kalo udah ada');

    // const { carts, shippingCost } = await request.json();
    const parameter =
      // : Midtrans.TransactionRequestBody
      {
        // item_details: {
        //   name: productName,
        //   price: price,
        //   quantity: quantity,
        // },
        transaction_details: {
          // order_id: `order-${new Date().getTime()}`,
          order_id,
          gross_amount: total,
        },
      };
    if (!token) {
      console.log(token, 'before isi token');
      token = await snap.createTransactionToken(parameter);
      console.log(token, 'after isi token');
    }
    console.log(token, 'ini token');
    token = await snap.createTransactionToken(parameter);

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.error();
  }
}
