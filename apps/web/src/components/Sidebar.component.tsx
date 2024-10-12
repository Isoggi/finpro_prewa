import Link from 'next/link';
import React from 'react';
import { headers } from 'next/headers';

const SidebarComponent: React.FC = () => {
  const headersList = headers();
  // read the custom x-url header
  const header_url = headersList.get('x-pathname') || '';
  // Function to return active class if the route matches the current path
  const isActive = (path: string) => {
    return header_url === path ? 'bg-primary text-white' : '';
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
