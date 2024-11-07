'use client';
import React from 'react';
import NavbarProfileComponent from './auth/navbarProfile';
import SearchBarComponent from './searchBar';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isPropertyDetail =
    pathname.includes('/properti/') || pathname.includes('/room/');
  return (
    <>
      <nav className="bg-[#ffffff] dark:bg-base-100 p-4 shadow-md">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a title="Prewa" href="/">
              <Image
                src="/prewa.png"
                alt="Prewa Logo"
                className="h-12"
                width={100}
                height={100}
              />
            </a>

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
      {!isPropertyDetail && <SearchBarComponent />}
    </>
  );
}
