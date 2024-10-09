'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// Remove pagination CSS if not used
// import 'swiper/css/pagination';

// Import only the Pagination module
import { Pagination } from 'swiper/modules';

export default function Carousel() {
  const slides = [
    {
      id: 1,
      imageUrl:
        'https://cdn6.agoda.net/images/WebCampaign/pulse_localcampaign_wonderfulindonesia_id/home_banner_web2/id-id.png',
    },
    {
      id: 2,
      imageUrl:
        'https://cdn6.agoda.net/images/WebCampaign/wcM4S20230403Elite/home_banner_web2/id-id.png',
    },
    {
      id: 3,
      imageUrl:
        'https://cdn6.agoda.net/images/WebCampaign/dealspagebanner_hp_web/id-id.png',
    },
    {
      id: 4,
      imageUrl:
        'https://cdn6.agoda.net/images/WebCampaign/pulse_globalcampaign_prestigesavings_ka/home_banner_web/id-id.png',
    },
  ];

  return (
    <div className="w-full mx-auto py-4 max-w-screen-xl">
      <div className="flex justify-center items-center py-2 h-16">
        <h1 className="text-center">Kuy, cek promo sebelum bepergian!</h1>
      </div>

      <Swiper
        modules={[Pagination]}
        pagination={false} // Set pagination to false
        slidesPerView={3}
        spaceBetween={20}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={slide.imageUrl}
                className="w-full"
                alt={`Slide ${slide.id}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
