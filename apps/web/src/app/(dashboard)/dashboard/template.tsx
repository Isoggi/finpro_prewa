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
      <div className="flex">
        <div className="drawer lg:drawer-open">
          <input
            id="dashboard-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content flex flex-col items-center justify-center">
            <div className="navbar bg-base-300 w-full lg:hidden">
              <div className="flex-none">
                <label
                  htmlFor="dashboard-drawer"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2">Menu</div>
            </div>

            {/* Page content */}
            <div className="lg:p-4 w-full">{children}</div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="dashboard-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            {/* <ul className="menu p-4 w-64 bg-base-200 text-base-content"> */}
            <ul className="menu text-base-content bg-base-100 min-h-full w-80 p-4">
              <SidebarComponent />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
