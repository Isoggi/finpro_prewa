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
      className="bg-[#ffffff] sm:gap-2 rounded-lg p-2 text-center transform hover:scale-105 transition duration-200 shadow-lg min-w-[200px] flex-shrink-0 cursor-pointer"
      onClick={() => handleCardClick(data.slug_address)}
    >
      <div className="gap">
        <img
          src={
            data.image
              ? data.image.includes('http')
                ? data.image
                : `${process.env.NEXT_PUBLIC_PROPERTY_IMAGE}${data.image}`
              : '/default-hotel.jpg'
          }
          alt={data.name}
          className="w-full h-30 object-contain rounded-md mb-2"
        />
        <p className="text-black text-sm font-medium">{data.name}</p>
        <div className="flex justify-center items-center gap-x-2">
          <p className="text-[#9a98a3] text-sm">
            {data.address?.provinces.name}
          </p>
          <p className="text-[#9a98a3] text-sm">
            - {data.address?.district.name}
          </p>
        </div>
      </div>
    </div>
  );
}
