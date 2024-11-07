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
    google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
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
          user.access_token_expires = Date.now() + 3 * 60 * 60 * 1000;
          console.log(user);
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('check provider', account?.provider);
      if (account?.provider === 'google') {
        console.log('masuk google', user);
        // const res = await api.get('/auth/signin', {
        //   params: {
        //     email: user?.email,
        //   },
        // });

        // if (res.data.length === 0) {
        //   const newUser = {
        //     full_name: profile?.name,
        //     phone_number: null,
        //     email: user.email,
        //     password: null,
        //     oauth_id: user.id,
        //     oauth_provider: 'google',
        //     image: profile?.picture,
        //   };
        //   const { data } = await api.post('/signup', newUser);

        //   if (data) {
        //     user = data;
        //   }
        // }

        // const res = await api.get('/users', {
        //   params: {
        //     email: user?.email,
        //   },
        // });

        // if (res.data.length === 0) {
        //   const newUser = {
        //     full_name: user.name,
        //     phone_number: null,
        //     email: user.email,
        //     password: null,
        //     google_id: user.id,
        //     image: user.image,
        //   };
        //   const { data } = await api.post('/users', newUser);

        //   if (data) {
        //     user = data;
        //   }
        // }
      }
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
        session.user.access_token_expires =
          token.access_token_expires as number;
      }
      return session;
    },
    async jwt({ token, user, account, profile, trigger, session }) {
      if (account?.provider === 'google') {
        console.log('jwt gogle', token);
        // const res = await api.get('/auth/refresh-token', {
        //   params: {
        //     email: user?.email,
        //   },
        // });
        // if (res.data.length !== 0) {
        //   token = res.data[0];
        // }
        // const res = await api.get('/users', {
        //   params: {
        //     email: user?.email,
        //   },
        // });
        // if (res.data.length !== 0) {
        //   token = res.data[0];
        // }
        return token;
      }

      const currentTime = Date.now();

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone_number = user.phone_number;
        token.email = user.email;
        token.image = user.image;
        token.user_role = user.user_role as string;
        token.access_token = user.access_token as string;
        token.access_token_expires = currentTime + 3 * 59 * 60 * 1000;
      }
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      if (
        currentTime <
        (token.access_token_expires as number) - 5 * 60 * 1000
      ) {
        console.log(token.access_token_expires);
        // Token is still valid, return it
        return token;
      } else {
        console.log('Access token expired, refreshing...');
        return refreshAccessToken(token as unknown as User);
      }
    },
  },
});

async function refreshAccessToken(token: User) {
  try {
    const response = await api.post(
      '/auth/refresh-token',
      { token: token.access_token },
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    );

    const refreshedTokens = response.data.data;

    if (!(response.status == 200)) {
      throw refreshedTokens;
    }
    const user = jwtDecode(refreshedTokens) as User;

    return {
      ...user,
      access_token: refreshedTokens.access_token,
      access_token_expires: Date.now() + 3 * 59 * 60 * 1000, // Keep old refresh token if not returned
    };
  } catch (error) {
    console.error('Failed to refresh access token:', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
