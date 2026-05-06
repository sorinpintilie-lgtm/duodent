'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Heart,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const definingItems = [
  {
    icon: ShieldCheck,
    title: 'Responsabilitate medicală',
    text: 'Fiecare tratament este realizat cu atenție, rigoare și respect pentru pacient.',
  },
  {
    icon: CheckCircle2,
    title: 'Plan de tratament personalizat',
    text: 'Alegem soluția optimă în funcție de nevoile reale ale fiecărui pacient.',
  },
  {
    icon: Sparkles,
    title: 'Standarde profesionale ridicate',
    text: 'Lucrăm cu grijă pentru calitate, durabilitate și rezultate predictibile.',
  },
  {
    icon: Heart,
    title: 'Accent pe prevenție',
    text: 'Credem că prevenția este una dintre cele mai confortabile și eficiente căi pentru menținerea sănătății dentare pe termen lung.',
  },
];

const locationItems = [
  {
    title: 'București',
    eyebrow: 'Experiență & laborator propriu',
    image: '/images/despre-noi/locatie-bucuresti.jpg',
    alt: 'Cabinetul Duo Dent din București',
    text: 'Cabinetul Duo Dent din București reunește două cabinete de stomatologie generală și laboratorul dentar propriu, un avantaj important pentru realizarea rapidă și atentă a lucrărilor protetice. Comunicarea directă dintre medic și tehnician contribuie la soluții personalizate, eficiente și bine adaptate fiecărui pacient.',
    highlights: [
      '2 cabinete de stomatologie generală',
      'Laborator dentar propriu',
      'Coordonare directă medic – tehnician',
    ],
  },
  {
    title: 'Belciugatele',
    eyebrow: 'Modern, accesibil, aproape de comunitate',
    image: '/images/despre-noi/locatie-belciugatele.jpg',
    alt: 'Cabinetul Duo Dent din Belciugatele',
    text: 'La Belciugatele, Duo Dent oferă servicii stomatologice într-un spațiu modern, curat și primitor. Cabinetul include stomatologie generală și radiologie retroalveolară digitală, pentru diagnostic rapid și precis, direct în cabinet. În plus, colaborarea cu laboratorul propriu din București permite realizarea rapidă a lucrărilor protetice, cu o bună coordonare între medic și tehnician.',
    highlights: [
      'Cabinet modern și accesibil',
      'Radiologie retroalveolară digitală',
      'Acces la laboratorul propriu din București',
    ],
  },
  {
    title: 'Valea Călugărească',
    eyebrow: 'Dotări pentru cazuri mai complexe',
    image: '/images/despre-noi/locatie-valea-calugareasca.jpg',
    alt: 'Cabinetul Duo Dent din Valea Călugărească',
    text: 'Cabinetul Duo Dent din Valea Călugărească este compus din două cabinete de stomatologie generală și beneficiază de dotări moderne pentru diagnostic și tratamente complexe: aparatură necesară chirurgiei dento-alveolare, microscop pentru endodonție, scanner intraoral și radiologie panoramică. Toate acestea susțin tratamente mai precise, mai eficiente și mai bine adaptate fiecărui caz.',
    highlights: [
      '2 cabinete de stomatologie generală',
      'Microscop pentru endodonție',
      'Scanner intraoral și radiologie panoramică',
    ],
  },
];

const technologyItems = [
  {
    icon: Microscope,
    title: 'Laborator dentar propriu',
    text: 'Susține realizarea rapidă și atentă a lucrărilor protetice, cu o comunicare eficientă între medic și tehnician.',
  },
  {
    icon: Stethoscope,
    title: 'Radiologie retroalveolară digitală',
    text: 'Permite diagnostic rapid și precis, direct în cabinetul din Belciugatele.',
  },
  {
    icon: Building2,
    title: 'Radiologie panoramică',
    text: 'Oferă o imagine de ansamblu utilă în planificarea corectă a tratamentului.',
  },
  {
    icon: Sparkles,
    title: 'Microscop pentru endodonție',
    text: 'Susține tratamente endodontice mai precise și mai bine controlate.',
  },
  {
    icon: CheckCircle2,
    title: 'Scanner intraoral',
    text: 'Contribuie la un flux digital mai clar, mai confortabil și mai eficient pentru pacient.',
  },
  {
    icon: ShieldCheck,
    title: 'Dotări pentru chirurgie dento-alveolară',
    text: 'Permit gestionarea corectă a intervențiilor care necesită infrastructură dedicată.',
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-14">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-dental-mint">
        {eyebrow}
      </p>
      <h2 className="font-rounded text-3xl font-bold leading-tight text-dental-heading sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-dental-text/80 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function RoundedImage({
  src,
  alt,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] border border-dental-blueDark/10 bg-white shadow-sm ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        sizes={sizes}
      />
    </div>
  );
}

