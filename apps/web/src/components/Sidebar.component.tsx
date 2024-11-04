'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';

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
    </>
  );
};

export default SidebarComponent;
