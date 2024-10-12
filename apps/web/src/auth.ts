import { api } from '@/config/axios.config';
import { loginSchema } from '@/schemas/auth.schema';
import NextAuth, { User } from 'next-auth';
import { jwtDecode } from 'jwt-decode';
import Credential from 'next-auth/providers/credentials';
import google from 'next-auth/providers/google';

export const { signIn, signOut, handlers, auth, unstable_update } = NextAuth({
  pages: {
    signIn: '/masuk',
  },
  session: {
    strategy: 'jwt',
    maxAge: 3 * 60 * 60,
  },
  providers: [
    Credential({
      authorize: async (credentials) => {
        try {
          console.log(credentials);
          const validateFields = loginSchema.safeParse(credentials);
          if (!validateFields.success) throw new Error('Login Gagal');

          const res = await api.post('/auth/login', credentials);
          console.log(res.data.data);
          const token = res.data.data;
          if (!token) throw new Error('Login error!');
          const user = jwtDecode(token) as User;
          user.access_token = token;
          console.log(user);
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.phone_number = token.phone_number as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.user_role = token.user_role as string;
        session.user.access_token = token.access_token as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone_number = user.phone_number;
        token.email = user.email;
        token.image = user.image;
        token.user_role = user.user_role as string;
        token.access_token = user.access_token as string;
      }

      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      return token;
    },
  },
});
