import { ReactNode } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="flex h-screen">
          {/* Sidebar Drawer */}
          <input
            title="menu"
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer drawer-mobile">
            <div className="drawer-content flex flex-col">
              {/* Page content */}
              <div className="p-4">{children}</div>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay">
                Menu
              </label>
              <ul className="menu p-4 w-64 bg-base-200 text-base-content">
                {/* Sidebar content */}
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dahsboard</Link>
                </li>
                <li>
                  <Link href="/dashboard/pesanan">Pesanan</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
