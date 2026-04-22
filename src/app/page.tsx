'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Baby,
  CheckCircle2,
  Heart,
  Microscope,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
} from 'lucide-react';

const services = [
  {
    title: 'Protetică & laborator',
    icon: <Microscope />,
    desc: 'Coroane, punți și proteze realizate intern pentru precizie și viteză.',
  },
  {
    title: 'Implantologie',
    icon: <ShieldCheck />,
    desc: 'Reabilitare orală completă folosind implanturi de ultimă generație.',
  },
  {
    title: 'Estetică dentară',
    icon: <Smile />,
    desc: 'Albire profesională și fațete pentru un zâmbet mai luminos și natural.',
  },
  {
    title: 'Endodonție',
    icon: <Stethoscope />,
    desc: 'Tratamente de canal la microscop pentru salvarea dintelui natural.',
  },
  {
    title: 'Pedodonție',
    icon: <Baby />,
    desc: 'Tratamente speciale pentru copii, într-un mediu calm și prietenos.',
  },
];

const trustItems = [
  {
    icon: <Microscope size={22} />,
    title: 'Laborator propriu',
    text: 'Control mai bun al calității, al timpilor de execuție și al rezultatului final.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Experiență din 2003',
    text: 'O echipă cu experiență, abordare atentă și soluții adaptate fiecărui pacient.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Abordare completă',
    text: 'Consultație, plan de tratament și intervenții coordonate mai clar, în cadrul aceleiași echipe.',
  },
];

const pediatricBenefits = [
  'Prevenirea cariilor de la vârste fragede',
  'Sigilări și fluorizări',
  'Atmosferă prietenoasă pentru a elimina frica',
];

const testimonials = [
  {
    name: 'Elena D.',
    text: 'Am fost impresionată de faptul că au laborator propriu. Coroana dentară a fost gata foarte repede și arată perfect natural. Recomand echipa Duo Dent!',
  },
  {
    name: 'Mihai A.',
    text: 'Merg la ei de ani de zile, atât eu cât și copiii. Personalul este tânăr, amabil și foarte bine pregătit. Nu am simțit durere la niciun tratament.',
  },
  {
    name: 'Andreea P.',
    text: 'Mi-a plăcut mult că totul a fost explicat clar, fără grabă. Am simțit că primesc o soluție potrivită pentru mine, nu un tratament standard.',
  },
];

