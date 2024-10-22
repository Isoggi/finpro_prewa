'use client';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
type Props = {};

export default function SearchBarComponent({}: Props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categories, SetCategories] = useState('');
  const [location, setLocation] = useState('');

  const router = useRouter();
  const handleFilterClick = () => {
    router.push(
      `/properti?category=${categories}&location=${location}&startDate=${startDate}&endDate=${endDate}`,
    );
  };

  const handleChange = () => {};

  const [user, setUser] = React.useState<User | null>(null);
  const session = useSession();
  React.useEffect(() => {
    if (user) return;
    if (session.data?.user) setUser(session.data?.user);
  }, []);
  return (
    <div>

      {user?.user_role === 'user' && (
        <div className="bg-[#e6f2fe] dark:bg-base-100 p-6 shadow-md">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center bg-white dark:bg-base-100 p-6 rounded-full shadow-lg">
            <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
              <select
                title="pilih jenisnya"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-sm "
              >
                <option value="Jakarta Selatan">Jakarta Selatan</option>
                <option value="Kab. Tangerang">Kab. Tangerang</option>
              </select>
            </div>
            <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
              <span className="text-sm ">
                <input
                  type="date"
                  id="Start Date"
                  placeholder="Tanggal Mulai"
                  className="input input-bordered w-full md:max-w-xs"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />

                {/* End Date Picker */}
                <input
                  type="date"
                  id="End Date"
                  className="input input-bordered w-full md:max-w-xs"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </span>
            </div>
            <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
              <select
                title="pilih jenisnya"
                id="category"
                value={categories}
                onChange={(e) => SetCategories(e.target.value)}
                className="text-sm"
              >
                <option value="apartemen">Apartemen</option>
                <option value="hotel">Hotel</option>
                <option value="Kos">Kos</option>
              </select>
            </div>
            <button
              className="bg-[#128ede] text-white p-2 px-4 rounded-xl"
              type="button"
              onClick={handleFilterClick}
            >
              Cari Hunian
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
