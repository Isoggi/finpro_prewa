import { ReactNode } from 'react';
// import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SidebarComponent from '@/components/Sidebar.component';

interface LayoutProps {
  children: ReactNode;
}

const Template = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Menu
        </label>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content */}
            <div className="p-4">{children}</div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            {/* <ul className="menu p-4 w-64 bg-base-200 text-base-content"> */}
            <ul className="menu text-base-content min-h-full w-80 p-4">
              {/* Sidebar content */}
              {/* <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/dashboard">Dahsboard</Link>
              </li>
              <li>
                <Link href="/dashboard/pesanan">Pesanan</Link>
              </li> */}
              <SidebarComponent />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
