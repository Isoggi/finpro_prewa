import { Prisma } from '@prisma/client';
import prisma from '../src/prisma';
import { users } from './seed.json';

export const seedUser = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < users.length; i++) {
      const data = {
        data: {
          ...users[i],
          user_role: { create: { role: users[i].role as 'user' | 'tenant' } },
        },
      } as any;

      await trx.users.upsert({
        create: data,
        where: {
          id: users[i].id,
        },
        update: data,
      });
    }
  });
};
