// import EventCard from "@/components/Card.component";
// // import Sidebar from "@/components/dashboard/Sidebar";
// import SidebarFilter from "@/components/EventFilter.component";
import Link from "next/link";
import React from "react";

type Props = {};

export default function EventsPage({}: Props) {
  return (
    <div className="px-2 py-2 mx-auto max-w-screen-xl">
      <div className="breadcrumbs text-sm px-2">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Events</li>
        </ul>
      </div>
      <div className="bg-white dark:bg-black">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Filter
        </label>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* <EventCard /> */}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu text-base-content min-h-full w-80 p-4">
              {/* <SidebarFilter /> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
