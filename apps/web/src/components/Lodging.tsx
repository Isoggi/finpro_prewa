'use client';
import React, { useState } from 'react';
import { IProperties } from '@/interfaces/property.interface';
import { api } from '@/config/axios.config';
import PropertiCard from './propertiCard';

const chunkArray = (array: IProperties[], size: number) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

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
      <h2 className="text-xl font-semibold text-black mb-4">Sedang Popular</h2>

      {properti ? (
        chunkArray(properti, 4).map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="flex overflow-x-auto gap-x-3 pb-4">
            {chunk.map((room, index) => (
              <PropertiCard key={index} data={room} />
            ))}
          </div>
        ))
      ) : (
        <div className="flex overflow-x-auto gap-x-3 pb-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex w-full flex-col gap-4">
              <div className="skeleton h-32 w-full bg-gray-300 rounded"></div>
              <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
              <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
              <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Lodging() {
  return (
    <div className="p-4 md:p-8 lg:p-12">
      <PropertiesSection />
    </div>
  );
}
