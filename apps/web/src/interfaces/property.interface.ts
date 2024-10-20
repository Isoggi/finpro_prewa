import { User } from "./user.interface";

export interface Properties {
  id: number;
  name: string;
  description: string;
  image?: string | undefined;
  tenant? : User;
}

export interface Rooms {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image?: string | undefined;
}

export interface Availability {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image?: string | undefined;
}

export interface PeakSeasonRate {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image?: string | undefined;
}
