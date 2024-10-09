import Image from 'next/image';
import styles from './page.module.css';
import Navbar from '@/components/navbar';
import Carousel from '@/components/carousel';
import Lodging from '@/components/lodging';
export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <Lodging />
    </>
  );
}
