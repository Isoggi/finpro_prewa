export const PropertiesData = {
  categories: [
    { id: 1, name: 'Hotel' },
    { id: 2, name: 'Apartemen' },
    { id: 3, name: 'Kos' },
  ],
  properties: [
    {
      id: 1,
      tenant_id: 2,
      name: 'Hotel GOP 9',
      description:
        'A lovely place to stay near your office, with access to The Breeze and ICE BSD. Feel the luxury amid hustle.',
      category_id: 1,
      address_id: 1,
      slug_address: 'hotel-gop-9',
    },
  ],
  rooms: [
    {
      id: 1,
      property_id: 1,
      name: 'Room One',
      description: 'A cozy room with a great view.',
      price: 500000,
      capacity: 2,
      created_at: '2024-01-01T00:00:00Z',
      image:
        'https://images.rukita.co/buildings/building/da341564-433.jpg?tr=c-at_max%2Cw-640',
    },
    {
      id: 2,
      property_id: 1,
      name: 'Room Two',
      description: 'A spacious room with a private bathroom.',
      price: 700000,
      capacity: 3,
      created_at: '2024-02-01T00:00:00Z',
      image:
        'https://images.rukita.co/buildings/building/da341564-433.jpg?tr=c-at_max%2Cw-640',
    },
    {
      id: 3,
      property_id: 1,
      name: 'Room Two',
      description: 'A spacious room with a private bathroom.',
      price: 700000,
      capacity: 3,
      created_at: '2024-02-01T00:00:00Z',
      image:
        'https://images.rukita.co/buildings/building/da341564-433.jpg?tr=c-at_max%2Cw-640',
    },
  ],
  availability: [
    {
      id: 1,
      room_id: 1,
      stock: 2,
      date: '2024-10-10T00:00:00Z',
      created_at: '2024-01-01T00:00:00Z',
    },
  ],
  provinces: [
    { id: 1, name: 'DKI Jakarta' },
    { id: 2, name: 'Banten' },
  ],
  districts: [
    { id: 1, province_id: 1, name: 'Jakarta Selatan' },
    { id: 2, province_id: 2, name: 'Kab. Tangerang' },
  ],
  addresses: [
    {
      id: 1,
      detail:
        'Jl. BSD Grand Boulevard No.69-70, Sampora, Kec. Cisauk, Kabupaten Tangerang, Banten 15345',
      province_id: 2,
      district_id: 2,
      lat: -6.302802,
      lng: 106.6494667,
    },
  ],
};
