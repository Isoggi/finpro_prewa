'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { loginAction, googleAuthenticate } from '@/action/auth.action';
import { loginSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorMessage } from '@hookform/error-message';
// import { useSession } from 'next-auth/react';
import { useFormState } from 'react-dom';
import Image from 'next/image';

const MySwal = withReactContent(Swal);

export default function Masuk() {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoginError, setIsLoginError] = useState<string | null>(null);
  // const router = useRouter();
  // const session = useSession();
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

  const [errorMsgGoogle, dispatchGoogle] = useFormState(
    googleAuthenticate,
    undefined,
  );

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await loginAction(values);
      setIsLoginSuccess(true);
      setIsLoginError(null);
      window.location.reload();

      // login berhasil
      Toast.fire({
        icon: 'success',
        title: res.message || 'Login berhasil',
      });
    } catch (err) {
      if (err instanceof Error) {
        setIsLoginError(err.message);
        setIsLoginSuccess(false);
        // login gagal
        Toast.fire({
          icon: 'error',
          title: err.message || 'Error, No atau Password anda salah',
        });
      }
    }
  };

  return (
    <div>
      <div className="breadcrumbs text-sm py-4 px-6">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>Masuk</li>
        </ul>
      </div>

      <div className="flex items-center px-4 justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Masukkan Email Kamu
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Silahkan masukan Email"
                {...register('email')}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage errors={errors} name="email" />
            </div>
            <div className="flex mb-4">
              <input
                type="password"
                placeholder="Silahkan masukan Password"
                {...register('password')}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage errors={errors} name="password" />
            </div>
            <p className="text-sm  mb-4">
              <a href="/lupapassword" className=" hover:underline">
                Lupa password?
              </a>
            </p>

            <button
              title="Login with Google"
              type="submit"
              className="bg-[#128ede] text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-gray-800"
              disabled={
                !isLoginError || isLoginSuccess || form.formState.isSubmitting
              }
            >
              Lanjut
            </button>
            <p className="text-sm text-center pt-5 mb-4">
              Belum punya akun?{' '}
              <a href="/daftar" className="text-blue-600 hover:underline">
                Daftar, yuk!
              </a>
            </p>
            <p className="text-sm text-center mb-4">
              <a href="/" className=" hover:underline">
                Kembali ke Home
              </a>
            </p>
            <h3 className="text-xl font-semibold mb-4 text-center">atau</h3>
          </form>
          <form action={dispatchGoogle}>
            <button
              title="Login with Google"
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full rounded-[25px] py-[12px] min-h-14  bg-[#e4002b]  shadow m-auto mb-[10px]"
            >
              {form.formState.isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                <>
                  <Image
                    src={
                      'https://www.svgrepo.com/show/380993/google-logo-search-new.svg'
                    }
                    alt="Google"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] mr-2"
                  />
                  {' Masuk dengan Google'}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
