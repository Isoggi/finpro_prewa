import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import Navbar from '@/components/Navbar';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
