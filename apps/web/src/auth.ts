import { api } from '@/config/axios.config';
import { loginSchema } from '@/schemas/auth.schema';
import NextAuth, { User } from 'next-auth';
import { jwtDecode } from 'jwt-decode';
import Credential from 'next-auth/providers/credentials';
import google from 'next-auth/providers/google';

export const { signIn, signOut, handlers, auth, unstable_update } = NextAuth({
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
});
