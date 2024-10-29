import { property_src } from '@/config/images.config';
import { IProperties } from '@/interfaces/property.interface';
import { useRouter } from 'next/navigation';
import React from 'react';
import { properties_src } from '@/config/images.config';
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
      <div className="gap ">
        <img
          src={properties_src + data.image}
          alt={data.name}
          className="w-full h-24 md:h-32 lg:h-40 object-cover rounded-md mb-2"
        />
        <p className="text-black text-sm font-medium">{data.name}</p>
        <div className="flex justify-center items-center gap-x-2">
          <p className="text-[#9a98a3] text-xs">
            {data.address.provinces.name}
          </p>
          <p className="text-[#9a98a3] text-xs">
            - {data.address.district.name}
          </p>
        </div>
      </div>
    </div>
  );
}
