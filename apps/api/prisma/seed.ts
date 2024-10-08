import { users_role } from '@prisma/client';
import prisma from '../src/prisma';
import {
  users,
  provinces,
  districts,
  addresses,
  categories,
  properties,
  Rooms,
  Availability,
  PeakSeasonRate,
  transactions,
  transactionsItems,
} from './seed.json';

const seedUser = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < users.length; i++) {
      await trx.users.upsert({
        where: {
          id: users[i].id,
        },
        create: {
          email: users[i].email,
          password: users[i].password,
          role: users[i].role as unknown as users_role,
          name: users[i].name,
          phone_number: users[i].phone_number,
          created_at: new Date(),
          isVerified: users[i].isVerified,
          tenant: {
            connectOrCreate: {
              where: { id: users[i].id },
              create: {
                id: users[i].id,
                bankAccount: 'BCA',
                accountNumber: '0213125678',
              },
            },
          },
        },
        update: {
          email: users[i].email,
          password: users[i].password,
          role: users[i].role as unknown as users_role,
          name: users[i].name,
          phone_number: users[i].phone_number,
          isVerified: users[i].isVerified,
          updated_at: new Date(),
          tenant: {
            connectOrCreate: {
              where: { id: users[i].id },
              create: {
                id: users[i].id,
                bankAccount: 'BCA',
                accountNumber: '0213125678',
              },
            },
          },
        },
      });
    }
  });
};
const seedProvinces = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < provinces.length; i++) {
      const data = {
        ...provinces[i],
      } as any;

      await trx.provinces.upsert({
        where: {
          id: provinces[i].id,
        },
        create: data,

        update: data,
      });
    }
  });
};

const seedDistricts = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < districts.length; i++) {
      const data = {
        ...districts[i],
      } as any;

      await trx.district.upsert({
        create: data,
        where: {
          id: districts[i].id,
        },
        update: data,
      });
    }
  });
};

const seedAddresses = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < addresses.length; i++) {
      const data = {
        ...addresses[i],
      } as any;

      await trx.address.upsert({
        create: data,
        where: {
          id: addresses[i].id,
        },
        update: data,
      });
    }
  });
};

const seedCategories = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < categories.length; i++) {
      const data = {
        ...categories[i],
      } as any;

      await trx.categories.upsert({
        create: data,
        where: {
          id: categories[i].id,
        },
        update: data,
      });
    }
  });
};
const seedProperties = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < properties.length; i++) {
      const data = {
        ...properties[i],
      } as any;

      await trx.properties.upsert({
        create: data,
        where: {
          id: properties[i].id,
        },
        update: data,
      });
    }
  });
};
const seedRooms = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < Rooms.length; i++) {
      const data = {
        ...Rooms[i],
      } as any;

      await trx.rooms.upsert({
        create: data,
        where: {
          id: Rooms[i].id,
        },
        update: data,
      });
    }
  });
};

const seedAvailability = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < Availability.length; i++) {
      const data = {
        ...Availability[i],
      } as any;

      await trx.availability.upsert({
        create: data,
        where: {
          id: Availability[i].id,
        },
        update: data,
      });
    }
  });
};

const seedPeakSeasonRate = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < PeakSeasonRate.length; i++) {
      const data = {
        ...PeakSeasonRate[i],
      } as any;

      await trx.peakSeasonRate.upsert({
        create: data,
        where: {
          id: PeakSeasonRate[i].id,
        },
        update: data,
      });
    }
  });
};
const seedTransactions = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < transactions.length; i++) {
      const data = {
        ...transactions[i],
      } as any;

      await trx.transactions.upsert({
        create: data,
        where: {
          id: transactions[i].id,
        },
        update: data,
      });
    }
  });
};
const seedTransactionItems = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < transactionsItems.length; i++) {
      const data = {
        ...transactionsItems[i],
      } as any;

      await trx.transactionItems.upsert({
        create: data,
        where: {
          id: transactionsItems[i].id,
        },
        update: data,
      });
    }
  });
};

const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const modelMapping = {
  users: prisma.users.aggregate({ _count: { id: true } }),
  provinces: prisma.provinces.aggregate({ _count: { id: true } }),
  district: prisma.district.aggregate({ _count: { id: true } }),
  address: prisma.address.aggregate({ _count: { id: true } }),
  categories: prisma.categories.aggregate({ _count: { id: true } }),
  properties: prisma.properties.aggregate({ _count: { id: true } }),
  rooms: prisma.rooms.aggregate({ _count: { id: true } }),
  availability: prisma.availability.aggregate({ _count: { id: true } }),
  peakSeasonRate: prisma.peakSeasonRate.aggregate({ _count: { id: true } }),
  transaction: prisma.transactions.aggregate({ _count: { id: true } }),
  transactionItems: prisma.transactionItems.aggregate({ _count: { id: true } }),
  // Add more models as needed
};
// Check if a table is seeded
const isTableSeeded = async (
  modelName: keyof typeof modelMapping,
): Promise<boolean> => {
  const model = modelMapping[modelName];
  const count = await model;
  return count._count.id > 0;
};

const main = async () => {
  console.log('Starting seeding...');

  if (!(await isTableSeeded('users'))) {
    await seedUser();
    console.log('Seeded Users');
  } else {
    console.log('Users table already seeded');
  }
  await delay();

  if (!(await isTableSeeded('provinces'))) {
    await seedProvinces();
    console.log('Seeded Provinces');
  } else {
    console.log('Provinces table already seeded');
  }
  await delay();

  if (!(await isTableSeeded('district'))) {
    await seedDistricts();
    console.log('Seeded Districts');
  } else {
    console.log('Districts table already seeded');
  }
  await delay();

  if (!(await isTableSeeded('address'))) {
    await seedAddresses();
    console.log('Seeded Addresses');
  } else {
    console.log('Addresses table already seeded');
  }
  await delay();

  if (!(await isTableSeeded('categories'))) {
    await seedCategories();
    console.log('Seeded Categories');
  } else {
    console.log('Categories table already seeded');
  }
  await delay();

  if (!(await isTableSeeded('properties'))) {
    await seedProperties();
    console.log('Seeded Properties');
  } else {
    console.log('Properties table already seeded');
  }
  await delay();

  if (!(await isTableSeeded('rooms'))) {
    await seedRooms();
    console.log('Seeded Rooms');
  } else {
    console.log('Rooms table already seeded');
  }
  await delay();

  if (!(await isTableSeeded('availability'))) {
    await seedAvailability();
    console.log('Seeded Availability');
  } else {
    console.log('Availability table already seeded');
  }
  await delay();

  if (!(await isTableSeeded('peakSeasonRate'))) {
    await seedPeakSeasonRate();
    console.log('Seeded PeakSeasonRate');
  } else {
    console.log('PeakSeasonRate table already seeded');
  }

  if (!(await isTableSeeded('transaction'))) {
    await seedTransactions();
    console.log('Seeded Transactions');
  } else {
    console.log('Transactions table already seeded');
  }
  await delay();

  if (!(await isTableSeeded('transactionItems'))) {
    await seedTransactionItems();
    console.log('Seeded Transaction Items');
  } else {
    console.log('Transaction Items table already seeded');
  }
  await delay();

  console.log('Seeding process completed.');
};

// Start the seeding process

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error occurred during seeding:');
    console.error(e);
    await prisma.$disconnect();
  });
