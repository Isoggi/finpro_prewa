'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { forgetPasswordSchema } from '@/schemas/auth.schema';
import { forgetPassword } from '@/action/auth.action';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const MySwal = withReactContent(Swal);

export default function ForgetPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {},
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;
  const router = useRouter();
  const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const onSubmit = async (values: z.infer<typeof forgetPasswordSchema>) => {
    if (isSubmitted) {
      Toast.fire({
        icon: 'error',
        title: 'Request already submitted. Please check your email.',
      });
      return;
    }

    setIsSubmitted(true);

    try {
      const res = await forgetPassword(values.email);
      form.reset();
      Toast.fire({
        icon: 'success',
        title: res.message || 'Email reset password telah dikirim',
      });
    } catch (err) {
      if (err instanceof Error) {
        Toast.fire({
          icon: 'error',
          title: `Gagal mengirim: ${err.message}`,
        });
      }
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#e6f2fe] flex-col">
      <div className="breadcrumbs text-sm py-4 px-6 text-black">
        <ul>
          <li>
            <Link href="/masuk">Masuk</Link>
          </li>
          <li>Lupa Password</li>
        </ul>
      </div>

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="p-8 rounded-lg shadow-lg text-center max-w-4xl w-full border bg-white border-white sm:mx-4 flex flex-col sm:flex-row items-center">
          <div className="w-full sm:w-2/3 mb-6 sm:mb-0 sm:mr-4 flex justify-center">
            <img
              src="/lupapw.png"
              alt="Forgot Password Illustration"
              className="w-full"
            />
          </div>

          <div className="w-full sm:w-2/3 text-left">
            <h1 className="text-black text-2xl font-bold mb-6">
              Lupa Password
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  className="w-full p-3 border border-black rounded-lg text-black bg-transparent placeholder-gray-300"
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  required
                />
                <div className="text-red-500 text-sm mt-1">
                  <ErrorMessage errors={errors} name="email" />
                </div>
              </div>
              <button
                className="w-full py-3 bg-[#e6f2fe] text-black rounded-full flex items-center justify-center mb-4"
                type="submit"
                disabled={form.formState.isSubmitting || isSubmitted}
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
