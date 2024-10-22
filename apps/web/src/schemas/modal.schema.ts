import { z } from 'zod';

export const uploadPaymentProofSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file?.size > 0, 'Gambar diperlukan!')
    .refine((file) => file?.size < 10485760, 'Ukuran gambar maksimal 10 MB'),
});
