'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Clock3, MapPin, Phone, User, X } from 'lucide-react';

type Doctor = {
  name: string;
  specialty: string;
  description: string;
  image?: string;
};

type LocationItem = {
  slug: string;
  title: string;
  phones: string[];
  scheduleLines: string[];
  address: string;
  doctors: Doctor[];
};

type ActiveDoctorState = {
  doctor: Doctor;
  location: LocationItem;
};

const locations: LocationItem[] = [
  {
    slug: 'bucuresti',
    title: 'București',
    phones: ['0731.326.536', '021.673.673.0'],
    scheduleLines: [
      'Luni, Miercuri: 11:00 – 20:00',
      'Marți, Joi, Vineri: 09:00 – 18:00',
    ],
    address: 'Bd. Camil Ressu nr. 52, Bl. C16, Sc. B, Ap. 12, Parter, Sector 3',
    doctors: [
      {
        name: 'Dr. Valeriu Nedelcu',
        specialty: 'Stomatologie generală',
        description:
          'Misiunea mea este să ofer fiecărui pacient un tratament clar explicat, bine planificat și realizat cu atenție la detalii. Cred că o experiență medicală bună înseamnă răbdare, comunicare și încredere de la prima consultație până la finalul tratamentului.',
        image: '/images/echipa/valeriu-nedelcu.jpg',
      },
      {
        name: 'Mihăilă Ancuța',
        specialty: 'Asistent medical',
        description:
          'Mihăilă Ancuța face parte din echipa Duo Dent, aducând implicare și atenția necesară pentru fiecare pacient. Principalul obiectiv este oferirea unei experiențe medicale clare, bine explicate și adaptate nevoilor specifice ale fiecărei persoane.',
        image: '/images/echipa/mihaila-ancuta.jpg',
      },
      {
        name: 'Popa Titu-Răzvan',
        specialty: 'Manager general',
        description:
          'Titu-Răzvan Popa este managerul general Duo Dent, asigurând coordonarea între cele trei locații și buna funcționare a întregii echipe. Principalul obiectiv este de a facilita o experiență medicală de calitate pentru fiecare pacient.',
        image: '/images/echipa/titu-razvan-popa.jpg',
      },
    ],
  },
  {
    slug: 'belciugatele',
    title: 'Belciugatele',
    phones: ['0769.410.728'],
    scheduleLines: ['Luni – Vineri: 10:00 – 19:00'],
    address: 'Str. Liviu Ionescu nr. 83, Com. Belciugatele, Jud. Călărași',
    doctors: [
      {
        name: 'Dr. Marius Popescu',
        specialty: 'Stomatologie generală',
        description:
          'Îmi propun să ofer tratamente adaptate nevoilor reale ale fiecărui pacient, într-un mod cât mai clar și bine organizat. Pentru mine, medicina dentară înseamnă atenție, responsabilitate și construirea unei relații bazate pe încredere.',
        image: '/images/echipa/marius-popescu.jpg',
      },
      {
        name: 'Dr. Valeriu Nedelcu',
        specialty: 'Stomatologie generală',
        description:
          'Misiunea mea este să ofer fiecărui pacient un tratament clar explicat, bine planificat și realizat cu atenție la detalii. Cred că o experiență medicală bună înseamnă răbdare, comunicare și încredere de la prima consultație până la finalul tratamentului.',
        image: '/images/echipa/valeriu-nedelcu.jpg',
      },
      {
        name: 'Constantin Ana-Maria',
        specialty: 'Secretar administrativ',
        description:
          'Ana-Maria Constantin se ocupă de partea administrativă și de programările pacienților. Asigură o comunicare eficientă și organizare pentru buna funcționare a cabinetului.',
        image: '/images/echipa/ana-maria-constantin.jpg',
      },
    ],
  },
  {
    slug: 'valea-calugareasca',
    title: 'Valea Călugărească',
    phones: ['0711.042.920'],
    scheduleLines: ['Program: 10:00 – 20:00'],
    address:
      'Str. Mihai Viteazul nr. 180, Etaj, Com. Valea Călugărească, Jud. Prahova',
    doctors: [
      {
        name: 'Dr. Ioana Ludușan',
        specialty: 'Stomatologie generală',
        description:
          'Cred într-o abordare calmă și atentă, în care pacientul înțelege fiecare etapă a tratamentului. Îmi doresc ca experiența din cabinet să fie clară, echilibrată și adaptată nevoilor reale ale fiecărei persoane.',
        image: '/images/echipa/ioana-ludusan.jpeg',
      },
      {
        name: 'Dr. Alexandru Vrăjescu',
        specialty: 'Stomatologie generală',
        description:
          'Pentru mine, un tratament bun începe cu atenție, răbdare și comunicare clară. Îmi propun să construiesc o experiență medicală în care pacientul se simte în siguranță și primește soluții bine explicate și corect aplicate.',
        image: '/images/echipa/alexandru-vrajescu.jpg',
      },
      {
        name: 'Dr. Ștefan Limboseanu',
        specialty: 'Endodonție',
        description:
          'În practica mea, precizia și atenția la detalii sunt esențiale. Îmi doresc ca fiecare pacient să primească un plan clar, tratamente realizate cu grijă și susținerea necesară pentru a merge mai departe cu încredere.',
        image: '/images/echipa/stefan-limboseanu.jpg',
      },
      {
        name: 'Dr. Claudiu Negru',
        specialty: 'Chirurgie',
        description:
          'Pun accent pe siguranță, claritate și o comunicare atentă înainte de fiecare intervenție. Consider că încrederea pacientului se construiește prin explicații corecte, calm și o abordare medicală responsabilă.',
      },
      {
        name: 'Veronica Sârbu',
        specialty: 'Asistent medical',
        description:
          'Veronica Sârbu asigură suportul necesar în cabinet, ajutând la organizare și la buna desfășurare a tratamentelor. Este parte importantă a echipei, contribuind la confortul și siguranța pacienților.',
        image: '/images/echipa/veronica-sarbu.jpg',
      },
      {
        name: 'Georgiana Dumitru',
        specialty: 'Asistent medical',
        description:
          'Georgiana Dumitru face parte din echipa Duo Dent, asigurând suportul necesar în cabinet și ajutând la buna desfășurare a tratamentelor. Este parte importantă a echipei, contribuind la confortul și siguranța pacienților.',
        image: '/images/echipa/georgiana-dumitru.jpeg',
      },
      {
        name: 'Cătălin Vasile',
        specialty: 'Manager',
        description:
          'Cătălin Vasile coordonează activitatea cabinetului din Valea Călugărească, asigurând buna funcționare și organizare. Se ocupă de programări și de comunicarea cu pacienții.',
        image: '/images/echipa/catalin-vasile.jpg',
      },
    ],
  },
];

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export default function EchipaNoastraPage() {
  const [selectedLocationSlug, setSelectedLocationSlug] = useState('bucuresti');
  const [activeDoctorState, setActiveDoctorState] = useState<ActiveDoctorState | null>(null);

  const selectedLocation = useMemo(
    () =>
      locations.find((location) => location.slug === selectedLocationSlug) ??
      locations[0],
    [selectedLocationSlug]
  );

  // Snapshot of the location frozen at click time — independent of the tab switcher
  const activeDoctor = activeDoctorState?.doctor ?? null;
  const activeLocation = activeDoctorState?.location ?? selectedLocation;

  useEffect(() => {
    if (!activeDoctorState) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDoctorState(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeDoctorState]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-dental-cream font-body text-dental-text">
      <header className="relative overflow-hidden bg-gradient-to-b from-dental-blue to-dental-cream px-6 pb-16 pt-28 md:pb-20">
        <div className="absolute left-0 top-0 h-56 w-56 -translate-x-1/3 -translate-y-1/3 rounded-full bg-white/80 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 translate-x-1/3 rounded-full bg-dental-mint/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-dental-heading shadow-sm backdrop-blur">
                <User size={14} className="text-dental-mint" />
                Echipa Duo Dent
              </div>

              <h1 className="font-rounded text-4xl font-bold leading-tight text-dental-heading sm:text-5xl lg:text-6xl">
                Echipa noastră
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-dental-text/85 sm:text-lg">
                Echipa medicală Duo Dent reunește medici care lucrează în cele
                trei locații, cu o abordare atentă, clară și adaptată fiecărui
                pacient.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="/servicii"
                  className="inline-flex items-center gap-2 rounded-2xl bg-dental-mint px-6 py-3.5 font-rounded text-base font-bold text-white shadow-lg shadow-dental-mint/20 transition hover:-translate-y-0.5 hover:bg-dental-mintDark"
                >
                  Serviciile noastre
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-dental-heading/10 bg-white px-6 py-3.5 font-rounded text-base font-bold text-dental-heading transition hover:bg-dental-blue"
                >
                  Programează o vizită
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <section id="selector-locatie" className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 max-w-2xl">
            <h2 className="font-rounded text-3xl font-bold text-dental-heading sm:text-4xl">
              Alege cabinetul și descoperă echipa medicală
            </h2>
            <p className="mt-4 text-base leading-8 text-dental-text/80 sm:text-lg">
              Fiecare locație are propria echipă medicală, iar aici poți vedea
              mai ușor cine activează în cabinetul care te interesează.
            </p>
          </div>

          <div className="mb-6 md:hidden">
            <label
              htmlFor="location-select"
              className="mb-2 block text-sm font-semibold text-dental-mint"
            >
              Selectează locația
            </label>
            <div className="rounded-[22px] border-2 border-dental-mint bg-dental-mint/5 p-1.5">
              <select
                id="location-select"
                value={selectedLocationSlug}
                onChange={(event) => setSelectedLocationSlug(event.target.value)}
                className="w-full rounded-[18px] border-0 bg-white px-4 py-3 text-base font-bold text-dental-heading focus:outline-none focus:ring-2 focus:ring-dental-mint"
              >
                {locations.map((location) => (
                  <option key={location.slug} value={location.slug}>
                    {location.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6 hidden grid-cols-3 gap-3 md:grid">
            {locations.map((location) => {
              const isActive = location.slug === selectedLocationSlug;

              return (
                <button
                  key={location.slug}
                  type="button"
                  onClick={() => setSelectedLocationSlug(location.slug)}
                  className={`rounded-[24px] border-2 px-5 py-4 text-left transition ${
                    isActive
                      ? 'border-dental-mint bg-dental-mint text-white shadow-lg shadow-dental-mint/30'
                      : 'border-dental-mint/30 bg-white text-dental-heading hover:border-dental-mint hover:bg-dental-mint hover:text-white'
                  }`}
                >
                  <span className="block font-rounded text-xl font-bold">
                    {location.title}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedLocation.slug}-team`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-dental-mint">
                    Cabinet selectat
                  </p>
                  <h3 className="mt-2 font-rounded text-3xl font-bold text-dental-mint">
                    {selectedLocation.title}
                  </h3>
                </div>

                <a
                  href={phoneHref(selectedLocation.phones[0])}
                  className="inline-flex items-center gap-2 rounded-2xl bg-dental-mint px-5 py-3 font-rounded text-sm font-bold text-white transition hover:bg-dental-mintDark"
                >
                  <Phone size={16} />
                  Sună cabinetul
                </a>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <article className="flex h-full flex-col rounded-[30px] border border-dental-blueDark/10 bg-white p-6 shadow-[0_25px_70px_-35px_rgba(55,71,79,0.28)] sm:p-7">
                  <div className="mb-5">
                    <p className="mb-2 inline-flex rounded-full bg-dental-blue px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-dental-heading">
                      {selectedLocation.title}
                    </p>
                    <h3 className="font-rounded text-2xl font-bold text-dental-heading">
                      Informații cabinet
                    </h3>
                    <p className="mt-2 text-base leading-8 text-dental-text/80">
                      Informațiile esențiale despre cabinetul selectat, pentru o
                      orientare mai clară.
                    </p>
                  </div>

                  <div className="space-y-5 text-sm leading-7 text-dental-text">
                    <div className="flex items-start gap-3">
                      <Clock3 size={18} className="mt-1 shrink-0 text-dental-mint" />
                      <div>
                        <p className="font-semibold text-dental-heading">Program</p>
                        <div className="mt-1">
                          {selectedLocation.scheduleLines.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="mt-1 shrink-0 text-dental-mint" />
                      <div>
                        <p className="font-semibold text-dental-heading">Adresă</p>
                        <p className="mt-1">{selectedLocation.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <a
                      href={phoneHref(selectedLocation.phones[0])}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-dental-mint px-5 py-3 font-rounded text-sm font-bold text-white transition hover:bg-dental-mintDark"
                    >
                      <Phone size={16} />
                      {selectedLocation.phones[0]}
                    </a>
                  </div>
                </article>

                {selectedLocation.doctors.map((doctor, index) => (
                  <motion.article
                    key={`${selectedLocation.slug}-${doctor.name}`}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-dental-blueDark/10 bg-white p-6 shadow-[0_25px_70px_-35px_rgba(55,71,79,0.28)] transition hover:-translate-y-1 hover:shadow-[0_35px_80px_-35px_rgba(55,71,79,0.34)] sm:p-7"
                  >
                    <div className="mb-6 overflow-hidden rounded-[24px] border border-dental-blueDark/10 bg-white p-3">
                      <div className="overflow-hidden rounded-[20px] bg-white">
                        {doctor.image ? (
                          <div className="relative aspect-[4/5] w-full">
                            <Image
                              src={doctor.image}
                              alt={doctor.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        ) : (
                          <div className="flex min-h-[240px] items-center justify-center">
                            <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                              <Image
                                src="/logo-doudent.png"
                                alt="Duo Dent"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-5">
                      <p className="mb-2 inline-flex rounded-full bg-dental-blue px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-dental-heading">
                        {selectedLocation.title}
                      </p>
                      <h3 className="font-rounded text-2xl font-bold text-dental-heading">
                        {doctor.name}
                      </h3>
                      {doctor.specialty && (
                        <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-dental-cream px-3 py-1.5 text-sm font-semibold text-dental-text">
                          <User size={14} className="text-dental-mint" />
                          {doctor.specialty}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-3">
                      <button
                        type="button"
                        onClick={() => setActiveDoctorState({ doctor, location: selectedLocation })}
                        className="inline-flex items-center gap-2 rounded-2xl bg-dental-heading px-5 py-3 font-rounded text-sm font-bold text-white transition hover:bg-[#2d3d44]"
                      >
                        Vezi detalii
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[34px] border border-dental-blueDark/10 bg-white shadow-[0_30px_90px_-35px_rgba(55,71,79,0.3)]">
            <div className="p-8 text-center sm:p-10 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mint">
                Programare
              </p>
              <h2 className="mt-3 font-rounded text-3xl font-bold text-dental-heading sm:text-4xl">
                Programează o consultație în {selectedLocation.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-dental-text/80">
                Dacă știi deja locația potrivită pentru tine, poți suna direct
                cabinetul selectat. Datele complete pentru toate clinicile rămân
                disponibile și în footer, fără să încărcăm vizual această
                pagină.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={phoneHref(selectedLocation.phones[0])}
                  className="inline-flex items-center gap-2 rounded-2xl bg-dental-mint px-6 py-3.5 font-rounded text-base font-bold text-white transition hover:bg-dental-mintDark"
                >
                  <Phone size={18} />
                  Sună cabinetul
                </a>
                <a
                  href="#clinici"
                  className="inline-flex items-center gap-2 rounded-2xl border border-dental-heading/10 bg-white px-6 py-3.5 font-rounded text-base font-bold text-dental-heading transition hover:bg-dental-blue"
                >
                  Vezi toate clinicile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeDoctorState && (
          <motion.div
            className="fixed inset-0 z-[80] overflow-y-auto bg-dental-heading/60 p-3 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDoctorState(null)}
          >
            <div className="flex min-h-full items-end justify-center sm:items-center">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="doctor-modal-title"
                className="relative w-full max-w-4xl rounded-[32px] bg-white p-5 shadow-2xl sm:max-h-[90vh] sm:p-8"
              >
                <button
                  type="button"
                  onClick={() => setActiveDoctorState(null)}
                  className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-dental-blueDark/10 bg-white text-dental-heading transition hover:bg-dental-blue"
                  aria-label="Închide"
                >
                  <X size={18} />
                </button>

                <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-10">
                  <div>
                    <div className="overflow-hidden rounded-[28px] border border-dental-blueDark/10 bg-white p-3">
                      <div className="overflow-hidden rounded-[22px] bg-white">
                        {activeDoctor?.image ? (
                          <div className="relative aspect-[4/5] w-full">
                            <Image
                              src={activeDoctor.image}
                              alt={activeDoctor.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 340px"
                            />
                          </div>
                        ) : (
                          <div className="flex min-h-[320px] items-center justify-center">
                            <div className="relative h-32 w-32 sm:h-36 sm:w-36">
                              <Image
                                src="/logo-doudent.png"
                                alt="Duo Dent"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="inline-flex rounded-full bg-dental-blue px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-dental-heading">
                      {activeLocation.title}
                    </p>

                    <h3
                      id="doctor-modal-title"
                      className="mt-4 font-rounded text-3xl font-bold text-dental-heading sm:text-4xl"
                    >
                      {activeDoctor?.name}
                    </h3>

                    {activeDoctor?.specialty && (
                      <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-dental-cream px-4 py-2 text-sm font-semibold text-dental-text">
                        <User size={16} className="text-dental-mint" />
                        {activeDoctor.specialty}
                      </p>
                    )}

                    <div className="mt-6 rounded-[28px] bg-dental-cream p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-dental-mint">
                        Prezentare
                      </p>
                      <p className="mt-4 text-base leading-8 text-dental-text/85">
                        {activeDoctor?.description}
                      </p>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[24px] border border-dental-blueDark/10 bg-white p-5">
                        <div className="mb-3 flex items-center gap-2 text-dental-heading">
                          <MapPin size={18} className="text-dental-mint" />
                          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-dental-heading">
                            Cabinet
                          </p>
                        </div>
                        <p className="text-sm leading-7 text-dental-text">
                          {activeLocation.title}
                          <br />
                          {activeLocation.address}
                        </p>
                      </div>

                      <div className="rounded-[24px] border border-dental-blueDark/10 bg-white p-5">
                        <div className="mb-3 flex items-center gap-2 text-dental-heading">
                          <Phone size={18} className="text-dental-mint" />
                          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-dental-heading">
                            Programări
                          </p>
                        </div>
                        <div className="space-y-2 text-sm leading-7 text-dental-text">
                          {activeLocation.phones.map((phone) => (
                            <a
                              key={phone}
                              href={phoneHref(phone)}
                              className="block transition hover:text-dental-mint"
                            >
                              {phone}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={phoneHref(activeLocation.phones[0])}
                        className="inline-flex items-center gap-2 rounded-2xl bg-dental-mint px-5 py-3 font-rounded text-sm font-bold text-white transition hover:bg-dental-mintDark"
                      >
                        <Phone size={16} />
                        Sună cabinetul
                      </a>
                      <button
                        type="button"
                        onClick={() => setActiveDoctorState(null)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-dental-heading/10 bg-white px-5 py-3 font-rounded text-sm font-bold text-dental-heading transition hover:bg-dental-blue"
                      >
                        Închide
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
