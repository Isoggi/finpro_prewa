'use client';
import { IProperties } from '@/interfaces/property.interface';
import React from 'react';
import { api } from '@/config/axios.config';
import { useSearchParams } from 'next/navigation';
import PropertiCard from './propertiCard';

export default function PropertiesContainer() {
  // const [showAll, setShowAll] = React.useState(false);
  const [properti, setProperti] = React.useState<IProperties[] | null>(null);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const startDate = searchParams.get('starDate');
  const endDate = searchParams.get('endDate');
  React.useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get('/properti', {
        params: {
          category,
          // category:category
          location,
          startDate,
          endDate,
        },
      });
      console.log(response.data.data);
      setProperti(response.data.data.data as IProperties[]);
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold text-black mb-4">Hasil Pencarian</h2>

      <div className="flex overflow-x-auto space-x-4 pb-4 mt-4">
        {properti
          ? properti?.map((room, index) => (
              <PropertiCard key={index} data={room} />
            ))
          : 'Loading...'}
      </div>
    </div>
  );
}
