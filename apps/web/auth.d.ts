/** @format */

declare module 'next-auth' {
  interface User {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    password?: string | undefined;
    phone_number: string | undefined;

    image?: string | undefined;
    access_token?: string | undefined;
    user_role?: string | undefined;
  }

  interface Session {
    user: User;
  }
}

import { JWT } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    id: number | undefined;
    phone_number: string | undefined;
    email: string | undefined;
    name: string | undefined;
    // gender: 'Pria' | 'Perempuan' | undefined;
    image?: string;
    user_role?: 'user' | 'tenant' | undefined;
    acces_token: string;
  }
}
