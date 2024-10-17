export interface Order {
  category: 'apartemen' | 'hotel' | 'kos' | undefined;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  image?: string;
  payment_type: 'midtrans' | 'doku' | 'manual' | 'other';
}
