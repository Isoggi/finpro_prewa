import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Carousel from '@/components/carousel';
import Lodging from '@/components/Lodging';
import Info from '@/components/info';
import Banner from '@/components/Banner';
import Footer from '@/components/footer';
export default function Home() {
  return (
    <>
      <Navbar />
      {/* <Banner /> */}
      <Carousel />
      <Lodging />
      <Info />
      <Footer />
    </>
  );
}
