import React from 'react';
import NavbarProfileComponent from './auth/navbarProfile';

export default function Navbar() {
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
        <div className="hidden md:flex max-w-screen-xl mx-auto justify-between items-center bg-white p-6 rounded-full shadow-lg">
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
              <option value="Kos">Kos</option>
            </select>
          </div>

          <button className="bg-[#00A9FF] text-white p-2 px-4 rounded-xl">
            Cari Hunian
          </button>
        </div>

        <div className="flex md:hidden flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center border-b pb-2">
            <input
              type="text"
              placeholder="Mau ke mana?"
              className="w-full p-2 text-sm focus:outline-none"
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex items-center border-b pb-2 md:pb-0">
              <label className="mr-2 text-sm">Check in</label>
              <input type="date" className="text-sm focus:outline-none" />
            </div>
            <div className="flex items-center border-b pb-2 md:pb-0">
              <label className="mr-2 text-sm">Check out</label>
              <input type="date" className="text-sm focus:outline-none" />
            </div>
          </div>

          <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
            <select title="pilih jenisnya" id="category" className="text-sm">
              <option value="apartemen">Apartemen</option>
              <option value="hotel">Hotel</option>
              <option value="Kos">Kos</option>
            </select>
          </div>

          <button className="bg-[#00A9FF] text-white py-2 px-4 rounded-lg text-center">
            CARI
          </button>
        </div>
      </div>
    </>
  );
}
