'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';
import { LuCalendarClock, LuTableProperties } from 'react-icons/lu';
import { BiSolidCategory } from 'react-icons/bi';
import { MdBedroomChild, MdEventAvailable } from 'react-icons/md';

const SidebarComponent: React.FC = () => {
  const [activeUrl, setActiveUrl] = React.useState<string>('dashboard');
  const pathname = usePathname();
  React.useEffect(() => {
    console.log(pathname);
    setActiveUrl(pathname);
  }, [pathname]);
  const isActive = (path?: string) => {
    return activeUrl.split('/')[2] === path ? 'bg-[#00A9FF] text-white' : '';
  };
  return (
    <>
      {/* Sidebar Links */}
      <li>
        <Link href="/">
          <p className={`p-2 rounded hover:animate-bounce`}>
            <FaChevronLeft />
          </p>
        </Link>
      </li>
      <li>
        <Link href="/dashboard">
          <p className={`p-2 rounded ${isActive()}`}>Dashboard</p>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/pesanan">
          <p className={`p-2 rounded ${isActive('pesanan')}`}>Pesanan</p>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/laporan">
          <p className={`p-2 rounded ${isActive('laporan')}`}>Laporan</p>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/properti">
          <p className={`p-2 rounded ${isActive('properti')}`}>
            <LuTableProperties /> Properti
          </p>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/room">
          <p className={`p-2 rounded ${isActive('room')}`}>
            <MdBedroomChild /> Room
          </p>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/category">
          <p className={`p-2 rounded ${isActive('category')}`}>
            <BiSolidCategory /> Kategori
          </p>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/availability">
          <p className={`p-2 rounded ${isActive('availability')}`}>
            <MdEventAvailable /> Availability
          </p>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/peakseason">
          <p className={`p-2 rounded ${isActive('peakseason')}`}>
            <LuCalendarClock />
            Peak Season
          </p>
        </Link>
      </li>
    </>
  );
};

export default SidebarComponent;