export default function DuoDentHome() {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const testimonialScrollContainerRef = useRef<HTMLDivElement>(null);

  // Track active testimonial in horizontal scroll
  useEffect(() => {
    const handleScroll = () => {
      if (testimonialScrollContainerRef.current && typeof window !== 'undefined') {
        const scrollLeft = testimonialScrollContainerRef.current.scrollLeft;
        const containerWidth = testimonialScrollContainerRef.current.clientWidth;
        // Each card takes full container width
        const cardWidth = containerWidth;
        const activeIndex = Math.round(scrollLeft / cardWidth);
        setActiveTestimonialIndex(Math.max(0, Math.min(activeIndex, testimonials.length - 1)));
      }
    };

    const scrollContainer = testimonialScrollContainerRef.current;
    if (scrollContainer && typeof window !== 'undefined') {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-dental-cream font-body text-dental-text">
      {/* HERO MOBILE */}
      <header className="relative overflow-hidden bg-gradient-to-b from-dental-blue to-dental-cream px-6 pb-14 pt-28 md:hidden">
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-dental-heading shadow-sm backdrop-blur">
            <Microscope size={14} className="text-dental-mint" />
            Experiență, tehnologie, grijă
          </div>

          <h1 className="mb-4 font-rounded text-4xl font-bold leading-tight text-dental-heading">
            Clinica stomatologică <br />
            <span className="text-dental-mint">Duo Dent</span>
          </h1>

          <p className="mb-6 max-w-xl text-base leading-relaxed text-dental-text/80">
            Îngrijire dentară pentru întreaga familie, cu experiență de peste 20
            de ani, laborator propriu și o abordare clară, calmă și atentă.
          </p>

          <div className="relative mb-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl">
              <Image
                src="/hero-dentist.jpg"
                alt="Echipa Duo Dent"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute -bottom-4 right-4 rounded-2xl bg-white p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Microscope size={18} className="text-dental-mint" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-dental-text/60">
                    Avantaj Duo Dent
                  </p>
                  <p className="text-sm font-bold text-dental-heading">
                    Laborator propriu
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-3">
            <a
              href="/contact"
              className="w-full rounded-2xl bg-dental-mint px-6 py-4 text-center font-rounded text-lg font-bold text-white shadow-lg transition hover:bg-dental-mintDark"
            >
              Programează o vizită
            </a>
            <a
              href="#servicii"
              className="w-full rounded-2xl border border-dental-heading/10 bg-white px-6 py-4 text-center font-rounded text-lg font-bold text-dental-heading transition hover:bg-dental-blue"
            >
              Vezi serviciile
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm backdrop-blur">
              <p className="font-rounded text-xl font-bold text-dental-heading">
                20+
              </p>
              <p className="mt-1 text-xs text-dental-text/70">ani experiență</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm backdrop-blur">
              <p className="font-rounded text-xl font-bold text-dental-heading">
                3
              </p>
              <p className="mt-1 text-xs text-dental-text/70">locații</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm backdrop-blur">
              <p className="font-rounded text-xl font-bold text-dental-heading">
                1
              </p>
              <p className="mt-1 text-xs text-dental-text/70">laborator propriu</p>
            </div>
          </div>
        </motion.div>
      </header>

      {/* HERO DESKTOP */}
      <header className="relative hidden min-h-screen items-center overflow-hidden md:flex">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-dentist.jpg"
            alt="Cabinet Duo Dent"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dental-cream via-dental-blue/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
              className="max-w-2xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-dental-heading shadow-sm backdrop-blur">
                <Microscope size={14} className="text-dental-mint" />
                Clinică & laborator
              </div>

              <h1 className="mb-7 font-rounded text-6xl font-bold leading-[1.06] text-dental-heading lg:text-7xl">
                Clinica stomatologică <br />
                <span className="text-dental-mint">Duo Dent</span>
              </h1>

              <p className="mb-10 max-w-xl text-xl font-medium leading-relaxed text-dental-heading/80">
                La Duo Dent, combinăm experiența de peste 20 de ani cu tehnologia
                modernă și propriul laborator de tehnică dentară, pentru
                tratamente complete și o experiență mai clară pentru pacient.
              </p>

              <div className="mb-10 flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl bg-dental-mint px-10 py-5 font-rounded text-xl font-bold text-white shadow-xl shadow-dental-mint/20 transition hover:-translate-y-1 hover:bg-dental-mintDark"
                >
                  Programează o vizită
                </a>
                <a
                  href="#servicii"
                  className="inline-flex items-center rounded-2xl border-2 border-white bg-white/80 px-10 py-5 font-rounded text-xl font-bold text-dental-heading backdrop-blur transition hover:-translate-y-1 hover:bg-white"
                >
                  Vezi servicii
                </a>
              </div>

              <div className="grid max-w-2xl grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/50 bg-white/70 p-5 shadow-sm backdrop-blur">
                  <p className="font-rounded text-3xl font-bold text-dental-heading">
                    20+
                  </p>
                  <p className="mt-1 text-sm text-dental-text/70">ani experiență</p>
                </div>
                <div className="rounded-2xl border border-white/50 bg-white/70 p-5 shadow-sm backdrop-blur">
                  <p className="font-rounded text-3xl font-bold text-dental-heading">
                    3
                  </p>
                  <p className="mt-1 text-sm text-dental-text/70">locații Duo Dent</p>
                </div>
                <div className="rounded-2xl border border-white/50 bg-white/70 p-5 shadow-sm backdrop-blur">
                  <p className="font-rounded text-3xl font-bold text-dental-heading">
                    1
                  </p>
                  <p className="mt-1 text-sm text-dental-text/70">laborator propriu</p>
                </div>
              </div>
            </motion.div>

            <div className="hidden lg:block" />
          </div>
        </div>
      </header>

      {/* WHY US */}
      <section id="de-ce-noi" className="bg-white px-6 py-24">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-dental-mint">
            De ce Duo Dent
          </p>
          <h2 className="mb-4 font-rounded text-3xl font-bold text-dental-heading md:text-4xl">
            Mai multă claritate, mai multă încredere
          </h2>
          <p className="text-dental-text/70">
            Punem accent pe calitatea actului medical, comunicare clară și soluții
            bine potrivite pentru fiecare pacient.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-dental-blue/50 bg-dental-cream p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-dental-blue text-dental-mint">
                {item.icon}
              </div>
              <h3 className="mb-3 font-rounded text-xl font-bold text-dental-heading">
                {item.title}
              </h3>
              <p className="text-sm leading-6 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicii" className="bg-dental-cream px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-dental-mint">
              Servicii
            </p>
            <h2 className="mb-4 font-rounded text-3xl font-bold text-dental-heading md:text-4xl">
              Servicii & tratamente
            </h2>
            <p className="mx-auto max-w-2xl text-dental-text/70">
              Tratamente gândite pentru funcționalitate, estetică și confort, cu
              atenție la detalii și o abordare integrată.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="shrink-0 rounded-xl bg-dental-blue p-3 text-dental-heading">
                  {service.icon}
                </div>
                <div>
                  <h3 className="mb-1 font-rounded text-lg font-bold text-dental-heading">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-6 text-gray-500">{service.desc}</p>
                </div>
              </div>
            ))}

            <a
              href="/servicii"
              className="group flex items-start gap-4 rounded-2xl bg-dental-mint p-6 text-white shadow-sm transition hover:-translate-y-1 hover:bg-dental-mintDark hover:shadow-md"
            >
              <div className="shrink-0 rounded-xl bg-white/15 p-3 text-white">
                <Sparkles />
              </div>
              <div>
                <h3 className="mb-1 font-rounded text-lg font-bold text-white">
                  Vezi toate serviciile
                </h3>
                <p className="text-sm leading-6 text-white/90">
                  Descoperă toate tratamentele disponibile în cadrul Duo Dent.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Explorează pagina de servicii
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA PRIMARY */}
      <section className="bg-dental-cream px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-dental-blue/50 bg-white shadow-sm">
            <div className="flex flex-col items-center text-center px-8 py-10 md:px-12 md:py-12">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-dental-mint">
                  Programare rapidă
                </p>
                <h2 className="mb-4 font-rounded text-3xl font-bold text-dental-heading md:text-4xl">
                  Ai nevoie de o consultație sau de un plan de tratament?
                </h2>
                <p className="text-base leading-7 text-dental-text/75">
                  Echipa Duo Dent te poate ghida către soluția potrivită, în
                  funcție de nevoile tale, istoricul tău și opțiunile disponibile
                  în clinicile noastre.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-dental-mint px-6 py-4 font-rounded text-base font-bold text-white shadow-lg transition hover:bg-dental-mintDark"
                >
                  Programează o vizită
                  <ArrowRight size={18} />
                </a>

                <a
                  href="/servicii"
                  className="inline-flex items-center justify-center rounded-2xl border border-dental-heading/10 bg-dental-blue px-6 py-4 font-rounded text-base font-bold text-dental-heading transition hover:bg-dental-blue/80"
                >
                  Vezi serviciile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PEDIATRIC */}
      <section
        id="copii"
        className="relative overflow-hidden bg-dental-blue/30 px-6 py-24"
      >
        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-dental-mint px-4 py-1 text-xs font-bold uppercase text-white">
              <Baby size={16} />
              Stomatologie pediatrică
            </div>

            <h2 className="mb-6 font-rounded text-3xl font-bold text-dental-heading md:text-4xl">
              Educație și prevenție pentru cei mici
            </h2>

            <p className="mb-6 text-base leading-7 text-dental-text/85">
              Ne dorim ca experiența la dentist să înceapă într-un mod calm și
              pozitiv. Accentul este pus pe prevenție, educație și relația de
              încredere dintre copil, părinte și medic.
            </p>

            <div className="mb-8 space-y-3">
              {pediatricBenefits.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-dental-mint"
                  />
                  <p className="font-medium text-dental-heading">{item}</p>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-dental-heading px-6 py-3 font-bold text-white shadow-lg transition hover:bg-gray-800"
            >
              Programează o consultație
            </a>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-xl">
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-dental-cream">
              <Image
                src="/kids-dentist.jpg"
                alt="Copil la dentist Duo Dent"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-dental-mint">
              Încrederea pacienților
            </p>
            <h2 className="mb-4 font-rounded text-3xl font-bold text-dental-heading md:text-4xl">
              Ce spun pacienții noștri
            </h2>
            <p className="mx-auto max-w-2xl text-dental-text/70">
              Apreciem încrederea pe care o primim și relațiile construite în timp,
              cu răbdare, consecvență și grijă reală pentru pacient.
            </p>
          </div>

          {/* Mobile: Horizontal snap scroll */}
          <div className="block lg:hidden">
            <div ref={testimonialScrollContainerRef} className="overflow-x-auto scrollbar-hide">
              <div className="flex snap-x snap-mandatory pb-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className="flex-shrink-0 w-[calc(100vw-2rem)] snap-center rounded-2xl border border-dental-blue bg-dental-cream p-8 transition hover:shadow-lg"
                    style={{ marginRight: index === testimonials.length - 1 ? '0' : '1rem' }}
                  >
                    <div className="mb-4 flex text-yellow-400">
                      <Star fill="currentColor" />
                      <Star fill="currentColor" />
                      <Star fill="currentColor" />
                      <Star fill="currentColor" />
                      <Star fill="currentColor" />
                    </div>
                    <p className="mb-5 italic leading-7 text-gray-600">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <p className="font-bold text-dental-heading">
                      — {testimonial.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicators for testimonials */}
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (testimonialScrollContainerRef.current && typeof window !== 'undefined') {
                      const cardWidth = testimonialScrollContainerRef.current.clientWidth;
                      testimonialScrollContainerRef.current.scrollTo({
                        left: index * cardWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonialIndex
                      ? 'bg-dental-mint'
                      : 'bg-dental-blueDark/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Original grid layout */}
          <div className="hidden lg:grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-dental-blue bg-dental-cream p-8"
              >
                <div className="mb-4 flex text-yellow-400">
                  <Star fill="currentColor" />
                  <Star fill="currentColor" />
                  <Star fill="currentColor" />
                  <Star fill="currentColor" />
                  <Star fill="currentColor" />
                </div>
                <p className="mb-5 italic leading-7 text-gray-600">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="font-bold text-dental-heading">
                  — {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
