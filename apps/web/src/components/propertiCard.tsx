import { IProperties } from '@/interfaces/property.interface';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  data: IProperties;
};

export default function PropertiCard({ data }: Props) {
  const router = useRouter();
  const handleCardClick = (slug: string) => {
    router.push(`/properti/${slug}`);
  };

  return (
    <div
      className="bg-[#ffffff] rounded-lg p-3 text-center transform hover:scale-105 transition duration-200 shadow-lg min-w-[200px] flex-shrink-0 cursor-pointer"
      onClick={() => handleCardClick(data.slug_address)}
    >
      <img
        src={data.image}
        alt={data.name}
        className="w-full h-24 md:h-32 lg:h-40 object-cover rounded-md mb-2"
      />
      <p className="text-black text-sm font-medium">{data.name}</p>
      <p className="text-[#d96d62] text-sm font-semibold">100000000</p>
      <div className="flex justify-center items-center gap-x-2">
        <p className="text-[#9a98a3] text-xs">{data.address.detail}</p>
        <p className="text-[#9a98a3] text-xs">- {data.address.district.name}</p>
      </div>
    </div>
  );
}