function LocationCard({ item, onOpenModal }: { item: any; onOpenModal: (item: any) => void }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[30px] border border-dental-blueDark/15 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/11]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-dental-mint">
              {item.eyebrow}
            </p>
            <h3 className="mt-3 font-rounded text-2xl font-bold text-dental-heading">
              {item.title}
            </h3>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-dental-blue text-dental-mint">
            <Building2 size={22} />
          </div>
        </div>

        <button
          onClick={() => onOpenModal(item)}
          className="flex w-fit mb-4 text-sm font-bold text-dental-mint transition-colors hover:text-dental-mintDark focus:outline-none"
        >
          Vezi detalii
        </button>

        <ul className="mt-auto space-y-3 pt-5 border-t border-dental-blueDark/10">
          {item.highlights.map((highlight: string) => (
            <li
              key={highlight}
              className="flex gap-3 text-sm leading-6 text-dental-text/75"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-dental-mint" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function DespreNoiPage() {
  const [activeLocation, setActiveLocation] = useState<any>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeDefiningCardIndex, setActiveDefiningCardIndex] = useState(0);
  const scrollPositionRef = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const definingScrollContainerRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll and hide header when modal is open
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (activeLocation) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
          e.preventDefault();
        }
      });
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      document.body.classList.remove('modal-open');
    };
  }, [activeLocation]);

  // Track active card in technology horizontal scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const cardWidth = scrollContainerRef.current.offsetWidth;
        const activeIndex = Math.round(scrollLeft / cardWidth);
        setActiveCardIndex(Math.min(activeIndex, technologyItems.length - 1));
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Track active card in defining items horizontal scroll
  useEffect(() => {
    const handleScroll = () => {
      if (definingScrollContainerRef.current) {
        const scrollLeft = definingScrollContainerRef.current.scrollLeft;
        // Card width is viewport width minus 2rem (32px) for proper spacing
        const cardWidth = window.innerWidth - 32;
        const activeIndex = Math.round(scrollLeft / cardWidth);
        setActiveDefiningCardIndex(Math.max(0, Math.min(activeIndex, definingItems.length - 1)));
      }
    };

    const scrollContainer = definingScrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-dental-cream font-body text-dental-text">
      <section className="relative isolate overflow-hidden pt-8 sm:pt-12">
        <div className="absolute inset-0">
          <Image
            src="/images/despre-noi/hero-mobile.jpg"
            alt="Imagine reprezentativă Duo Dent"
            fill
            priority
            className="object-cover md:hidden"
            sizes="100vw"
          />
          <Image
            src="/images/despre-noi/hero.jpg"
            alt="Imagine reprezentativă Duo Dent"
            fill
            className="object-cover hidden md:block"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-dental-heading/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-dental-heading/85 via-dental-heading/65 to-dental-heading/35" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
              <Microscope size={14} className="text-dental-mint" />
              Despre Duo Dent
            </div>

            <h1 className="font-rounded text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Experiență, responsabilitate și grijă reală pentru sănătatea zâmbetului tău.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              O clinică construită în jurul calității actului medical, al unei abordări bine organizate și al încrederii dintre medic și pacient.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/#clinici"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-dental-mint px-6 py-4 font-rounded text-base font-bold text-white shadow-lg shadow-dental-mint/20 transition hover:-translate-y-0.5 hover:bg-dental-mintDark"
              >
                Programează-te
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#servicii"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-rounded text-base font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Vezi serviciile
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur">
                <p className="font-rounded text-2xl font-bold text-white sm:text-3xl">2003</p>
                <p className="mt-1 text-sm text-white/75">anul fondării</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur">
                <p className="font-rounded text-2xl font-bold text-white sm:text-3xl">3</p>
                <p className="mt-1 text-sm text-white/75">locații Duo Dent</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur">
                <p className="font-rounded text-2xl font-bold text-white sm:text-3xl">1</p>
                <p className="mt-1 text-sm text-white/75">laborator propriu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Povestea Duo Dent"
            title="Un început construit pe experiență și pe respect pentru actul medical"
          />

          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-10 lg:items-stretch">
            <div className="flex flex-col justify-center rounded-[28px] border border-dental-blueDark/20 bg-dental-cream p-6 sm:p-8">
              <p className="text-lg leading-8 text-dental-text/85">
                După o experiență de 10 ani în domeniul tehnicii dentare, în anul 2003 a luat naștere Duo Dent, din dorința de a oferi tratamente stomatologice de calitate pentru toate categoriile de pacienți. Încă de la început, una dintre preocupările noastre principale a fost calitatea actului medical, susținută de profesionalism, atenție la detalii și soluții adaptate fiecărui caz.
              </p>
              <p className="mt-5 text-lg leading-8 text-dental-text/85">
                În timp, Duo Dent s-a dezvoltat în jurul unei idei simple: fiecare pacient are nevoie de un plan de tratament corect, bine explicat și gândit în funcție de nevoile sale reale.
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-[28px] border border-dental-blueDark/20 bg-dental-blue/45 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <CalendarDays className="text-dental-mint" size={22} />
                <p className="font-rounded text-xl font-bold text-dental-heading">
                  Repere esențiale
                </p>
              </div>

              <ul className="mt-6 space-y-4 text-base leading-7 text-dental-text/80">
                <li className="flex gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-dental-mint" />
                  <span>10 ani de experiență în tehnica dentară înainte de fondarea clinicii</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-dental-mint" />
                  <span>Fondare în 2003</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-dental-mint" />
                  <span>Calitatea actului medical a rămas una dintre preocupările principale</span>
                </li>
              </ul>

              <div className="mt-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-dental-mint">
                  Continuitate
                </p>
                <p className="mt-3 text-base leading-7 text-dental-text/80">
                  Dincolo de aparatură și proceduri, Duo Dent s-a construit în jurul unei relații corecte cu pacientul: explicații clare, soluții adaptate și o direcție de tratament bine organizată.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ce ne definește"
            title="Principii care susțin modul nostru de lucru"
          />

          {/* Mobile: Image at top, horizontal scroll below */}
          <div className="block lg:hidden space-y-8">
            <div className="rounded-[32px] bg-white p-3 shadow-sm border border-dental-blueDark/10">
              <RoundedImage
                src="/images/despre-noi/ce-ne-defineste.jpg"
                alt="Cadru cald medic pacient la Duo Dent"
                className="w-full min-h-[300px] rounded-[24px]"
                sizes="(max-width: 1024px) 100vw"
              />
            </div>

            <div ref={definingScrollContainerRef} className="overflow-x-auto scrollbar-hide">
              <div className="flex snap-x snap-mandatory pb-4">
                {definingItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex-shrink-0 w-[calc(100vw-2rem)] snap-center rounded-[28px] border border-dental-blueDark/15 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                      style={{ marginRight: index === definingItems.length - 1 ? '0' : '1rem' }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dental-blue text-dental-mint">
                        <Icon size={22} />
                      </div>
                      <h3 className="mt-5 font-rounded text-xl font-bold text-dental-heading">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-dental-text/80">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scroll indicators for defining items */}
            <div className="flex justify-center space-x-2">
              {definingItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (definingScrollContainerRef.current) {
                        const cardWidth = window.innerWidth - 32;
                        definingScrollContainerRef.current.scrollTo({
                          left: index * cardWidth,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeDefiningCardIndex
                      ? 'bg-dental-mint'
                      : 'bg-dental-blueDark/30'
                  }`}
                  aria-label={`Go to defining card ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Original grid layout */}
          <div className="hidden lg:grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            <div className="w-full h-full lg:sticky lg:top-28 rounded-[32px] bg-white p-3 shadow-sm border border-dental-blueDark/10">
              <RoundedImage
                src="/images/despre-noi/ce-ne-defineste.jpg"
                alt="Cadru cald medic pacient la Duo Dent"
                className="h-full w-full min-h-[400px] rounded-[24px]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {definingItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex flex-col rounded-[28px] border border-dental-blueDark/15 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dental-blue text-dental-mint">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 font-rounded text-xl font-bold text-dental-heading">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-dental-text/80">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Abordare interdisciplinară"
            title="O colaborare medicală care aduce mai multă claritate în tratament"
          />

          <div className="mx-auto max-w-6xl rounded-[32px] border border-dental-blueDark/20 bg-gradient-to-br from-dental-blue/70 to-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
              <RoundedImage
                src="/images/despre-noi/abordare-interdisciplinara.jpg"
                alt="Colaborare interdisciplinară în cadrul Duo Dent"
                className="h-full w-full min-h-[300px] md:min-h-[400px]"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />

              <div>
                <h3 className="font-rounded text-2xl font-bold text-dental-heading sm:text-3xl">
                  Colaborare între specialități
                </h3>

                <p className="mt-4 text-lg leading-8 text-dental-text/85">
                  În cadrul Duo Dent, tratamentele sunt susținute de o abordare interdisciplinară, iar pentru cazurile complexe colaborăm cu specialiști în chirurgie orală și maxilo-facială, parodontologie și ortodonție. Astfel, fiecare pacient, adult sau copil, poate beneficia de o evaluare atentă și de o soluție completă, adaptată nevoilor sale.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-dental-blueDark/15 bg-white/80 p-5">
                    <p className="font-rounded text-lg font-bold text-dental-heading">
                      Mai multă coerență
                    </p>
                    <p className="mt-2 text-sm leading-6 text-dental-text/75">
                      Fiecare etapă a planului de tratament este mai bine coordonată.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-dental-blueDark/15 bg-white/80 p-5">
                    <p className="font-rounded text-lg font-bold text-dental-heading">
                      Soluții complete
                    </p>
                    <p className="mt-2 text-sm leading-6 text-dental-text/75">
                      Pacientul primește direcții clare, fără fragmentarea inutilă a cazului.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Cele 3 locații"
            title="Aceeași direcție medicală, adaptată fiecărui cabinet"
            description="Pe această pagină, locațiile sunt prezentate ca profil și diferențiator. Datele complete de contact rămân în footer, unde sunt deja foarte bine organizate."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {locationItems.map((item) => (
              <LocationCard key={item.title} item={item} onOpenModal={setActiveLocation} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Tehnologii și dotări"
            title="Instrumente și infrastructură care susțin tratamentele"
            description="Tehnologia și dotările moderne fac parte din modul nostru de lucru, pentru că un diagnostic corect și un tratament precis pornesc întotdeauna de la instrumentele potrivite."
          />

          <div className="mx-auto max-w-6xl">
            {/* Mobile: Custom layout - first 2 images in 2 columns, 3rd full width */}
            <div className="block md:hidden">
              {/* First 2 images in 2 columns */}
              <div className="grid gap-4 grid-cols-2 mb-8">
                <div className="group relative overflow-hidden rounded-[28px] border border-dental-blueDark/10 bg-dental-cream shadow-sm aspect-[3/4]">
                  <Image
                    src="/images/despre-noi/tehnologie-microscop-scanner.jpg"
                    alt="Microscop sau scanner intraoral Duo Dent"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dental-heading/90 via-dental-heading/40 to-transparent p-6">
<p className="font-rounded text-xl font-bold text-white">Microscop</p>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-[28px] border border-dental-blueDark/10 bg-dental-cream shadow-sm aspect-[3/4]">
                  <Image
                    src="/images/despre-noi/tehnologie-scanner.jpg"
                    alt="Scanner intraoral Duo Dent"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dental-heading/90 via-dental-heading/40 to-transparent p-5">
                    <p className="font-rounded text-lg font-bold text-white">Scanner</p>
                  </div>
                </div>
              </div>

              {/* 3rd image full width */}
              <div className="mb-8">
                <div className="group relative overflow-hidden rounded-[28px] border border-dental-blueDark/10 bg-dental-cream shadow-sm aspect-[16/9] max-w-2xl mx-auto">
                  <Image
                    src="/images/despre-noi/tehnologie-laborator.jpg"
                    alt="Laboratorul dentar Duo Dent"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dental-heading/90 via-dental-heading/40 to-transparent p-5">
                    <p className="font-rounded text-lg font-bold text-white">Laborator dentar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Original grid layout */}
            <div className="hidden md:grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] lg:auto-rows-[280px]">
              {/* Large Image - Spans 2 columns on desktop */}
              <div className="group relative overflow-hidden rounded-[28px] border border-dental-blueDark/10 bg-dental-cream shadow-sm md:col-span-2 md:row-span-2">
                <Image
                  src="/images/despre-noi/tehnologie-microscop-scanner.jpg"
                  alt="Microscop sau scanner intraoral Duo Dent"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dental-heading/90 via-dental-heading/40 to-transparent p-6">
                  <p className="font-rounded text-xl font-bold text-white">Microscop</p>
                </div>
              </div>

              {/* Small Image 1 */}
              <div className="group relative overflow-hidden rounded-[28px] border border-dental-blueDark/10 bg-dental-cream shadow-sm">
                <Image
                  src="/images/despre-noi/tehnologie-scanner.jpg"
                  alt="Scanner intraoral Duo Dent"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dental-heading/90 via-dental-heading/40 to-transparent p-5">
                  <p className="font-rounded text-lg font-bold text-white">Scanner</p>
                </div>
              </div>

              {/* Small Image 2 */}
              <div className="group relative overflow-hidden rounded-[28px] border border-dental-blueDark/10 bg-dental-cream shadow-sm">
                <Image
                  src="/images/despre-noi/tehnologie-laborator.jpg"
                  alt="Laboratorul dentar Duo Dent"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dental-heading/90 via-dental-heading/40 to-transparent p-5">
                  <p className="font-rounded text-lg font-bold text-white">Laborator dentar</p>
                </div>
              </div>
            </div>

            {/* Mobile: Horizontal pagination scroll - one card per screen */}
            <div ref={scrollContainerRef} className="block md:hidden overflow-x-auto scrollbar-hide">
              <div className="flex snap-x snap-mandatory pb-4">
                {technologyItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex-shrink-0 w-[calc(100vw-2rem)] snap-center rounded-[28px] border border-dental-blueDark/15 bg-dental-cream p-6 transition hover:bg-dental-blue/40"
                      style={{ marginRight: index === technologyItems.length - 1 ? '0' : '1rem' }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-dental-mint shadow-sm">
                        <Icon size={22} />
                      </div>
                      <h3 className="mt-5 font-rounded text-xl font-bold text-dental-heading">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-dental-text/80">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scroll indicators - outside scroll container */}
            <div className="flex justify-center mt-4 space-x-2 md:hidden">
              {technologyItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                      if (scrollContainerRef.current) {
                        const cardWidth = window.innerWidth - 32;
                        scrollContainerRef.current.scrollTo({
                          left: index * cardWidth,
                          behavior: 'smooth'
                        });
                      }
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeCardIndex
                      ? 'bg-dental-mint'
                      : 'bg-dental-blueDark/30'
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>

            {/* Desktop: Original grid layout */}
            <div className="hidden md:grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {technologyItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-[28px] border border-dental-blueDark/15 bg-dental-cream p-6 transition hover:bg-dental-blue/40"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-dental-mint shadow-sm">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 font-rounded text-xl font-bold text-dental-heading">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-dental-text/80">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-8 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[36px] bg-dental-heading shadow-2xl">
            <div className="absolute inset-0">
              <Image
                src="/images/despre-noi/cta-final.jpg"
                alt="Imagine ambientală Duo Dent"
                fill
                className="object-cover opacity-20"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-dental-heading/45" />

            <div className="relative flex flex-col items-center text-center px-6 py-10 text-white sm:px-8 sm:py-12 lg:px-12 lg:py-14">
              <div className="max-w-3xl">
                <h2 className="font-rounded text-3xl font-bold leading-tight sm:text-4xl">
                  O abordare clară, atentă și adaptată fiecărui pacient
                </h2>
                <p className="mt-5 text-base leading-7 text-white/80 sm:text-lg">
                  Fie că ai nevoie de un control de rutină sau de un plan complet de tratament, echipa Duo Dent îți este alături cu soluții atent gândite și explicații clare, pas cu pas.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/#clinici"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-dental-mint px-6 py-4 font-rounded text-base font-bold text-white transition hover:bg-dental-mintDark"
                  >
                    Programează-te
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/#servicii"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-4 font-rounded text-base font-bold text-white transition hover:bg-white/10"
                  >
                    Vezi serviciile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeLocation && (
          <motion.div
            className="modal-overlay flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLocation(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="location-modal-title"
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white p-5 shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActiveLocation(null)}
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-dental-blueDark/10 bg-white text-dental-heading transition hover:bg-dental-blue z-10"
                aria-label="Închide"
              >
                <X size={18} />
              </button>

              <div className="max-w-2xl">
                <h3
                  id="location-modal-title"
                  className="font-rounded text-2xl font-bold text-dental-heading"
                >
                  {activeLocation.title}
                </h3>

                <div className="mt-6 rounded-[28px] bg-dental-cream p-6">
                  <p className="text-base leading-8 text-dental-text/85">
                    {activeLocation.text}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-dental-mint">
                    Caracteristici principale
                  </p>
                  <ul className="mt-4 space-y-3">
                    {activeLocation.highlights.map((highlight: string) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-6 text-dental-text/75"
                      >
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-dental-mint" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}