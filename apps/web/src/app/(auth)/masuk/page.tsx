'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { loginAction, googleAuthenticate } from '@/action/auth.action';
import { loginSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorMessage } from '@hookform/error-message';
import { useSession } from 'next-auth/react';

const MySwal = withReactContent(Swal);

export default function Masuk() {
  const [termCheck, setTermCheck] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoginError, setIsLoginError] = useState<string | null>(null);
  const router = useRouter();

  const session = useSession();
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
        title: 'Login berhasil',
      });
    } catch (err) {
      if (err instanceof Error) {
        setIsLoginError(err.message);
        setIsLoginSuccess(false);

        // login gagal
        Toast.fire({
          icon: 'error',
          title: 'Error, No atau Password anda salah',
        });
      }
    }
  };

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

  const [phone, setPhone] = useState<string>('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Phone number submitted: ${phone}`);
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
          <form onSubmit={handleSubmid}>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Silahkan masukan Email"
                value={phone}
                onChange={handlePhoneChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Silahkan masukan Password"
                value={phone}
                onChange={handlePhoneChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <p className="text-sm  mb-4">
              <a href="/" className=" hover:underline">
                Lupa password?
              </a>
            </p>

            <button
              type="submit"
              className="bg-[#128ede] text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-gray-800"
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
          </form>
        </div>
      </div>
    </div>
  );
}
