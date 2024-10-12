import React from 'react';

export default function PromoSection() {
  return (
    <div className="font-sans max-w-screen-xl mx-auto px-4 py-6">
      {/* Section 1: Promo Banner */}
      <div className="mt-10 flex flex-col md:flex-row md:items-center md:gap-8">
        {/* Mobile: Text above image */}
        <div className="block md:hidden">
          <h2 className="text-xl font-bold text-black">
            Pesan Tiket dan Rencanain Liburan Jadi Gampang
          </h2>
        </div>

        {/* Image */}
        <img
          src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/auto_optimize_webp/mobile-modules/2022/07/01/ba3c2883-2b30-49c6-9340-50a36466a6c8-1656672401259-5af9b6d7d3def95e52333a22b9ea86c0.png"
          alt="Cheap Flight"
          className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0"
        />

        {/* Mobile: Text below image */}
        <div className="block md:hidden">
          <h5 className=" font-bold text-black">Banyak Promo Spesial.</h5>
          <p className="text-gray-600 mt-4">
            Ingin pesan tiket pesawat murah? Kini hanya dengan satu kali
            sentuhan jari, Anda bisa langsung pesan tiket pesawat murah di
            tiket.com.
          </p>
          <h5 className=" font-bold mt-4 text-black">
            Benefit tiket Elite Rewards.
          </h5>
          <p className="text-gray-600 mt-4">
            Dapatkan benefit tiket Elite Rewards berupa tiket Points yang bisa
            kamu tukarkan dengan diskon
          </p>
        </div>

        {/* Desktop: Text on left */}
        <div className="md:w-2/3 hidden md:block">
          <h2 className="text-xl font-bold text-black">
            Pesan Tiket dan Rencanain Liburan Jadi Gampang
          </h2>
          <h5 className=" font-bold mt-4 text-black">Banyak Promo Spesial.</h5>
          <p className="text-gray-600 mt-4">
            Dapatkan diskon harga terbaik agar bujet liburan kamu semakin hemat.
            Tidak ada alasan lagi untuk menunda liburan kamu.
          </p>
          <h5 className=" font-bold mt-4 text-black">
            Benefit tiket Elite Rewards.
          </h5>
          <p className="text-gray-600 mt-4">
            Dapatkan benefit tiket Elite Rewards berupa tiket Points yang bisa
            kamu tukarkan dengan diskon
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col md:flex-row-reverse md:items-center md:gap-8">
        {/* Mobile: Text above image */}
        <div className="block md:hidden">
          <h2 className="text-xl font-bold text-black">
            Dapatkan Harga Tiket Pesawat Murah ke Destinasi Favorit Anda
          </h2>
        </div>

        {/* Image */}
        <img
          src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/auto_optimize_webp/mobile-modules/2022/07/01/ba3c2883-2b30-49c6-9340-50a36466a6c8-1656672401259-5af9b6d7d3def95e52333a22b9ea86c0.png"
          alt="Cheap Flight"
          className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0"
        />

        {/* Mobile: Text below image */}
        <div className="block md:hidden">
          <p className="text-gray-600 mt-4">
            Ingin pesan tiket pesawat murah? Kini hanya dengan satu kali
            sentuhan jari, Anda bisa langsung pesan tiket pesawat murah di
            tiket.com. tiket.com adalah pionir online travel agent (OTA) di
            Indonesia yang selalu memberikan inovasi handal untuk mempermudah
            Anda ketika pesan tiket pesawat online.
          </p>
        </div>

        {/* Desktop: Text on left, Image on right */}
        <div className="md:w-2/3 hidden md:block">
          <h2 className="text-xl font-bold text-black">
            Dapatkan Harga Tiket Pesawat Murah ke Destinasi Favorit Anda
          </h2>
          <p className="text-gray-600 mt-4">
            Ingin pesan tiket pesawat murah? Kini hanya dengan satu kali
            sentuhan jari, Anda bisa langsung pesan tiket pesawat murah di
            tiket.com. tiket.com adalah pionir online travel agent (OTA) di
            Indonesia yang selalu memberikan inovasi handal untuk mempermudah
            Anda ketika pesan tiket pesawat online.
          </p>
        </div>
      </div>

      {/* Section 4: Easy Payment */}
      <div className="mt-10 text-center md:text-left">
        <h2 className="text-xl font-semibold text-black">
          Cicilan Mudah dan Simpel
        </h2>
        <p className="text-gray-600 mt-4">
          Pesan tiket dan hotelmu sekarang, lalu cicil pembayarannya dengan
          sekali klik. Program cicilan ini bisa kamu gunakan untuk membeli tiket
          pesawat, hotel, tiket hiburan, dan sewa mobil.
        </p>
      </div>
    </div>
  );
}
