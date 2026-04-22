'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ClipboardList, Stethoscope } from 'lucide-react';

import {
  getServiceHref,
  getServicePriceSummary,
  getServicesByCategory,
  serviceCategories,
  serviceLocations,
} from './servicii.data';

type CategoryId = (typeof serviceCategories)[number]['id'];

const defaultCategoryId: CategoryId = serviceCategories[0]?.id ?? 'consultatii';

export default function ServiciiClientPage() {
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<CategoryId>(defaultCategoryId);

  const selectedCategory =
    serviceCategories.find((category) => category.id === selectedCategoryId) ??
    serviceCategories[0];

  const selectedServices = useMemo(
    () => getServicesByCategory(selectedCategoryId),
    [selectedCategoryId]
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-dental-cream font-body text-dental-text">
      <header className="relative overflow-hidden bg-gradient-to-b from-dental-blue to-dental-cream px-6 pb-16 pt-28 md:pb-20 md:pt-36">
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
              <Stethoscope size={14} className="text-dental-mint" />
              Serviciile noastre
            </div>

            <h1 className="mb-5 font-rounded text-4xl font-bold leading-tight text-dental-heading md:text-6xl md:leading-[1.08]">
              Servicii Duo Dent
            </h1>

            <p className="max-w-2xl text-base leading-7 text-dental-text/80 md:text-lg md:leading-8">
              Explorează serviciile disponibile în clinicile Duo Dent și găsește mai ușor informațiile importante despre fiecare categorie de tratament.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="tel:0731326536"
                className="inline-flex items-center gap-2 rounded-2xl bg-dental-mint px-6 py-3.5 font-rounded text-base font-bold text-white shadow-lg shadow-dental-mint/20 transition hover:-translate-y-0.5 hover:bg-dental-mintDark"
              >
                Sună pentru programare
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/tarife"
                className="inline-flex items-center gap-2 rounded-2xl border border-dental-heading/10 bg-white px-6 py-3.5 font-rounded text-base font-bold text-dental-heading transition hover:bg-dental-blue"
              >
                Vezi tarifele
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      <section id="selector-categorie" className="px-6 py-14 md:py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="rounded-[28px] border border-dental-blue/50 bg-white p-6 shadow-sm md:p-8">
            <div className="space-y-5">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
                  Selectează categoria
                </p>
                <h2 className="font-rounded text-2xl font-bold text-dental-heading">
                  Alege categoria care te interesează
                </h2>
              </div>

              <div className="md:hidden">
                <div className="relative">
                  <select
                    value={selectedCategoryId}
                    onChange={(event) =>
                      setSelectedCategoryId(event.target.value as CategoryId)
                    }
                    className="w-full appearance-none rounded-2xl border border-dental-blueDark/20 bg-dental-cream px-4 py-4 pr-12 font-rounded text-base font-bold text-dental-heading outline-none transition focus:border-dental-mint focus:ring-2 focus:ring-dental-mint/20"
                  >
                    {serviceCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-dental-heading/70" />
                </div>
              </div>

              <div className="hidden flex-wrap gap-3 md:flex">
                {serviceCategories.map((category) => {
                  const isActive = category.id === selectedCategoryId;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategoryId(category.id)}
                      className={`inline-flex items-center rounded-2xl px-5 py-4 font-rounded text-base font-bold transition ${
                        isActive
                          ? 'bg-dental-mint text-white shadow-lg shadow-dental-mint/20'
                          : 'border border-dental-blueDark/20 bg-white text-dental-heading hover:-translate-y-0.5 hover:border-dental-mint/40 hover:bg-dental-blue/40'
                      }`}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {selectedCategory && (
            <motion.section
              key={selectedCategory.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="rounded-[28px] border border-dental-blue/50 bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
                      Categoria activă
                    </p>
                    <h2 className="font-rounded text-3xl font-bold text-dental-heading">
                      {selectedCategory.label}
                    </h2>
                    <p className="max-w-3xl text-base leading-7 text-dental-text/85">
                      {selectedCategory.description}
                    </p>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-2xl bg-dental-cream px-4 py-3 text-sm font-semibold text-dental-heading">
                    <ClipboardList className="h-4 w-4 text-dental-mintDark" />
                    {selectedServices.length} servicii în această categorie
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {selectedServices.map((service) => (
                  <article
                    key={`${service.categoryId}-${service.slug}`}
                    className="group flex h-full flex-col rounded-[28px] border border-dental-blue/50 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-dental-mint/30 hover:shadow-[0_28px_70px_-40px_rgba(17,24,39,0.28)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-dental-blue text-dental-mintDark">
                        <Stethoscope className="h-5 w-5" />
                      </div>
                      <div className="rounded-2xl bg-dental-cream px-3 py-2 text-sm font-bold text-dental-heading">
                        {getServicePriceSummary(service)}
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <h3 className="font-rounded text-2xl font-bold leading-tight text-dental-heading">
                        {service.title}
                      </h3>

                      {service.excerpt ? (
                        <p className="text-sm leading-7 text-dental-text/85">
                          {service.excerpt}
                        </p>
                       ) : (
                         <p className="text-sm leading-7 text-dental-text/70">
                           Informațiile exacte despre indicație, etape și recomandare se stabilesc în urma consultației.
                         </p>
                       )}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.locations.map((locationId) => (
                        <span
                          key={locationId}
                          className="inline-flex items-center rounded-full border border-dental-blueDark/10 bg-dental-blue px-3 py-1.5 text-xs font-semibold text-dental-heading"
                        >
                          {serviceLocations[locationId].shortLabel}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-6">
                      <Link
                        href={getServiceHref(service)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-dental-mint px-4 py-3 font-rounded text-sm font-bold text-white shadow-lg shadow-dental-mint/20 transition hover:-translate-y-0.5 hover:bg-dental-mintDark"
                      >
                        Vezi detalii
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </section>

      <section className="border-t border-dental-blueDark/10 bg-dental-blue/40 px-6 py-14 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[32px] border border-dental-blueDark/10 bg-white px-6 py-8 text-center shadow-[0_20px_70px_-45px_rgba(17,24,39,0.28)] sm:px-8 sm:py-10">
            <div className="mx-auto max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
                Programare & orientare
              </p>
              <h2 className="font-rounded text-3xl font-bold text-dental-heading sm:text-4xl">
                Pentru recomandarea corectă și confirmarea costului final, programează o consultație.
              </h2>
               <p className="text-base leading-7 text-dental-text/85">
                 Informațiile din această pagină au rol orientativ. Recomandarea medicală și costul final se stabilesc în funcție de evaluarea clinică și de planul de tratament propus.
               </p>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="tel:0731326536"
                className="inline-flex items-center gap-2 rounded-2xl bg-dental-mint px-5 py-3 font-rounded text-sm font-bold text-white shadow-lg shadow-dental-mint/20 transition hover:-translate-y-0.5 hover:bg-dental-mintDark"
              >
                Sună pentru programare
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tarife"
                className="inline-flex items-center gap-2 rounded-2xl border border-dental-blueDark/20 bg-white px-5 py-3 font-rounded text-sm font-bold text-dental-heading transition hover:-translate-y-0.5 hover:border-dental-mint/30 hover:bg-dental-blue/40"
              >
                Vezi tarifele
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
