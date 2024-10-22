'use client';
import React from 'react';
import NavbarProfileComponent from './auth/navbarProfile';
import SearchBarComponent from './searchBar';
import Image from 'next/image';

export default function Navbar() {
  return (
    <>
      <nav className="bg-[#ffffff] dark:bg-base-100 p-4 shadow-md">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/prewa.png"
              alt="Prewa Logo"
              className="h-12"
              width={100}
              height={100}
            />
            <a href="#" className="text-sm hidden md:block">
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
      <SearchBarComponent />
    </>
  );
}
