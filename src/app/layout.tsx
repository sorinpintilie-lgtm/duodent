import './globals.css';
import { Nunito, Open_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import AosInit from '@/components/aos-init';
import ScrollToTop from '@/components/scroll-to-top';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import LocalBusinessJsonLd from '@/components/seo/local-business-jsonld';

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
    images: [
      {
        url: "/og-duodent.jpg",
        width: 1200,
        height: 630,
        alt: "Duo Dent - clinică stomatologică"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duo Dent | Clinică stomatologică în 3 locații",
    description:
      "Servicii stomatologice pentru copii și adulți în București, Belciugatele și Valea Călugărească.",
    images: ["/og-duodent.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/logo-doudent.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <body
        className={`${nunito.variable} ${openSans.variable} bg-dental-cream font-body text-dental-text antialiased`}
      >
        <LocalBusinessJsonLd />
        <AosInit />
        <ScrollToTop />
        <SiteHeader />
        <div className="pt-20">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}