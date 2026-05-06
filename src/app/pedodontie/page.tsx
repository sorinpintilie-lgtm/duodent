'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType, ReactNode, RefObject } from 'react';
import {
  ArrowRight,
  Baby,
  CheckCircle2,
  Heart,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
} from 'lucide-react';

type SimpleItem = {
  title: string;
  text: string;
};

type IconItem = SimpleItem & {
  icon: ComponentType<{ className?: string }>;
};

const reassuranceItems: IconItem[] = [
  {
    icon: Smile,
    title: 'Ritm calm și răbdător',
    text: 'Prima vizită este gândită astfel încât copilul să se acomodeze treptat, fără grabă și fără presiune inutilă.',
  },
  {
    icon: ShieldCheck,
    title: 'Claritate pentru părinți',
    text: 'Explicăm simplu ce observăm, ce merită urmărit și care sunt pașii potriviți mai departe.',
  },
  {
    icon: Heart,
    title: 'Accent pe prevenție',
    text: 'Pedodonția înseamnă nu doar tratament, ci și monitorizare, educație și obiceiuri sănătoase.',
  },
];

const firstVisitSteps: SimpleItem[] = [
  {
    title: 'Cunoaștere și acomodare',
    text: 'Primul contact este orientat spre confort, familiarizare și o interacțiune calmă cu medicul și cu spațiul clinicii.',
  },
  {
    title: 'Evaluare atentă',
    text: 'Observăm starea dinților și a gingiilor, dezvoltarea dentară și eventualele nevoi de monitorizare sau tratament.',
  },
  {
    title: 'Recomandări clare',
    text: 'La final, primești explicații și recomandări concrete despre pașii următori, igienă și controale periodice.',
  },
];

const serviceHighlights: IconItem[] = [
  {
    icon: Stethoscope,
    title: 'Control periodic',
    text: 'Evaluări regulate pentru a observa din timp schimbările importante.',
  },
  {
    icon: Sparkles,
    title: 'Prevenție și protecție',
    text: 'Igienizare, sigilări și profilaxie adaptate etapei de dezvoltare.',
  },
  {
    icon: Baby,
    title: 'Tratamente adaptate vârstei',
    text: 'Abordare potrivită vârstei, contextului și nivelului de cooperare al copilului.',
  },
];

const faqItems: SimpleItem[] = [
  {
    title: 'Când este recomandată prima vizită?',
    text: 'Este util ca primul contact să aibă loc devreme, într-un context liniștit, nu doar atunci când apare durerea.',
  },
  {
    title: 'Ce fac dacă celui mic îi este frică?',
    text: 'Frica este firească. Contează mult tonul, ritmul și o abordare calmă, fără presiune și fără povești alarmante.',
  },
  {
    title: 'Are sens controlul dacă nu îl doare nimic?',
    text: 'Da. Multe probleme dentare la copii pot fi observate înainte să provoace durere, iar prevenția începe tocmai prin controale.',
  },
  {
    title: 'Se tratează și dinții de lapte?',
    text: 'Da, atunci când este necesar. Dinții temporari au un rol important în confort, masticație, vorbire și dezvoltarea corectă a danturii.',
  },
];

function SectionHeading({
  eyebrow,
  title,
  intro,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-rounded text-3xl font-bold tracking-tight text-dental-heading sm:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-8 text-dental-text/85 sm:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

function SoftCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[28px] border border-dental-blueDark/15 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

function useScrollDots(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateActiveIndex();

    const onScroll = () => updateActiveIndex();
    const onResize = () => updateActiveIndex();

    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [updateActiveIndex]);

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    const target = children[index];
    if (!target) return;

    const left =
      target.offsetLeft - (container.clientWidth - target.offsetWidth) / 2;

    container.scrollTo({
      left,
      behavior: 'smooth',
    });
  }, []);

  return {
    containerRef,
    activeIndex,
    scrollToIndex,
    itemCount,
  };
}

