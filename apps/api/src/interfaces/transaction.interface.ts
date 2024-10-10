import {
  transaction_items_status,
  transactions_payment_method,
  transactions_status,
} from '@prisma/client';

export interface Transaction {
  id?: number;
  invoice_number?: string;
  user_id: number;
  amount: number;
  payment_method: transactions_payment_method;
  payment_proof?: string;
  status: transactions_status;
  created_at?: Date;
  updated_at?: Date;
  transactionItems: TransactionItems[] | null | undefined;
}

export interface TransactionItems {
  id?: number;
  transaction_id: number;
  room_id: number;
  start_date: Date;
  end_date: Date;
  total_price: number;
  status: transaction_items_status;
  created_at?: Date;
  updated_at?: Date;
}
