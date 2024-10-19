export interface Order {
  id: number;
  category: 'apartemen' | 'hotel' | 'kos' | undefined;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  image?: string;
  payment_method: 'midtrans' | 'doku' | 'manual' | 'other';
  payment_proof?: string;
}
