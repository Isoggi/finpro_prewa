// api/datagames.ts
export interface Game {
  title: string;
  imageUrl: string;
  category: string; // New property
  price: number; // New property
}

export const gamesData = {
  popular: [
    {
      title: 'Grand altus',
      imageUrl:
        'https://pix8.agoda.net/hotelImages/47889810/0/1fa96b57e06b05f35edc5ec0bbb47570.jpg?ce=0',
      category: 'Apartemen',
      price: 2000,
    },
    {
      title: 'Grand altus',
      imageUrl:
        'https://pix8.agoda.net/hotelImages/47889810/0/1fa96b57e06b05f35edc5ec0bbb47570.jpg?ce=0',
      category: 'Hotel',
      price: 2000,
    },
    {
      title: 'Grand',
      imageUrl:
        'https://pix8.agoda.net/hotelImages/47889810/0/1fa96b57e06b05f35edc5ec0bbb47570.jpg?ce=0',
      category: 'Hotel',
      price: 2000,
    },
    {
      title: 'Grand altus',
      imageUrl:
        'https://pix8.agoda.net/hotelImages/47889810/0/1fa96b57e06b05f35edc5ec0bbb47570.jpg?ce=0',
      category: 'Vila',
      price: 2000,
    },
    {
      title: 'Grand altus',
      imageUrl:
        'https://pix8.agoda.net/hotelImages/47889810/0/1fa96b57e06b05f35edc5ec0bbb47570.jpg?ce=0',
      category: 'Vila',
      price: 0,
    },
  ],
};
