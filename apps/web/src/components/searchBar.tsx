import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';

type Props = {};

export default function SearchBarComponent({}: Props) {
  const [user, setUser] = React.useState<User | null>(null);
  const session = useSession();
  React.useEffect(() => {
    if (user) return;
    if (session.data?.user) setUser(session.data?.user);
  }, [session]);
  return (
    <div>
      {user?.user_role === 'user' && (
        <div className="bg-[#e6f2fe] dark:bg-base-100 p-6 shadow-md">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-full shadow-lg">
            <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
              <span className="text-sm ">Indonesia</span>
            </div>
            <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
              <span className="text-sm ">
                <input title="tanggal" type="date" />
              </span>
            </div>
            <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
              <select title="pilih jenisnya" id="category" className="text-sm">
                <option value="apartemen">Apartemen</option>
                <option value="hotel">Hotel</option>
                <option value="vila">Vila</option>
              </select>
            </div>

            <button className="bg-[#128ede] text-white p-2 px-4 rounded-xl">
              Cari Hunian
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
