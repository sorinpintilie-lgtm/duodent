'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MapPin, Phone, Clock, Map } from 'lucide-react';

type LocationItem = {
  slug: string;
  title: string;
  addressLines: string[];
  phones: string[];
  scheduleTitle: string;
  scheduleLines: string[];
  mapSrc: string;
};

const locations: LocationItem[] = [
  {
    slug: 'valea-calugareasca',
    title: 'Valea Călugărească',
    addressLines: [
      'Str. Mihai Viteazul nr. 180, (la etaj)',
      'Com. Valea Călugărească, Jud. Prahova',
    ],
    phones: ['0711 042 920'],
    scheduleTitle: 'ORAR',
    scheduleLines: ['Luni – Vineri: 10.00 – 20.00'],
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1341.6809688788285!2d26.1462878535834!3d44.96310321233524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2350077d759af%3A0xca33ef310f6f12b1!2zQ2xpbmljxIMgc3RvbWF0b2xvZ2ljxIMgRHVvIERlbnQgLSBWYWxlYSBDxINsdWfEg3JlYXNjxIM!5e1!3m2!1sro!2sro!4v1773822682796!5m2!1sro!2sro',
  },
  {
    slug: 'belciugatele',
    title: 'Belciugatele',
    addressLines: [
      'Str. Inv. Liviu Ionescu nr. 83',
      'Com. Belciugatele, Jud. Călărași',
    ],
    phones: ['0769 410 728'],
    scheduleTitle: 'ORAR',
    scheduleLines: ['Luni – Vineri: 10.00 – 19.00'],
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d804.4498832107546!2d26.43674846543186!3d44.48057109955368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ef0047caa1b1%3A0xe3b150cb4d022646!2sCabinet%20stomatologic%20Duo%20Dent%20Belciugatele!5e1!3m2!1sro!2sro!4v1773822843103!5m2!1sro!2sro',
  },
  {
    slug: 'bucuresti',
    title: 'București',
    addressLines: [
      'Bd. Camil Ressu nr. 52, Bl. C16, Sc. B, Ap. 12',
      'Parter, Sector 3, București',
    ],
    phones: ['0731 326 536', '021 673 6730'],
    scheduleTitle: 'Program',
    scheduleLines: [
      'Luni, Miercuri: 11.00 – 20.00',
      'Marți, Joi, Vineri: 09.00 – 16.00',
    ],
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1610.7125034132614!2d26.150122536014912!3d44.41479663973836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1feeac4f36f3f%3A0x6bb6749673085b55!2sDuo%20Dent%20SRL!5e1!3m2!1sro!2sro!4v1773823229174!5m2!1sro!2sro',
  },
];

function phoneHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`;
}

export default function SiteFooter() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggleCard = (slug: string) => {
    setFlipped((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <footer id="clinici" className="border-t border-white/10 bg-dental-heading text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-dental-mint">
            Clinicile Duo Dent
          </p>
          <h2 className="font-rounded text-3xl font-bold text-white sm:text-4xl">
            Alege locația potrivită
          </h2>
          <p className="mt-3 text-base leading-7 text-gray-300">
            Vezi rapid programul, datele de contact și harta pentru fiecare
            clinică Duo Dent.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {locations.map((location, index) => {
            const isFlipped = !!flipped[location.slug];

            return (
              <div
                key={location.slug}
                className="h-[420px]"
                style={{ perspective: '1200px' }}

              >
                <div
                  className="relative h-full w-full rounded-[28px] transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="flex h-full flex-col">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-rounded text-2xl font-bold text-white">
                            {location.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-300">
                            Clinica Duo Dent
                          </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-dental-mint">
                          <MapPin size={20} />
                        </div>
                      </div>

                      <div className="space-y-5 text-sm text-gray-200">
                        <div className="flex items-start gap-3">
                          <MapPin
                            size={18}
                            className="mt-0.5 shrink-0 text-dental-mint"
                          />
                          <div className="space-y-1">
                            {location.addressLines.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone
                            size={18}
                            className="mt-0.5 shrink-0 text-dental-mint"
                          />
                          <div className="space-y-1">
                            {location.phones.map((phone) => (
                              <a
                                key={phone}
                                href={phoneHref(phone)}
                                className="block transition hover:text-white"
                              >
                                {phone}
                              </a>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock
                            size={18}
                            className="mt-0.5 shrink-0 text-dental-mint"
                          />
                          <div className="space-y-1">
                            <p className="font-semibold uppercase tracking-[0.08em] text-dental-mint">
                              {location.scheduleTitle}
                            </p>
                            {location.scheduleLines.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto pt-6">
                        <button
                          type="button"
                          onClick={() => toggleCard(location.slug)}
                          className="inline-flex items-center gap-2 rounded-full bg-dental-mint px-5 py-3 text-sm font-semibold text-white transition hover:bg-dental-mintDark"
                        >
                          <Map size={16} />
                          Vezi harta
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 rounded-[28px] border border-white/10 bg-[#102f35] p-3 shadow-2xl"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="flex h-full flex-col overflow-hidden rounded-[22px]">
                      <iframe
                        src={location.mapSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Harta ${location.title}`}
                        className="min-h-[290px] flex-1"
                      />

                      <div className="border-t border-white/10 bg-[#102f35] p-4">
                        <button
                          type="button"
                          onClick={() => toggleCard(location.slug)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                          Vezi detalii
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/10 bg-dental-heading">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-gray-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <p>
              © {new Date().getFullYear()} Clinica Duo Dent. Toate drepturile
              rezervate.
            </p>
            <a href="/drepturi" className="hover:text-white">
              Date personale
            </a>
            <a href="/politica-de-confidentialitate" className="hover:text-white">
              Confidențialitate
            </a>
            <a href="/politica-de-cookies" className="hover:text-white">
              Cookies
            </a>
            <a href="/termeni-si-conditii" className="hover:text-white">
              Termeni
            </a>
          </div>
          <a
            href="https://sky.ro"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <span>Crafted in the clouds by</span>
            <Image src="/skyro.png" alt="SkyRo" width={78} height={24} className="h-6 w-auto" />
          </a>
        </div>
      </div>
    </footer>
  );
}