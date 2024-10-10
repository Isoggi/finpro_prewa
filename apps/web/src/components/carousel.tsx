'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// Import only the Pagination module
import { Pagination } from 'swiper/modules';

export default function Carousel() {
  return (
    <div className="w-full mx-auto py-4 max-w-screen-xl sm:px-4 px-4">
      {/* Teks yang ditambahkan */}
      <p className="text-center text-lg font-semibold mb-4">
        Kuy, cek promo sebelum bepergian!
      </p>

      {/* Carousel */}
      <div className="carousel sm:px-6">
        <div className="carousel-item mx-2">
          <img
            src="https://cdn6.agoda.net/images/WebCampaign/pulse_localcampaign_wonderfulindonesia_id/home_banner_web2/id-id.png"
            alt="Banner"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
        <div className="carousel-item mx-2">
          <img
            src="https://cdn6.agoda.net/images/WebCampaign/wcM4S20230403Elite/home_banner_web2/id-id.png"
            alt="Banner"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
        <div className="carousel-item mx-2">
          <img
            src="https://cdn6.agoda.net/images/WebCampaign/dealspagebanner_hp_web/id-id.png"
            alt="Banner"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
        <div className="carousel-item mx-2">
          <img
            src="https://cdn6.agoda.net/images/WebCampaign/pulse_localcampaign_gdayoceania/home_banner_web/id-id.png"
            alt="Banner"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
        <div className="carousel-item mx-2">
          <img
            src="https://cdn6.agoda.net/images/WebCampaign/pulse_globalcampaign_prestigesavings_ka/home_banner_web/id-id.png"
            alt="Banner"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
        <div className="carousel-item mx-2">
          <img
            src="https://cdn6.agoda.net/images/WebCampaign/wcSL20231001/home_banner_web2/id-id.png"
            alt="Banner"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
