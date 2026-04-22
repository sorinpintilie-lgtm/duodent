'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  ChevronDown,
  AlertCircle,
  ClipboardList,
  MapPin,
  Phone,
} from 'lucide-react';

import { tariffData } from './tarife.data';

type ClinicId = (typeof tariffData)[number]['id'];
type CategoryId = (typeof tariffData)[number]['categories'][number]['id'];

const clinicMeta: Record<
  ClinicId,
  {
    shortLabel: string;
    blurb: string;
  }
> = {
  bucuresti: {
    shortLabel: 'Sector 3, București',
    blurb:
      'Listă de tarife pentru cabinetul Duo Dent din București, organizată pe categorii medicale.',
  },
  belciugatele: {
    shortLabel: 'Belciugatele, Călărași',
    blurb:
      'Listă de tarife pentru cabinetul Duo Dent din Belciugatele, cu afișare clară pe servicii și categorii.',
  },
  'valea-calugareasca': {
    shortLabel: 'Valea Călugărească, Prahova',
    blurb:
      'Listă de tarife pentru cabinetul Duo Dent din Valea Călugărească, inclusiv categoriile suplimentare disponibile local.',
  },
};

const categoryNotes: Partial<Record<ClinicId, Partial<Record<CategoryId, string[]>>>> = {
  bucuresti: {
    chirurgie: [
      'Procedurile marcate în lista sursă cu * nu includ anestezia locală.',
      'Pentru anumite lucrări care nu au fost executate în cabinetul nostru nu se acordă garanție.',
    ],
    implantologie: [
      'Consultația specialist include consult, diagnostic, plan de tratament, etape de tratament și costuri estimative.',
      'Faza chirurgicală include toate manoperele chirurgicale de poziționare și implantul menționat în lista sursă.',
      'Faza protetică include poziționarea capelor de vindecare, amprentarea, bontul protetic și cimentarea lucrării protetice.',
      'Pentru serviciile exprimate în euro, plata se efectuează în lei la cursul BNR din ziua plății.',
    ],
  },
  belciugatele: {
    chirurgie: [
      'Procedurile marcate în lista sursă cu * nu includ anestezia locală.',
      'Pentru anumite lucrări care nu au fost executate în cabinetul nostru nu se acordă garanție.',
    ],
    implantologie: [
      'Consultația specialist include consult, diagnostic, plan de tratament, etape de tratament și costuri estimative.',
      'Faza chirurgicală include toate manoperele chirurgicale de poziționare și implantul menționat în lista sursă.',
      'Faza protetică include poziționarea capelor de vindecare, amprentarea, bontul protetic și cimentarea lucrării protetice.',
      'Pentru serviciile exprimate în euro, plata se efectuează în lei la cursul BNR din ziua plății.',
    ],
  },
  'valea-calugareasca': {
    chirurgie: [
      'Pentru procedurile chirurgicale complexe, costul final poate depinde de particularitățile cazului clinic.',
    ],
    implantologie: [
      'În implantologie există servicii exprimate în euro și servicii exprimate în lei, conform listei sursă a cabinetului.',
      'Pentru serviciile exprimate în euro, plata se efectuează în lei la cursul BNR din ziua plății.',
    ],
  },
};

const defaultClinicId: ClinicId = 'bucuresti';

function formatPrice(priceDisplay: string, currency: 'RON' | 'EUR') {
  return `${priceDisplay.replace(/\s*-\s*/g, ' – ')} ${currency}`;
}

