
import SidebarComponent from '@/components/Sidebar.component';


type Props = {};

export default function DashboardPage({}: Props) {
  return (
    <div className="px-2 py-2 mx-auto max-w-screen-xl">
      <div className="bg-white dark:bg-black">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Menu
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
              <SidebarComponent />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
