import { z } from 'zod';
import validator from 'validator';

export const createPropertiSchema = z.object({
  name: z.string().min(5, {
    message: ' silahkan masukan nama properti',
  }),
  description: z
    .string()
    .min(5, {
      message: 'Minimal 5 karakter',
    })
    .max(100, {
      message: 'Maksimal 100 karakter',
    }),
  image: z.any(),
  tenant_id: z.string({ message: 'Silahkan Pilih tenant ' }),
  category_id: z.string({ message: 'Silahkan Pilih Category Properti ' }),
  address_id: z.string({ message: 'Silahkan pilih address' }),
  slug_address: z.string({ message: 'silahkan masukan slug_address' }),
});
