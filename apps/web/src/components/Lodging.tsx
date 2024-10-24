'use client';
import React, { useState } from 'react';
import { IProperties } from '@/interfaces/property.interface';
import { api } from '@/config/axios.config';
import PropertiCard from './propertiCard';

function PropertiesSection() {
  const [showAll, setShowAll] = useState(false);
  const [properti, setProperti] = useState<IProperties[] | null>(null);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/properti');
        console.log(response.data.data);
        setProperti(response.data.data.data as IProperties[]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold text-black mb-4">Popular</h2>

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

export default function Lodging() {
  return (
    <div className="p-4 md:p-8 lg:p-12 ">
      <PropertiesSection />
    </div>
  );
}
