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
    //   const payload = {
    //     transaction_details: {
    //         order_id: transaction_id,
    //         gross_amount
    //     },
    //     item_details: productsFromDB.map((product) => ({
    //         id: product.id,
    //         price: product.price,
    //         quantity: product.quantity,
    //         name: product.name,
    //     })),
    //     customer_details: {
    //         first_name: customer_name,
    //         email: customer_email
    //     },
    //     callbacks: {
    //         finish: `${FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
    //         error: `${FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
    //         pending: `${FRONT_END_URL}/order-status?transaction_id=${transaction_id}`
    //     }
    // }
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
    // if (!token) {
    //   console.log(token, 'before isi token');
    //   token = await snap.createTransactionToken(parameter);
    //   console.log(token, 'after isi token');
    // }
    console.log(token, 'ini token');
    token = token ?? (await snap.createTransactionToken(parameter));

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.error();
  }
}
