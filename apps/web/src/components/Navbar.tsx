'use client';
import React from 'react';
import NavbarProfileComponent from './auth/navbarProfile';
import SearchBarComponent from './searchBar';

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
      <SearchBarComponent />
    </>
  );
}
