/** @format */

import { z } from 'zod';
export const registerSchema = z.object({
  name: z.string().min(5, {
    message: 'Silahkan masukan nama lengkap anda',
  }),
  phone_number: z.string({ message: 'Masukkan no handphone anda' }).min(9, {
    message:
      'Harap masukkan nomor telepon yang valid mulai dengan 0 atau 62 dan minimum 9 digit.',
  }),
  email: z.string().email().min(5, {
    message: 'silahkan masukan email anda',
  }),
  role: z.enum(['User', 'Tenant'], {
    message: 'silahkan pilih role anda terlebih dahulu',
  }),
});

export const verifyForgetPasswordSchema = z.object({
  password: z
    .string({ message: 'Mohon masukan kata sandi Anda.' })
    .min(6, {
      message:
        'Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka',
    })
    .regex(/[a-zA-Z]/, {
      message:
        'Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka',
    })
    .regex(/[0-9]/, {
      message:
        'Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka',
    })
    .trim(),
});

export const loginSchema = z.object({
  phone_number: z.string({ message: 'Masukkan no handphone anda' }).min(9, {
    message:
      'Harap masukkan nomor telepon yang valid mulai dengan 0 atau 62 dan minimum 9 digit.',
  }),
  password: z
    .string({ message: 'Mohon masukan kata sandi Anda.' })
    .min(6, {
      message:
        'Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka',
    })
    .regex(/[a-zA-Z]/, {
      message:
        'Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka',
    })
    .regex(/[0-9]/, {
      message:
        'Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka',
    })
    .trim(),
});
