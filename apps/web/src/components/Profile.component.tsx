'use client';
import { actionUpdateProfile } from '@/action/auth.action';
import { api } from '@/config/axios.config';
import { avatar_src } from '@/config/images.config';
import { User } from 'next-auth';
import { profileSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { z } from 'zod';
import { TiTick } from 'react-icons/ti';

const MySwal = withReactContent(Swal);

export default function ProfileComponent() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user) setUser(session?.user);
  }, [session]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      });
      setUser(response.data.data as User);
    }
    fetchData();
  }, [session]);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      image: user?.image || '',
      phone_number: user?.phone_number || '',
      password: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        image: user.image || '',
        phone_number: user.phone_number || '',
      });
    }
  }, [user, form]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const ref = useRef<HTMLInputElement>(null);

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

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phone_number', values.phone_number || '');
    if (values.image instanceof File) {
      formData.append('image', values.image);
    }
    if (values.password?.length) {
      formData.append('password', values.password);
    }
    try {
      await actionUpdateProfile(formData);
      Toast.fire({
        icon: 'success',
        title: 'Profil diperbarui',
      });
    } catch (err: any) {
      Toast.fire({
        icon: 'error',
        title: err.message,
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      form.setValue('image', file);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#C9EEFF] min-h-screen">
      <div className="container mx-auto p-4 max-w-lg bg-white rounded-lg shadow-xl">
        <h1 className="text-xl font-bold mx-auto justify-center mb-4 text-center">
          User Profile
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex space-x-6 items-start">
            <div className="flex flex-col items-center justify-center">
              <img
                src={
                  watch('image') instanceof File
                    ? URL.createObjectURL(watch('image'))
                    : user?.image
                      ? avatar_src + user?.image
                      : ''
                }
                alt="Profile Picture"
                className="w-28 h-28 rounded-full mb-2"
                onClick={() => ref.current?.click()}
              />
              <input
                type="file"
                {...register('image')}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                ref={ref}
              />
              <label
                className="cursor-pointer text-blue-500 mt-2"
                onClick={() => ref.current?.click()}
              ></label>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col space-y-4 flex-grow">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-700 text-sm">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className="border p-2 text-sm rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="phone_number" className="text-gray-700 text-sm">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  {...register('phone_number')}
                  className="border p-2 text-sm rounded"
                  placeholder="Enter your phone number"
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-xs">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 w-24 text-sm rounded disabled:bg-gray-700 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                Simpan
              </button>
              {user?.isVerified && (
                <div className="mt-2 text-green-500 text-sm flex items-center">
                  <strong>Account Verified</strong>
                  <TiTick className="ml-2 text-green-500" />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
