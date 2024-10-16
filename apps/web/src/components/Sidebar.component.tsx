'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const SidebarComponent: React.FC = () => {
  const [activeUrl, setActiveUrl] = React.useState<string>('dashboard');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  React.useEffect(() => {
    setActiveUrl(pathname);
  }, [pathname, searchParams]);
  const isActive = (path: string) => {
    return activeUrl === path ? 'bg-[#00A9FF] text-white' : '';
  };
  return (
    <>
      {/* Sidebar Links */}
      <li>
        <Link href="/">
          <p className={`p-2 rounded ${isActive('/')}`}>Home</p>
        </Link>
      </li>
      <li>
        <Link href="/dashboard">
          <p className={`p-2 rounded ${isActive('/dashboard')}`}>Dashboard</p>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/pesanan">
          <p className={`p-2 rounded ${isActive('/dashboard/pesanan')}`}>
            Pesanan
          </p>
        </Link>
      </li>
    </>
  );
};

export default SidebarComponent;