export default function TarifePage() {
  const [selectedClinicId, setSelectedClinicId] = useState<ClinicId>(defaultClinicId);

  const selectedClinic = useMemo(() => {
    return tariffData.find((clinic) => clinic.id === selectedClinicId) ?? tariffData[0];
  }, [selectedClinicId]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>(
    tariffData.find((clinic) => clinic.id === defaultClinicId)?.categories[0].id ??
      tariffData[0].categories[0].id
  );

  const availableCategories = selectedClinic.categories;

  const selectedCategory = useMemo(() => {
    if (!availableCategories.some((category) => category.id === selectedCategoryId)) {
      return availableCategories[0];
    }

    return (
      availableCategories.find((category) => category.id === selectedCategoryId) ??
      availableCategories[0]
    );
  }, [availableCategories, selectedCategoryId]);

  const selectedCategoryItemCount = selectedCategory.blocks.reduce(
    (total, block) => total + block.items.length,
    0
  );
  const categoryNotes = selectedCategory.notes ?? [];

  const onClinicChange = (clinicId: ClinicId) => {
    setSelectedClinicId(clinicId);

    const clinic = tariffData.find((entry) => entry.id === clinicId);
    if (!clinic) return;

    const hasCurrentCategory = clinic.categories.some(
      (category) => category.id === selectedCategoryId
    );

    if (!hasCurrentCategory) {
      setSelectedCategoryId(clinic.categories[0].id);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-dental-cream font-body text-dental-text">
      <section className="relative overflow-hidden bg-gradient-to-b from-dental-blue to-dental-cream px-6 pb-14 pt-28 md:pb-18 md:pt-36">
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/3 -translate-y-1/3 rounded-full bg-white/80 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/4 -translate-y-1/3 rounded-full bg-dental-mint/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-dental-heading shadow-sm backdrop-blur">
              <ClipboardList size={14} className="text-dental-mint" />
              Tarife
            </div>

            <h1 className="mb-5 font-rounded text-4xl font-bold leading-tight text-dental-heading md:text-6xl md:leading-[1.08]">
              Tarife Duo Dent
            </h1>

            <p className="max-w-2xl text-base leading-7 text-dental-text/80 md:text-lg md:leading-8">
              Alege cabinetul și categoria dorită pentru a vedea rapid informațiile de preț.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 md:hidden">
            <label
              htmlFor="cabinet-select"
              className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-dental-heading/70"
            >
              Alege cabinetul
            </label>
            <div className="relative">
              <select
                id="cabinet-select"
                value={selectedClinic.id}
                onChange={(event) => onClinicChange(event.target.value as ClinicId)}
                className="w-full appearance-none rounded-2xl border border-dental-blueDark/50 bg-white px-4 py-4 pr-12 font-rounded text-base font-bold text-dental-heading shadow-sm outline-none transition focus:border-dental-mint focus:ring-2 focus:ring-dental-mint/20"
              >
                {tariffData.map((clinic) => (
                  <option key={clinic.id} value={clinic.id}>
                    {clinic.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-dental-heading/60"
              />
            </div>
          </div>

          <div className="mb-6 hidden gap-4 md:flex md:flex-wrap">
            {tariffData.map((clinic) => {
              const isActive = clinic.id === selectedClinic.id;

              return (
                <button
                  key={clinic.id}
                  type="button"
                  onClick={() => onClinicChange(clinic.id)}
                  className={`inline-flex items-center gap-3 rounded-2xl px-5 py-4 font-rounded text-base font-bold transition ${
                    isActive
                      ? 'bg-dental-mint text-white shadow-lg shadow-dental-mint/20'
                      : 'border border-dental-blueDark/50 bg-white text-dental-heading hover:-translate-y-0.5 hover:border-dental-mint/40 hover:bg-dental-blue/40'
                  }`}
                >
                  <Building2 size={18} />
                  {clinic.label}
                </button>
              );
            })}
          </div>

          <div className="mb-6 rounded-[28px] border border-dental-blue/50 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-dental-blue px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-dental-heading">
                    <MapPin size={13} className="text-dental-mint" />
                    {clinicMeta[selectedClinic.id].shortLabel}
                  </span>
                  <span className="inline-flex rounded-full bg-dental-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-dental-text/70">
                    {selectedClinic.categories.length} categorii disponibile
                  </span>
                  <span className="inline-flex rounded-full bg-dental-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-dental-text/70">
                     {selectedCategoryItemCount} servicii disponibile în această categorie
                  </span>
                </div>

                <h2 className="mb-2 font-rounded text-2xl font-bold text-dental-heading md:text-3xl">
                  {selectedClinic.label}
                </h2>
                <p className="leading-7 text-dental-text/80">
                  {clinicMeta[selectedClinic.id].blurb}
                </p>
              </div>

              <div className="w-full lg:max-w-sm">
                <label
                  htmlFor="category-select"
                  className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-dental-heading/70"
                >
                  Alege categoria de servicii
                </label>
                <div className="relative">
                  <select
                    id="category-select"
                    value={selectedCategory.id}
                    onChange={(event) => setSelectedCategoryId(event.target.value as CategoryId)}
                    className="w-full appearance-none rounded-2xl border border-dental-blueDark/50 bg-dental-cream px-4 py-4 pr-12 font-rounded text-base font-bold text-dental-heading outline-none transition focus:border-dental-mint focus:ring-2 focus:ring-dental-mint/20"
                  >
                    {selectedClinic.categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-dental-heading/60"
                  />
                </div>
              </div>
            </div>
          </div>

          <motion.div
            key={`${selectedClinic.id}-${selectedCategory.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
            className="overflow-hidden rounded-[32px] border border-dental-blue/50 bg-white shadow-sm"
          >
            <div className="border-b border-dental-blue/50 bg-gradient-to-r from-dental-blue/60 to-white px-6 py-6 md:px-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-dental-mint">
                    Listă de prețuri
                  </p>
                  <h3 className="font-rounded text-2xl font-bold text-dental-heading md:text-3xl">
                    {selectedCategory.label}
                  </h3>
                </div>
              </div>
            </div>

            <div className="px-6 py-2 md:px-8 md:py-3">
              {selectedCategory.blocks.map((block) => (
                <div key={`${selectedClinic.id}-${selectedCategory.id}-${block.id}`} className="py-4">
                  {(block.label || block.currencyLabel || block.introLines?.length) && (
                    <div className="mb-5 rounded-2xl bg-dental-cream/70 px-4 py-4">
                      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        {block.label ? (
                          <h4 className="font-rounded text-xl font-bold text-dental-heading">
                            {block.label}
                          </h4>
                        ) : (
                          <div />
                        )}
                        {block.currencyLabel ? (
                          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-dental-text/60">
                            {block.currencyLabel}
                          </span>
                        ) : null}
                      </div>
                      {block.introLines?.length ? (
                        <div className="mt-3 space-y-2">
                          {block.introLines.map((line) => (
                            <p key={line} className="text-sm leading-7 text-dental-text/75 md:text-[15px]">
                              {line}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )}
                  <div>
                    {block.items.map((item, index) => (
                      <div
                        key={`${selectedClinic.id}-${selectedCategory.id}-${block.id}-${item.id}`}
                        className={`grid gap-4 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center ${
                          index !== block.items.length - 1 ? 'border-b border-dental-blue/40' : ''
                        }`}
                      >
                        <div>
                          <p className="font-medium leading-7 text-dental-heading md:text-[17px]">
                            {item.label}
                          </p>
                        </div>
                        <div className="md:justify-self-end">
                          <div className="inline-flex rounded-2xl bg-dental-cream px-4 py-3 text-right shadow-sm ring-1 ring-dental-blue/60">
                            <span className="font-rounded text-lg font-bold text-dental-heading md:text-xl">
                              {formatPrice(item.priceDisplay, item.currency)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {block.notes?.length ? (
                    <div className="mt-5 rounded-2xl border border-dental-blue/40 bg-white px-4 py-4">
                      <ul className="space-y-2 text-sm leading-7 text-dental-text/80 md:text-[15px]">
                        {block.notes.map((note) => (
                          <li key={note} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-dental-mint" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {categoryNotes.length > 0 && (
              <div className="border-t border-dental-blue/50 bg-dental-cream px-6 py-6 md:px-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-dental-mint">
                  Note pentru această categorie
                </p>
                <ul className="space-y-2 text-sm leading-7 text-dental-text/80 md:text-[15px]">
                  {categoryNotes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-dental-mint" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <div className="mt-6 rounded-[28px] border border-dental-blue/60 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-dental-blue text-dental-mint shadow-sm">
                <AlertCircle size={18} />
              </div>

              <div>
                <p className="mt-3 text-sm leading-7 text-dental-text/80 md:text-[15px]">
                  Tarifele afișate au caracter informativ și pot varia în funcție de
                  particularitățile cazului clinic, de planul de tratament recomandat și
                  de materialele utilizate. Pentru procedurile exprimate în euro, plata se
                  efectuează în lei, la cursul BNR din ziua plății. Costul final se stabilește
                  în urma consultației.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[32px] bg-dental-heading px-6 py-10 text-white shadow-2xl md:px-10 md:py-12">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-dental-mint">
                Programare & confirmare costuri
              </p>
              <h2 className="font-rounded text-3xl font-bold leading-tight md:text-4xl">
                Pentru confirmarea tratamentului și a costului final,
                <br />
                programează o consultație.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                Lista de tarife te ajută orientativ, dar recomandarea corectă și costul final
                se stabilesc în funcție de cazul clinic și de planul de tratament propus.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:0731326536"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-dental-mint px-6 py-4 font-rounded text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-dental-mintDark"
              >
                <Phone size={18} />
                Sună pentru programare
              </a>

              <Link
                href="/servicii"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-rounded text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Vezi serviciile
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}