function ScrollDots({
  activeIndex,
  itemCount,
  onSelect,
}: {
  activeIndex: number;
  itemCount: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-6 flex justify-center gap-2 md:hidden">
      {Array.from({ length: itemCount }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            type="button"
            aria-label={`Mergi la cardul ${index + 1}`}
            onClick={() => onSelect(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              isActive
                ? 'scale-110 bg-dental-mint'
                : 'bg-dental-blueDark/20 hover:bg-dental-blueDark/35'
            }`}
          />
        );
      })}
    </div>
  );
}

function MobileSnapRow({
  children,
  dots,
  containerRef,
}: {
  children: ReactNode;
  dots: {
    activeIndex: number;
    itemCount: number;
    onSelect: (index: number) => void;
  };
  containerRef: RefObject<HTMLDivElement>;
}) {
  return (
    <>
      <div className="overflow-x-auto scrollbar-hide md:overflow-visible">
        <div
          ref={containerRef}
          className="flex gap-6 snap-x snap-mandatory overflow-x-auto scrollbar-hide px-1 pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:snap-none"
        >
          {children}
        </div>
      </div>

      <ScrollDots
        activeIndex={dots.activeIndex}
        itemCount={dots.itemCount}
        onSelect={dots.onSelect}
      />
    </>
  );
}

export default function PedodontiePage() {
  const reassuranceScroll = useScrollDots(reassuranceItems.length);
  const firstVisitScroll = useScrollDots(firstVisitSteps.length);
  const approachScroll = useScrollDots(serviceHighlights.length);

  const reassuranceCards = useMemo(
    () =>
      reassuranceItems.map((item) => {
        const Icon = item.icon;

        return (
          <SoftCard
            key={item.title}
            className="h-full w-[calc(100vw-1.5rem)] max-w-[26rem] flex-shrink-0 snap-center md:w-auto md:max-w-none"          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dental-blue text-dental-mint">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-rounded text-xl font-bold text-dental-heading">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-dental-text/80">
              {item.text}
            </p>
          </SoftCard>
        );
      }),
    []
  );

  const firstVisitCards = useMemo(
    () =>
      firstVisitSteps.map((step, index) => (
        <SoftCard
          key={step.title}
          className="relative h-full w-[calc(100vw-1.5rem)] max-w-[26rem] flex-shrink-0 snap-center overflow-hidden md:w-auto md:max-w-none"        >
          <div className="absolute right-5 top-5 font-rounded text-5xl font-extrabold leading-none text-dental-blueDark/20">
            0{index + 1}
          </div>
          <div className="relative">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-dental-mint text-white shadow-lg shadow-dental-mint/20">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mt-5 max-w-[16rem] font-rounded text-xl font-bold text-dental-heading">
              {step.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-dental-text/80">
              {step.text}
            </p>
          </div>
        </SoftCard>
      )),
    []
  );

  const approachCards = useMemo(
    () =>
      serviceHighlights.map((item) => {
        const Icon = item.icon;

        return (
          <SoftCard
            key={item.title}
            className="h-full w-[calc(100vw-1.5rem)] max-w-[26rem] flex-shrink-0 snap-center md:w-auto md:max-w-none"          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dental-blue text-dental-mint">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-rounded text-xl font-bold text-dental-heading">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-dental-text/80">
              {item.text}
            </p>
          </SoftCard>
        );
      }),
    []
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-dental-cream font-body text-dental-text">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-dental-blue via-white to-dental-cream pt-8 sm:pt-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[-8%] top-20 h-56 w-56 rounded-full bg-dental-blueDark/30 blur-3xl" />
          <div className="absolute right-[-6%] top-12 h-72 w-72 rounded-full bg-dental-mint/10 blur-3xl" />
          <div className="absolute bottom-[-5rem] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-dental-blue/60 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-dental-blueDark/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-dental-heading backdrop-blur">
                <Baby className="h-4 w-4 text-dental-mint" />
                Pedodonție Duo Dent
              </div>

              <h1 className="mt-6 font-rounded text-4xl font-extrabold tracking-tight text-dental-heading sm:text-5xl lg:text-6xl">
                Îngrijire dentară blândă pentru copii
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-dental-text/85 sm:text-xl">
                Prima vizită la dentist poate influența mult felul în care copilul
                va privi controalele de mai târziu. De aceea, punem accent pe
                acomodare, prevenție și o experiență cât mai calmă pentru copii și
                părinți.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-dental-mint px-6 py-4 font-rounded text-base font-bold text-white shadow-lg shadow-dental-mint/20 transition hover:-translate-y-0.5 hover:bg-dental-mintDark"
                >
                  Programează o primă vizită
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="#prima-vizita"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-dental-blueDark/25 bg-white px-6 py-4 font-rounded text-base font-bold text-dental-heading transition hover:-translate-y-0.5 hover:border-dental-mint/40 hover:bg-dental-blue/40"
                >
                  Vezi cum decurge prima vizită
                </Link>
              </div>
            </div>

            <div>
              <Image
                src="/images/hero-dentist-p.jpg"
                alt="Consultație stomatologică pentru copii la Duo Dent"
                width={800}
                height={900}
                className="h-auto w-full rounded-[32px] border border-dental-blueDark/15 bg-white p-4 object-cover shadow-lg sm:p-5"
              />
            </div>
          </div>

          <div className="mt-10">
            <MobileSnapRow
              containerRef={reassuranceScroll.containerRef}
              dots={{
                activeIndex: reassuranceScroll.activeIndex,
                itemCount: reassuranceScroll.itemCount,
                onSelect: reassuranceScroll.scrollToIndex,
              }}
            >
              {reassuranceCards}
            </MobileSnapRow>
          </div>
        </div>
      </section>

      <section id="prima-vizita" className="bg-dental-blue/45 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Prima vizită"
            title="Cum poate decurge prima consultație"
            intro="O primă vizită calmă îi ajută atât pe copii, cât și pe părinți să înțeleagă mai bine la ce să se aștepte."
          />

          <div className="mt-10">
            <MobileSnapRow
              containerRef={firstVisitScroll.containerRef}
              dots={{
                activeIndex: firstVisitScroll.activeIndex,
                itemCount: firstVisitScroll.itemCount,
                onSelect: firstVisitScroll.scrollToIndex,
              }}
            >
              {firstVisitCards}
            </MobileSnapRow>
          </div>
        </div>
      </section>

      <section className="bg-dental-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <Image
                src="/images/pedodontie-abordare.jpg"
                alt="Pedodonție și prevenție la Duo Dent"
                width={900}
                height={1100}
                className="h-full w-full rounded-[32px] border border-dental-blueDark/15 object-cover shadow-lg"
              />
            </div>

            <div>
              <SectionHeading
                eyebrow="Abordare"
                title="Ce înseamnă pedodonția într-o clinică orientată spre familie"
                intro="Pedodonția înseamnă mai mult decât tratarea unei probleme apărute. Înseamnă prevenție, monitorizare și o relație mai bună a copilului cu vizitele la dentist."
              />
            </div>
          </div>

          <div className="mt-10">
            <MobileSnapRow
              containerRef={approachScroll.containerRef}
              dots={{
                activeIndex: approachScroll.activeIndex,
                itemCount: approachScroll.itemCount,
                onSelect: approachScroll.scrollToIndex,
              }}
            >
              {approachCards}
            </MobileSnapRow>
          </div>
        </div>
      </section>

      <section id="intrebari" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Întrebări frecvente"
            title="Ce vor să știe cel mai des părinții"
            intro="Câteva răspunsuri scurte la întrebările care apar frecvent înaintea primei vizite."
            centered
          />

          <div className="mt-10 space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.title}
                className="group rounded-[24px] border border-dental-blueDark/15 bg-dental-cream/60 p-5 shadow-sm"
              >
                <summary className="cursor-pointer list-none pr-8 font-rounded text-lg font-bold text-dental-heading marker:hidden">
                  {item.title}
                </summary>
                <p className="mt-4 border-t border-dental-blueDark/10 pt-4 text-base leading-8 text-dental-text/85">
                  {item.text}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-dental-blueDark/10 bg-dental-blue/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-dental-blueDark/10 bg-white px-6 py-8 shadow-[0_20px_70px_-45px_rgba(17,24,39,0.28)] sm:px-8 sm:py-10">
            <div className="flex flex-col items-center text-center">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
                  Programare & orientare
                </p>
                <h2 className="mt-3 font-rounded text-3xl font-bold text-dental-heading sm:text-4xl">
                  O primă vizită calmă poate face diferența.
                </h2>
                <p className="mt-4 text-base leading-8 text-dental-text/85 sm:text-lg">
                  Pentru o evaluare, un control de rutină sau un prim contact mai
                  blând cu medicul dentist, o programare făcută la timp poate fi un
                  pas bun pentru confortul copilului și liniștea ta.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="tel:0731326536"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-dental-mint px-6 py-4 font-rounded text-base font-bold text-white shadow-lg shadow-dental-mint/20 transition hover:-translate-y-0.5 hover:bg-dental-mintDark"
                >
                  Sună pentru programare
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/servicii"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-dental-blueDark/25 bg-dental-cream px-6 py-4 font-rounded text-base font-bold text-dental-heading transition hover:-translate-y-0.5 hover:border-dental-mint/40 hover:bg-dental-blue/60"
                >
                  Vezi serviciile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}