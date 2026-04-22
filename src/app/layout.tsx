import './globals.css';
import { Nunito, Open_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <body
        className={`${nunito.variable} ${openSans.variable} bg-dental-cream font-body text-dental-text antialiased`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}