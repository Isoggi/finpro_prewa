import { z } from 'zod';
import validator from 'validator';
export const registerSchema = z.object({
  name: z.string().min(5, {
    message: 'Silahkan masukan nama lengkap anda',
  }),
  phone_number: z
    .string({ message: 'Masukkan no handphone anda' })
    .min(9, {
      message:
        'Harap masukkan nomor telepon yang valid mulai dengan 0 atau 62 dan minimum 9 digit.',
    })
    .refine(validator.isMobilePhone, {
      message: 'Nomor telepon tidak valid',
    }),
  email: z.string().email().min(5, {
    message: 'silahkan masukan email anda',
  }),
  role: z.enum(['User', 'Tenant'], {
    message: 'silahkan pilih role anda',
  }),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email().min(5, {
    message: 'silahkan masukan email anda',
  }),
});

export const verifyForgetPasswordSchema = z
  .object({
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
    confirm_password: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: 'Silakan masukkan kata sandi yang sama.',
      path: ['confirm_password'],
    },
  );

export const loginSchema = z.object({
  email: z.string().email().min(5, {
    message: 'silahkan masukan email anda',
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

export const profileSchema = z.object({
  name: z.string().min(5, {
    message: 'Silahkan masukan nama lengkap anda',
  }),
  password: z
    .string({ message: 'masukan kata sandi' })
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

    .trim()
    .optional(),
  phone_number: z
    .string({ message: 'Mohon masukan nomor telepon Anda.' })
    .min(8, {
      message: 'Mohon masukan nomor telepon yang valid.',
    }),
  image: z.any().optional(),
});
