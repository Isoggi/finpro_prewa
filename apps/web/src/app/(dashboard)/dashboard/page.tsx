import SidebarComponent from '@/components/Sidebar.component';

type Props = {};

export default function DashboardPage({}: Props) {
  return (
    <div className="px-2 py-2 mx-auto max-w-screen-xl">
      <div className="bg-white dark:bg-black">
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">Properties</div>
            <div className="stat-value">1</div>
            <div className="stat-desc">Jan 1st - Dec 31st</div>
          </div>

          <div className="stat">
            <div className="stat-title">New Booking</div>
            <div className="stat-value">1</div>
            <div className="stat-desc">↗︎ 1 (100%)</div>
          </div>

          <div className="stat">
            <div className="stat-title">New Stay</div>
            <div className="stat-value">0</div>
            <div className="stat-desc">↘︎ 0 (0%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
