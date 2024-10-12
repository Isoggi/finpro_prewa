'use client';
import React, { useEffect, useState } from 'react';
import { SessionContextValue, useSession } from 'next-auth/react';

import { FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Link from 'next/link';
import { actionLogout } from '@/action/auth.action';
import { User } from 'next-auth';

const MySwal = withReactContent(Swal);
export default function NavbarProfileComponent() {
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
  const session = useSession();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (session.data?.user) setUser(session.data?.user);
  }, [session]);
  const logout = async () => {
    try {
      const res = await actionLogout();
      if (res) setUser(null);
      Toast.fire({
        icon: 'success',
        title: 'Logout Berhasil',
      });
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Error, Logout Gagal',
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 items-center justify-between">
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {user.user_role === 'tenant' ? (
              <Link
                href="/dashboard"
                className="text-2xl text-white transition-colors flex items-center justify-center hover:text-gray-400"
                title="CartButton"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/pesanan"
                className="text-2xl text-white transition-colors flex items-center justify-center hover:text-gray-400"
                title="CartButton"
              >
                <FaShoppingCart />
              </Link>
            )}

            <Link href="/profile" title="Profile">
              {user.image ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    title="avatar"
                    src={user.image}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <FaUser className="text-gray-500 text-2xl hover:text-gray-700 transition-colors" />
              )}
            </Link>

            <div className="text-white text-sm">
              <span className="truncate">Hi, {user.name}</span>
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
          //   <div className="text-white">Loading...</div>
          <>
            <Link href="/masuk" className="text-xs md:text-sm lg:text-base">
              Masuk
            </Link>
            <Link href="/daftar" className="text-xs md:text-sm lg:text-base">
              Daftar
            </Link>
            <Link href="/dashboard" className="text-xs md:text-sm lg:text-base">
              Dashboard
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
