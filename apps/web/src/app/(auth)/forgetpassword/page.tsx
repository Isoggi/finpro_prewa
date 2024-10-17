'use client';
import React from 'react';
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
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="breadcrumbs text-sm py-4 px-6 text-white">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Lupa Password</li>
        </ul>
      </div>

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="p-8 rounded-lg shadow-lg text-center max-w-sm w-full border border-white sm:mx-4">
          <h1 className="text-white text-2xl font-bold mb-6">Lupa Password</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                className="w-full p-3 border border-gray-300 rounded-lg text-white bg-transparent placeholder-gray-300"
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
              className="w-full py-3 bg-white text-black rounded-full flex items-center justify-center mb-4"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
