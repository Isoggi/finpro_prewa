import { User } from '@/interfaces/user.interface';

export interface IProperties {
  id: number;
  name: string;
  description: string;
  image?: string | undefined;
  tenant?: User;
  slug_address: string;
  rooms: IRooms[];
  category: ICategory;
  address: IAddress;
  provinces: IProvinces;
}

export interface IRooms {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image?: string | undefined;
  properties: IProperties;
  availability: IAvailability[];
  peakSeasonRate: IPeakSeasonRate;
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
  name: string;
  description: string;
  price: number;
  capacity: number;
  image?: string | undefined;
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
