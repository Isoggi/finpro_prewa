import { IRooms } from './property.interface';
import { User } from './user.interface';

export interface Order {
  id: number;
  category: 'apartemen' | 'hotel' | 'kos' | undefined;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status:
    | 'pending'
    | 'completed'
    | 'failed'
    | 'cancelled'
    | 'waitingpayment'
    | 'waitingapproval';
  image?: string;
  amount: number;
  payment_method: 'midtrans' | 'doku' | 'manual' | 'other';
  payment_proof?: string;
  invoice_number?: string;
}

export interface OrderDetail extends Order {
  user: User;
  transactionItems?: TransactionItems[] | null | undefined;
}

export interface TransactionItems {
  id: number;
  total_price: number;
  start_date: string;
  end_date: string;
  room: OrderRooms;
}

export interface OrderRooms extends IRooms {
  property?: {
    id: number;
    lat: number;
    lng: number;
    name: string;
    tenant: {
      name: string;
    };
    address: {
      id: number;
      lat: number;
      lng: number;
      detail: string;
      provinces: {
        name: string;
      };
      district: { name: string };
    };
  };
}
