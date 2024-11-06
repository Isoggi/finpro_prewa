'use client';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/config/axios.config';
import { IoIosSearch } from 'react-icons/io';
export default function SearchBarComponent() {
  const params = useSearchParams();
  const today = params.get('start_date')
    ? new Date(Date.parse(params.get('start_date') ?? ''))
        .toISOString()
        .split('T')[0]
    : new Date().toISOString().split('T')[0];
  const tomorrow = params.get('end_date')
    ? new Date(Date.parse(params.get('end_date') ?? ''))
        .toISOString()
        .split('T')[0]
    : new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split('T')[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [location, setLocation] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const session = useSession();

  const locations = ['Jakarta Selatan', 'Kab. Tangerang'];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get('/category');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Failed to load category:', error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    if (user) return;
    if (session.data?.user) setUser(session.data?.user);
  }, [session, user]);

  const handleFilterClick = () => {
    router.push(
      `/properti?category=${categoryName}&location=${location}&startDate=${startDate}&endDate=${endDate}`,
    );
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (newStartDate > endDate) {
      setEndDate(newStartDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    if (newEndDate >= startDate) {
      setEndDate(newEndDate);
    } else {
      alert('End date cannot be earlier than start date');
    }
  };

  const showLocationModal = () => {
    const locationModal = document.getElementById(
      'location_modal',
    ) as HTMLDialogElement | null;
    locationModal?.showModal();
  };

  const showCategoryModal = () => {
    const categoryModal = document.getElementById(
      'category_modal',
    ) as HTMLDialogElement | null;
    categoryModal?.showModal();
  };

  return (
    <div>
      {user?.user_role !== 'tenant' && (
        <div className="bg-[#e6f2fe] dark:bg-[#535C91] p-6 shadow-md">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center bg-white dark:bg-[#1B1A55]] p-6 rounded-full shadow-lg">
            <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
              <button
                onClick={showLocationModal}
                className="text-sm hover:text-blue-500"
              >
                {location || 'PIlih Lokasi'}
              </button>
            </div>

            <div className="flex items-center bg-white border rounded-full px-4 py-2 w-full max-w-sm">
              <input
                type="date"
                id="Start Date"
                title="tanggal mulai"
                value={startDate}
                onChange={handleStartDateChange}
                className="w-full bg-transparent focus:outline-none"
              />
              <span className="px-2"></span>
              <input
                type="date"
                id="End Date"
                title="tanggal selesai"
                value={endDate}
                onChange={handleEndDateChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex items-center border-b md:border-b-0 md:border-r pr-4 pb-2 md:pb-0">
              <button
                type="button"
                onClick={showCategoryModal}
                className="text-sm hover:text-blue-500"
              >
                {categoryName || 'Pilih Kategori'}
              </button>
            </div>

            <button
              className="bg-[#62CDFF] text-white p-2 px-4 rounded-xl"
              onClick={handleFilterClick}
            >
              Ayo Cari
            </button>
          </div>
        </div>
      )}

      <dialog id="location_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Pilih Lokasi</h3>
          <div className="grid gap-2">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setLocation(loc);
                  const dialog = document.getElementById(
                    'location_modal',
                  ) as HTMLDialogElement | null;
                  dialog?.close();
                }}
                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="category_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Pilih Kategori</h3>
          <div className="grid gap-2">
            {categories.map((category: any) => (
              <button
                type="button"
                key={category.id}
                onClick={() => {
                  setCategoryName(category.name);
                  (
                    document.getElementById(
                      'category_modal',
                    ) as HTMLDialogElement
                  ).close();
                }}
                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
