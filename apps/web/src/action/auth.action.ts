'use server';
import { api } from '@/config/axios.config';
import {
  loginSchema,
  verifyForgetPasswordSchema,
  profileSchema,
  registerSchema,
} from '@/schemas/auth.schema';
import { z } from 'zod';
import { auth, signIn, signOut, unstable_update } from '@/auth';
import { AuthError, User } from 'next-auth';
import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn('credentials', {
      ...values,
      redirect: false,
    });
    return {
      message: 'Login Berhasil',
    };
  } catch (error) {
    throw error;
  }
};

export const actionUpdateProfile = async (values: FormData) => {
  try {
    // Get current session
    const session = await auth();

    if (!session?.user?.access_token) {
      throw new Error('Unauthorized: No access token');
    }

    // Make API request with proper headers
    const res = await api.put('/auth/profile', values, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${session.user.access_token}`,
      },
    });

    if (!res.data || !res.data.data) {
      throw new Error('Invalid response from server');
    }

    // Decode and update session
    try {
      const user = jwtDecode(res.data.data) as User;
      user.access_token = res.data.data;

      await unstable_update({
        ...session,
      });

      return {
        success: true,
        message: res.data.message || 'Profile updated successfully',
        user,
      };
    } catch (decodeError) {
      console.error('Token decode error:', decodeError);
      throw new Error('Failed to process server response');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'Server error occurred';
      throw new Error(message);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to update profile');
  }
};

export const actionLogout = async () => {
  return await signOut({ redirect: false });
};

export const actionRegister = async (
  values: z.infer<typeof registerSchema>,
) => {
  try {
    const res = await api.post('/auth/register', values);

    return {
      message: 'Daftar Berhasil',
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw new Error('Daftar Gagal');
  }
};

export const actionConfirmVerifyPassword = async (
  token: string,
  password: string,
) => {
  try {
    await api.patch('/auth/confirm-verify-password', { token, password });

    return {
      message: 'Verifikasi Berhasil',
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw new Error('Verifikasi Gagal');
  }
};

export const forgetPassword = async (email: string) => {
  try {
    const res = await api.post('/auth/forget-password', { email });
    return {
      message: 'Link untuk reset password telah dikirimkan ke email',
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || 'Kesalahan tidak diketahui';
      throw new Error(errorMessage);
    }
    throw new Error('Permintaan reset password gagal');
  }
};

export const actionConfirmForgetPassword = async (
  token: string,
  password: string,
) => {
  try {
    await api.patch('/auth/confirm-forget-password', { token, password });
    return {
      message: 'Reset Password Berhasil',
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw new Error('Reset Password Gagal');
  }
};

export const actionLogOut = async () => {
  try {
    return await signOut({ redirect: false, redirectTo: '/masuk' });
    // return {
    //   message: "Logout Berhasil",
    // };
  } catch (error) {
    return {
      message: 'Logout Gagal',
    };
  }
};

export const actionRefreshToken = async () => {
  try {
  } catch (error) {
    return {
      message: 'Logout Gagal',
    };
  }
};

export async function googleAuthenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('action Google', prevState, formData);
    await signIn('google');
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Google Log In failed';
    }
    throw error;
  }
}
