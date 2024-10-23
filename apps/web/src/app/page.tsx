import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Carousel from '@/components/carousel';
import Lodging from '@/components/Lodging';
import Info from '@/components/info';
import Footer from '@/components/Footer';
export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <Lodging />
      <Info />
      <Footer />
    </>
  );
}
