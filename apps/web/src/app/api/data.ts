interface FlightDeal {
  origin: string;
  destination: string;
  departureDate: string;
  airline: string;
  cabinClass: string;
  price: string;
}

const flightDeals: FlightDeal[] = [
  {
    origin: 'Jakarta',
    destination: 'Surabaya',
    departureDate: '04 Nov 24',
    airline: 'Pelita Air',
    cabinClass: 'Ekonomi',
    price: 'IDR 900.653',
  },
  {
    origin: 'Jakarta',
    destination: 'Yogyakarta',
    departureDate: '15 Okt 24',
    airline: 'TransNusa',
    cabinClass: 'Ekonomi',
    price: 'IDR 709.089',
  },
  {
    origin: 'Jakarta',
    destination: 'Semarang',
    departureDate: '11 Okt 24',
    airline: 'Batik Air Indonesia',
    cabinClass: 'Ekonomi',
    price: 'IDR 907.955',
  },
  {
    origin: 'Surabaya',
    destination: 'Jakarta',
    departureDate: '04 Nov 24',
    airline: 'Pelita Air',
    cabinClass: 'Ekonomi',
    price: 'IDR 854.653',
  },
  {
    origin: 'Yogyakarta',
    destination: 'Jakarta',
    departureDate: '17 Okt 24',
    airline: 'TransNusa',
    cabinClass: 'Ekonomi',
    price: 'IDR 666.681',
  },
];
