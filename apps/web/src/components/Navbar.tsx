'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import NavbarProfileComponent from './auth/navbarProfile';

export default function Navbar() {
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
    <>
      <nav className="bg-[#ffffff] p-4 shadow-md">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/prewa.jpg" alt="Prewa Logo" className="h-12" />
            <a href="#" className="text-sm   hidden md:block">
              Sewa
            </a>
            <a href="#" className="text-sm hidden md:block">
              Kerjasama Prewa
            </a>
            <a href="#" className="text-sm hidden md:block">
              Prewa for Business
            </a>
            <a href="#" className="text-sm hidden md:block">
              Tentang Prewa
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <NavbarProfileComponent />
          </div>
        </div>
      </nav>

      <div className="bg-[#e6f2fe] p-6 shadow-md">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-full shadow-lg">
          <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
            <span className="text-sm ">Indonesia</span>
          </div>
          <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
            <span className="text-sm ">
              <input title="tanggal" type="date" />
            </span>
          </div>
          <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
            <select title="pilih jenisnya" id="category" className="text-sm">
              <option value="apartemen">Apartemen</option>
              <option value="hotel">Hotel</option>
              <option value="vila">Vila</option>
            </select>
          </div>

          <button className="bg-[#128ede] text-white p-2 px-4 rounded-xl">
            Cari Hunian
          </button>
        </div>
      </div>
    </>
  );
}
