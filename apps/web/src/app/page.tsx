import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Carousel from '@/components/carousel';
import Lodging from '@/components/Lodging';
import Info from '@/components/info';

export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <Lodging />
      <Info />
    </>
  );
}
