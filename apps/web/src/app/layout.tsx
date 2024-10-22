import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prewa',
  description: 'Pilih yang enak!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
