'use client';
import React, { useState } from 'react';
import { loginAction, googleAuthenticate } from '@/action/auth.action';
import { loginSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorMessage } from '@hookform/error-message';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { showAlert } from '@/lib/utils';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
export default function Masuk() {
  const [errorMsgGoogle, dispatchGoogle] = useFormState(
    googleAuthenticate,
    undefined,
  );

  const [showPassword, setShowPassword] = useState(false);

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
      window.location.reload();

      showAlert({
        icon: 'success',
        title: res.message || 'Login berhasil',
      });
    } catch (err) {
      if (err instanceof Error) {
        showAlert({
          icon: 'error',
          title: err.message || 'Error, No atau Password anda salah',
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
          <li>Masuk</li>
        </ul>
      </div>

      <div className="flex-grow flex py-8 items-center justify-center px-4">
        <div className="p-8 rounded-lg py-8 shadow-lg text-center max-w-sm w-full border bg-white border-white sm:mx-4">
          <img src="/prewa.jpg" alt="Logo" className="h-16 mx-auto mb-8 " />
          <h1 className="text-black text-2xl font-bold mb-6">Selamat Datang</h1>
          <h5 className="text-black mb-4">
            Mohon masukkan data anda untuk Masuk
          </h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Silahkan masukan Email"
                {...register('email')}
                className="w-full p-3 border border-gray-300 rounded-lg text-black bg-transparent placeholder-gray-300"
              />
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage errors={errors} name="email" />
              </div>
            </div>

            <div className="mb-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Silahkan masukan Password"
                {...register('password')}
                className="w-full p-3 border border-gray-300 rounded-lg text-black bg-transparent placeholder-gray-300"
              />
              <button
                type="button"
                className="absolute right-3 top-4 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage errors={errors} name="password" />
              </div>
            </div>

            <p className="text-sm mb-4 text-left">
              <Link
                href="/forgetpassword"
                className="text-black hover:underline"
              >
                Lupa password?
              </Link>
            </p>

            <button
              title="Login with email"
              type="submit"
              className="w-full py-3 bg-[#e6f2fe] text-black rounded-full flex items-center justify-center mb-4  disabled:btn-disabled"
              disabled={form.formState.isSubmitting}
            >
              Lanjut
            </button>
            <p className="text-sm text-center pt-5 mb-4 text-black">
              Belum punya akun?{' '}
              <Link
                href="/daftar"
                className="text-black font-semibold hover:underline"
              >
                Daftar, yuk!
              </Link>
            </p>

            <h3 className="text-xl font-semibold mb-4 text-center text-black">
              atau
            </h3>
          </form>
          <form action={dispatchGoogle}>
            <button
              title="Login with Google"
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full rounded-[25px] py-[12px] min-h-14  bg-gray-100  shadow-xl m-auto mb-[10px] flex items-center justify-center disabled:btn-disabled"
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
