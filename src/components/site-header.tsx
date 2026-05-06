'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { label: 'Acasă', href: '/' },
  { label: 'Despre noi', href: '/despre-noi' },
  { label: 'Echipa noastră', href: '/echipa-noastra' },
  { label: 'Servicii', href: '/servicii' },
  { label: 'Tarife', href: '/tarife' },
  { label: 'Materiale utile', href: '/materiale-utile' },
  { label: 'Pedodonție', href: '/pedodontie' },
  { label: 'Contact', href: '/contact' },
];

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-[60] h-20 border-b border-dental-blueDark/20 bg-white md:bg-white/90 md:backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            className="relative z-[10001] flex items-center gap-2"
            onClick={closeMenu}
          >
            <Image
              src="/logo-doudent.png"
              alt="Duo Dent Logo"
              width={48}
              height={48}
              className="rounded-xl shadow-sm"
            />
            <div className="flex flex-col leading-none">
              <span className="font-rounded text-xl font-bold tracking-wide text-dental-heading">
                Duo Dent
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-dental-mint">
                Clinică & Laborator
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 font-rounded text-sm font-bold text-dental-text md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition hover:text-dental-mint"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:0731326536"
              className="relative z-[10001] flex items-center gap-2 rounded-2xl bg-dental-mint px-5 py-2.5 font-rounded text-sm font-bold text-white shadow-md transition hover:bg-dental-mintDark"
            >
              <Phone size={18} />
              <span className="hidden sm:inline">0731 326 536</span>
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="relative z-[10001] rounded-lg bg-dental-blue p-2 text-dental-heading md:hidden"
              aria-label={isMobileMenuOpen ? 'Închide meniul' : 'Deschide meniul'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] flex flex-col bg-white px-6 pt-24 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-gray-100 pb-2 font-rounded text-2xl font-bold text-dental-heading"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-dental-cream p-5">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-dental-mint">
                Programări
              </p>
              <a
                href="tel:0731326536"
                onClick={closeMenu}
                className="block font-rounded text-xl font-bold text-dental-heading"
              >
                0731 326 536
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
