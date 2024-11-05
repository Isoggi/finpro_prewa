'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { registerSchema } from '@/schemas/auth.schema';
import { actionRegister } from '@/action/auth.action';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const MySwal = withReactContent(Swal);

enum RoleEnum {
  User,
  Tenant,
}

export default function Daftar() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
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

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const res = await actionRegister(values);
      form.reset();
      router.push(
        `/konfirmasi-email?email=${encodeURIComponent(values.email)}`,
      );

      Toast.fire({
        icon: 'success',
        title: res.message || 'Daftar Berhasil',
      });
    } catch (err) {
      if (err instanceof Error) {
        Toast.fire({
          icon: 'error',
          title: `Daftar gagal: ${err.message}`,
        });
      }
    }
  };

  return (
    <div className="min-h-screen items-center justify-center px-4 bg-[#e6f2fe] relative">
      <div className="breadcrumbs text-sm py-4 px-6  text-black">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Daftar</li>
        </ul>
      </div>

      <div className="flex-grow flex py-8 items-center justify-center px-4">
        <div className="p-8 rounded-lg py-8 shadow-lg text-center max-w-sm w-full border bg-white border-white sm:mx-4">
          <img src="/prewa.jpg" alt="Logo" className="h-16 mx-auto mb-8 " />

          <h1 className="text-black text-2xl font-bold mb-6">Selamat Datang</h1>
          <h5 className="text-black mb-4">
            Mohon masukkan data anda untuk Daftar
          </h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                className="w-full p-3 border border-black rounded-lg text-black  placeholder-gray-300"
                type="text"
                placeholder="Full Name"
                {...register('name')}
                required
              />
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage errors={errors} name="name" />
              </div>
            </div>
            <div className="mb-4">
              <input
                className="w-full p-3 border border-black rounded-lg text-black bg-transparent placeholder-gray-300"
                type="text"
                placeholder="Phone Number"
                {...register('phone_number')}
                required
              />
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage errors={errors} name="phone_number" />
              </div>
            </div>
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
            <div className="mb-4">
              <select
                className="w-full p-3 border rounded-lg text-black bg-transparent"
                required
                defaultValue=""
                {...register('role')}
              >
                <option disabled value={''}>
                  Daftar sebagai
                </option>
                {(Object.keys(RoleEnum) as Array<keyof typeof RoleEnum>).map(
                  (role) =>
                    !Number.isInteger(Number(role)) ? (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ) : null,
                )}
              </select>
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage errors={errors} name="role" />
              </div>
            </div>

            <button
              className="w-full py-3 bg-[#e6f2fe] text-black rounded-full flex items-center justify-center mb-4"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Lanjut
            </button>
          </form>

          <p className="text-black">
            Sudah memiliki akun?{' '}
            <Link href="/masuk" className="text-black font-semibold">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
