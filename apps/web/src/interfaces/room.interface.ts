import { User } from '@/interfaces/user.interface';

export interface IProperties {
  id: number;
  name: string;
  description: string;
  image?: string | undefined;
  slug_address: string;
  rooms: IRooms[];
  category: ICategory;
  address?: IAddress;
  provinces?: IProvinces;
}

export interface IRooms {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image?: string | null | undefined;
  property?: IProperties;
  availability?: IAvailability[];
  peakSeasonRate?: IPeakSeasonRate[];
  address: IAddress;
  review: IReview;
  category: ICategory;
}

export interface IAvailability {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image?: string | undefined;
}

export interface IPeakSeasonRate {
  id: number;
  room_id: number;
  start_date: Date;
  end_date: string;
  rates: number;
  rateCategory: 'every' | 'once';
}

export interface IAddress {
  id: number;
  lng: number;
  lat: number;
  detail: string;
  district: IDistrict;
  provinces: IProvinces;
}

export interface IReview {
  id: number;
  rating: number;
  comment: string;
  prev_review_id: number;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IDistrict {
  id: number;
  name: string;
}

export interface IProvinces {
  id: number;
  name: string;
}

export interface ITransaction_items {
  id: number;
  start_date: string;
  end_date: string;
}

export interface ITransactions {
  id: number;
  amount: number;
  payment_method: string;
  invoice_number: number;
  payment_proof: string;
  status: string;
  transaction_items: ITransaction_items[];
}
