export interface Properties {
  id: number;
  name: string;
  description: string;
  image?: string | undefined;
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
