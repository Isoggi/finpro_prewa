/** @format */

declare module 'next-auth' {
  interface User {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    password?: string | undefined;
    phone_number: string | undefined;
    oauth_id?: string | undefined;
    oauth_provider?: string | undefined;
    image?: string | undefined;
    access_token?: string | undefined;
    access_token_expires?: number | undefined;
    user_role?: string | undefined;
    error: string | undefined;
    isVerified?: boolean;
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
    image?: string;
    user_role?: 'user' | 'tenant' | undefined;
    oauth_id?: string | undefined;
    oauth_provider?: string | undefined;
    access_token: string;
    access_token_expires?: number | undefined;
    error: string | undefined;
  }
}
