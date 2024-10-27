import React, { useEffect, useState } from 'react';
import { SessionContextValue, useSession } from 'next-auth/react';
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaChartArea,
} from 'react-icons/fa';
import { LuTableProperties } from 'react-icons/lu'; // Import the new icon
import Link from 'next/link';
import { actionLogout } from '@/action/auth.action';
import { User } from 'next-auth';
import { users_role } from '@/interfaces/user.interface';
import { avatar_src } from '@/config/images.config';
import { showAlert } from '@/lib/utils';

export default function NavbarProfileComponent() {
  const session = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) return;
    if (session.data?.user) setUser(session.data?.user);
  }, [session]);

  const logout = async () => {
    try {
      const res = await actionLogout();
      if (res) setUser(null);
      showAlert({
        icon: 'success',
        title: 'Logout Berhasil',
      });
      window.location.reload();
    } catch (error) {
      showAlert({
        icon: 'error',
        title: 'Error, Logout Gagal',
      });
    }
  };

  return (
    <div className="items-center justify-between">
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {/* Dashboard or Cart button based on user role */}
            {user.user_role === 'tenant' ? (
              <Link
                href="/dashboard"
                className="text-2xl text-zinc-400 transition-colors flex items-center justify-center hover:text-gray-700"
                title="Dashboard"
              >
                <FaChartArea />
              </Link>
            ) : (
              <Link
                href="/pesanan"
                className="text-2xl text-zinc-400 transition-colors flex items-center justify-center hover:text-gray-400"
                title="CartButton"
              >
                <FaShoppingCart />
              </Link>
            )}

            {user.user_role === 'tenant' && (
              <Link
                href="/dashboard/createProperti"
                title="Create"
                className="text-2xl text-zinc-400 transition-colors flex items-center justify-center hover:text-gray-700"
              >
                <LuTableProperties />
              </Link>
            )}

            {user.user_role !== 'tenant' && (
              <Link href="/profile" title="Profile">
                {user.image ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                    <img
                      title="avatar"
                      src={
                        user?.image
                          ? avatar_src + user?.image
                          : '/path/to/default-avatar.png'
                      }
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <FaUser className="text-zinc-400 text-2xl hover:text-gray-700 transition-colors" />
                )}
              </Link>
            )}

            <div className="text-sm">
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
          <>
            <Link href="/masuk" className="text-xs md:text-sm lg:text-base">
              Masuk
            </Link>
            <Link href="/daftar" className="text-xs md:text-sm lg:text-base">
              Daftar
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
