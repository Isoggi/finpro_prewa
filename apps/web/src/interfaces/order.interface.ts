export interface Order {
  category: 'apartemen' | 'hotel' | 'kos' | undefined;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'waitingpayment' | 'confirmed' | 'cancelled';
}
