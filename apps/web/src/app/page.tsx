import Image from 'next/image';
import styles from './page.module.css';
import Navbar from '@/components/Navbar';
import Carousel from '@/components/carousel';
import Lodging from '@/components/Lodging';
import info from '@/components/info';
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
