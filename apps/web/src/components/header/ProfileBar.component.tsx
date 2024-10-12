'use client';
import React, { useState } from 'react';
import { SessionContextValue } from 'next-auth/react';
import { actionLogOut } from '@/action/auth.action';
import { FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Link from 'next/link';

const MySwal = withReactContent(Swal);

type Props = { session: SessionContextValue | null };

export default function ProfileBarComponent({ session }: Props) {
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
  const [isLogoutError, setIsLogoutError] = useState(false);

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

  const logout = async () => {
    try {
      await actionLogOut();
      setIsLogoutSuccess(true);
      Toast.fire({
        icon: 'success',
        title: 'Logout Berhasil',
      });
    } catch (error) {
      setIsLogoutError(true);
      Toast.fire({
        icon: 'error',
        title: 'Error, Logout Gagal',
      });
    }
  };

  return (
    <div className=" items-center justify-between  ">
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <Link
              href="/"
              className="text-2xl text-white transition-colors flex items-center justify-center hover:text-gray-400"
              title="CartButton"
            >
              <FaShoppingCart />
            </Link>

            <Link href="/profile" title="Profile">
              {session.data?.user.image ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    title="avatar"
                    src={session.data?.user.image}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <FaUser className="text-gray-500 text-2xl hover:text-gray-700 transition-colors" />
              )}
            </Link>

            <div className="text-white text-sm">
              <span className="truncate">Hi, {session.data?.user.name}</span>
            </div>

            <button
              type="button"
              title="Logout"
              className="text-red-700 hover:text-red-900 transition-colors"
              onClick={logout}
            >
              <FaSignOutAlt className="text-2xl" />
            </button>
          </>
        ) : (
          <div className="text-white">Loading...</div>
        )}
      </div>
    </div>
  );
}
