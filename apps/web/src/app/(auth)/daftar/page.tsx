'use client';
import React, { useState } from 'react';
import { actionRegister } from '@/action/auth.action';
import { registerSchema } from '@/schemas/auth.schema';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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
      console.log('regis:', values);
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

  // const [phone, setPhone] = useState<string>('');
  // const [role, setRole] = useState<string>('');

  // const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPhone(e.target.value);
  // };

  // const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setRole(e.target.value);
  // };

  // const handleSubmitt = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(`Phone: ${phone}, Role: ${role}`);
  // };

  return (
    <div>
      <div className="breadcrumbs text-sm py-4 px-6">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>Daftar</li>
        </ul>
      </div>
      <div className="flex items-center justify-center px-4 min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Masukkan Email Kamu
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  className="w-full p-2 border-gray-300 rounded-md"
                  type="text"
                  placeholder="Full Name"
                  {...register('name')}
                  required
                />
                <div className="text-red-500 text-sm mt-1">
                  <ErrorMessage errors={errors} name="name" />
                </div>
              </div>
              <div>
                <input
                  className="w-full p-2 border-gray-300 rounded-md"
                  type="text"
                  placeholder="Phone Number"
                  {...register('phone_number')}
                  required
                />
                <div className="text-red-500 text-sm mt-1">
                  <ErrorMessage errors={errors} name="phone_number" />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <input
                className="w-full p-2 border-gray-300 rounded-md"
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
                className="w-full p-2 border-gray-300  rounded-md"
                required
                defaultValue={''}
                {...register('role')}
              >
                <option disabled value={''}>
                  Daftar sebagai...
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
              className="w-full py-2 px-4 bg-[#128ede] text-white rounded-md hover:bg-purple-700 transition disabled:bg-[#128ede] disabled:text-white disabled:cursor-not-allowed"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Lanjut
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
