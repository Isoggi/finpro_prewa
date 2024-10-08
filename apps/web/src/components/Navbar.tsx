import React from 'react';
import Link from 'next/link';
export default function Navbar() {
  return (
    <>
      <nav className="bg-[#ffffff] p-4 shadow-md">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/prewa.jpg" alt="Rukita Logo" className="h-12" />
            <a href="#" className="text-sm   hidden md:block">
              Sewa
            </a>
            <a href="#" className="text-sm hidden md:block">
              Kerjasama Rukita
            </a>
            <a href="#" className="text-sm hidden md:block">
              Rukita for Business
            </a>
            <a href="#" className="text-sm hidden md:block">
              Tentang Prewa
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/masuk" className="text-xs md:text-sm lg:text-base">
              Masuk
            </Link>
            <Link href="/daftar" className="text-xs md:text-sm lg:text-base">
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      <div className="bg-[#e6f2fe] p-6 shadow-md">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-full shadow-lg">
          <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
            <span className="text-sm ">Indonesia</span>
          </div>

          <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
            <span className="text-sm ">4 Oct 24 - Belum Tahu</span>
          </div>

          <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
            <span className="text-sm ">Apartemen</span>
          </div>
          <button className="bg-[#128ede] text-white p-2 px-4 rounded-xl">
            Cari Hunian
          </button>
        </div>
      </div>
    </>
  );
}
