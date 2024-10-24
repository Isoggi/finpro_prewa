'use client';
import { api } from '@/config/axios.config';
import { trx_src } from '@/config/images.config';
import { showAlert } from '@/lib/utils';
import { uploadPaymentProofSchema } from '@/schemas/modal.schema';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = { id: string; trx_id: number; token: string | undefined };

export default function UploadPayementProofModal({ id, trx_id, token }: Props) {
  const form = useForm<z.infer<typeof uploadPaymentProofSchema>>({
    resolver: zodResolver(uploadPaymentProofSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = form;

  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  const ref = React.useRef<HTMLInputElement>(null);
  const onSubmit = async (values: z.infer<typeof uploadPaymentProofSchema>) => {
    const form = new FormData();
    form.append('image', values.image);
    try {
      const response = await api.post(
        '/order/upload-payment-proof',
        {
          id: trx_id,
          image: values.image,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showAlert({
        title: 'Berhasil',
        text: `${response.data.message}`,
        icon: 'success',
      });
    } catch (error) {
      if (error instanceof Error) {
        showAlert({
          title: 'Error',
          text: error.message,
          icon: 'error',
        });
      }

      console.log(error);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue('image', e.target.files[0]); // Use react-hook-form's setValue to set the file
    }
  };

  return (
    <div>
      <button
        type="button"
        title="Konfirmasi bayar"
        className="btn btn-sm btn-primary hover:text-red-500"
        onClick={(e) => {
          e.stopPropagation();
          if (dialog) dialog.showModal();
        }}
      >
        Unggah bukti bayar
      </button>
      <dialog id={id} className="modal modal-bottom lg:modal-middle">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" text-[15px] flex flex-col m-auto"
          >
            <div className="relative m-auto py-5">
              <Image
                alt="payment proof"
                width={200}
                height={200}
                src={
                  form.watch('image') instanceof File
                    ? window.URL.createObjectURL(form.watch('image'))
                    : '/prewa.jpg'
                }
                className="rounded-xl w-[200px] aspect-auto object-cover"
                onClick={() => ref.current?.click()}
              />
              <input
                type="file"
                className="hidden"
                placeholder="image"
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    setValue('image', file);
                  }
                }}
                accept="image/*"
                ref={ref}
              />
            </div>
            <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
              <ErrorMessage errors={errors} name={'image'} />
            </div>
            <div className="form-control mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-sm btn-warning  max-w-[520px] shadow m-auto"
              >
                Unggah
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button">tutup</button>
        </form>
      </dialog>
    </div>
  );
}
