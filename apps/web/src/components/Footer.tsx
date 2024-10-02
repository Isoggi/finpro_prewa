import Link from 'next/link';
export const Footer = () => {
  return (
    <div>
      <div className="bg-[#1d3976] text-white text-sm py-10 px-4 md:px-6 lg:px-12 mx-auto max-w-full">
        <div className="container mx-auto flex flex-col items-center text-center max-w-screen-xl">
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link href="/contact" className="text-xs md:text-sm lg:text-base">
              Tentang Kami
            </Link>
            <Link href="" className="text-xs md:text-sm lg:text-base">
              Blog
            </Link>
            <Link href="" className="text-xs md:text-sm lg:text-base">
              Kebijakan Privasi
            </Link>
            <Link href="" className="text-xs md:text-sm lg:text-base">
              Kebijakan Cookie
            </Link>
            <Link href="" className="text-xs md:text-sm lg:text-base">
              Panduan
            </Link>
            <Link href="" className="text-xs md:text-sm lg:text-base">
              Hubungan Kami
            </Link>
          </div>
          <div className="pt-10">
            <p className="text-xs md:text-sm lg:text-base">
              © 2024 Loket (PT Global Loket Sejahtera)
            </p>
          </div>
        </div>
      </div>
      Footer
    </div>
  );
};
