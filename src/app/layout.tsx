import './globals.css';
import { Nunito, Open_Sans } from 'next/font/google';
import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  metadataBase: new URL("https://duodent.ro"),
  title: {
    default:
      "Duo Dent | Clinică stomatologică în București, Belciugatele și Valea Călugărească",
    template: "%s | Duo Dent",
  },
  description:
    "Duo Dent oferă servicii stomatologice pentru copii și adulți în București, Belciugatele și Valea Călugărească.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Duo Dent | Clinică stomatologică în 3 locații",
    description:
      "Servicii stomatologice pentru copii și adulți în București, Belciugatele și Valea Călugărească.",
    url: "https://duodent.ro",
    siteName: "Duo Dent",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Duo Dent | Clinică stomatologică în 3 locații",
    description:
      "Servicii stomatologice pentru copii și adulți în București, Belciugatele și Valea Călugărească.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <body
        className={`${nunito.variable} ${openSans.variable} bg-dental-cream font-body text-dental-text antialiased`}
      >
        <SiteHeader />
        <div className="pt-20">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}