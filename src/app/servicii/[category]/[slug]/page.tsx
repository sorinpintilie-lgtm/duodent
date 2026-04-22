import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight, ClipboardList, MapPin } from 'lucide-react';

import {
  formatServicePrice,
  getCategoryById,
  getServiceByParams,
  getServiceHref,
  getServicePriceSummary,
  getServicesByCategory,
  serviceLocations,
  services,
} from '../../servicii.data';

type ServicePageProps = {
  params: {
    category: string;
    slug: string;
  };
};

export function generateStaticParams() {
  return services.map((service) => ({
    category: service.categoryId,
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceByParams(params.category, params.slug);

  if (!service) {
    return {
      title: 'Serviciu | Duo Dent',
    };
  }

  return {
    title: service.seoTitle ?? `${service.title} | Duo Dent`,
    description:
      service.seoDescription ??
      `${service.title} este disponibil în clinicile Duo Dent selectate, cu afișare clară a locațiilor și a prețurilor orientative.`,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceByParams(params.category, params.slug);

  if (!service) {
    notFound();
  }

  const category = getCategoryById(service.categoryId);
  const relatedServices = getServicesByCategory(service.categoryId)
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <main className="bg-white text-dental-text">
      <section className="border-b border-dental-blueDark/10 bg-[linear-gradient(135deg,rgba(239,248,247,0.55),rgba(245,247,242,0.95))]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-dental-heading/70">
            <Link href="/" className="transition hover:text-dental-mintDark">
              Acasă
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/servicii" className="transition hover:text-dental-mintDark">
              Servicii
            </Link>
            {category && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span>{category.label}</span>
              </>
            )}
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="space-y-6">
              {category && (
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
                  {category.label}
                </p>
              )}

              <div className="space-y-4">
                <h1 className="font-rounded text-4xl font-extrabold tracking-tight text-dental-heading sm:text-5xl">
                  {service.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-dental-text/85">
                  {service.articleIntro ??
                    'Această pagină oferă informații orientative despre serviciu, disponibilitate și prețurile afișate în funcție de locație.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {service.locations.map((locationId) => (
                  <span
                    key={locationId}
                    className="inline-flex items-center gap-2 rounded-full border border-dental-blueDark/10 bg-white px-3 py-2 text-sm font-semibold text-dental-heading shadow-sm"
                  >
                    <MapPin className="h-4 w-4 text-dental-mintDark" />
                    {serviceLocations[locationId].label}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-[28px] border border-dental-blueDark/10 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(17,24,39,0.22)]">
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
                    Rezumat rapid
                  </p>
                  <h2 className="font-rounded text-2xl font-bold text-dental-heading">
                    {getServicePriceSummary(service)}
                  </h2>
                </div>

                <div className="space-y-3 rounded-2xl border border-dental-blueDark/10 bg-dental-cream/70 p-4">
                  <h3 className="font-rounded text-lg font-bold text-dental-heading">
                    Disponibil în
                  </h3>
                  <ul className="space-y-2 text-sm leading-6 text-dental-text/85">
                    {service.locations.map((locationId) => (
                      <li key={locationId}>{serviceLocations[locationId].label}</li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="tel:0731326536"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-dental-mint px-4 py-3 font-rounded text-sm font-bold text-white shadow-lg shadow-dental-mint/20 transition hover:-translate-y-0.5 hover:bg-dental-mintDark"
                >
                  Sună pentru programare
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="space-y-8">
            <article className="rounded-[28px] border border-dental-blueDark/10 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(17,24,39,0.22)] sm:p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
                    Informații despre serviciu
                  </p>
                  <h2 className="font-rounded text-3xl font-bold text-dental-heading">
                    Informații utile despre acest serviciu
                  </h2>
                </div>

                {service.articleSections.length > 0 ? (
                  <div className="space-y-8">
                    {service.articleSections.map((section) => (
                      <section key={section.title} className="space-y-3">
                        <h3 className="font-rounded text-2xl font-bold text-dental-heading">
                          {section.title}
                        </h3>
                        <div className="space-y-3 text-base leading-8 text-dental-text/85">
                          {section.content.map((paragraph, index) => (
                            <p key={`${section.title}-${index}`}>{paragraph}</p>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                <div className="rounded-[24px] border border-dashed border-dental-blueDark/20 bg-dental-cream/60 p-5 text-sm leading-7 text-dental-text/80">
                  Pentru acest serviciu, detaliile complete privind indicația, etapele și recomandările se stabilesc în cadrul consultației, în funcție de particularitățile cazului.
                </div>
                )}
              </div>
            </article>

            {relatedServices.length > 0 && (
              <section className="space-y-5">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
                    Din aceeași categorie
                  </p>
                  <h2 className="font-rounded text-3xl font-bold text-dental-heading">
                    Servicii conexe
                  </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {relatedServices.map((relatedService) => (
                    <article
                      key={relatedService.slug}
                      className="flex h-full flex-col rounded-[24px] border border-dental-blueDark/10 bg-white p-5 shadow-[0_20px_60px_-42px_rgba(17,24,39,0.2)]"
                    >
                      <div className="space-y-3">
                        <h3 className="font-rounded text-xl font-bold text-dental-heading">
                          {relatedService.title}
                        </h3>
                        <p className="text-sm leading-7 text-dental-text/80">
                          {relatedService.excerpt ??
                          'Informații orientative despre serviciu, disponibilitate și recomandarea stabilită în urma consultației.'}
                        </p>
                      </div>

                      <div className="mt-auto pt-5">
                        <Link
                          href={getServiceHref(relatedService)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-dental-blueDark/20 bg-white px-4 py-3 font-rounded text-sm font-bold text-dental-heading transition hover:-translate-y-0.5 hover:border-dental-mint/30 hover:bg-dental-blue/40"
                        >
                          Vezi pagina serviciului
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <section className="rounded-[28px] border border-dental-blueDark/10 bg-dental-cream/70 p-6 shadow-[0_20px_60px_-40px_rgba(17,24,39,0.22)]">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
                    Prețuri orientative
                  </p>
                  <h2 className="font-rounded text-2xl font-bold text-dental-heading">
                    Afișare pe locații
                  </h2>
                </div>

                <div className="space-y-3">
                  {service.prices.map((price) => (
                    <div
                      key={`${price.locationId}-${price.priceDisplay}-${price.sourceLabel}`}
                      className="rounded-[24px] border border-dental-blue/40 bg-white/80 p-5"
                    >
                      <p className="text-xl font-bold text-dental-heading">
                        {serviceLocations[price.locationId].label}
                      </p>

                      <p className="mt-2 text-sm leading-7 text-dental-text/75">
                        {price.sourceLabel}
                      </p>

                      <p className="mt-3 text-base font-bold text-dental-mintDark">
                        {formatServicePrice(price.priceDisplay, price.currency)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-dental-blueDark/10 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(17,24,39,0.22)]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-dental-blue px-4 py-3 text-sm font-semibold text-dental-heading">
                  <ClipboardList className="h-4 w-4 text-dental-mintDark" />
                  Informații importante
                </div>
                <p className="text-sm leading-7 text-dental-text/85">
                  Prețurile afișate au caracter orientativ și pot varia în funcție de
                  particularitățile cazului clinic, de recomandarea medicală și de
                  etapele planului de tratament. Costul final se confirmă în urma
                  consultației.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </section>

      <section className="border-t border-dental-blueDark/10 bg-dental-blue/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="rounded-[32px] border border-dental-blueDark/10 bg-white px-6 py-8 text-center shadow-[0_20px_70px_-45px_rgba(17,24,39,0.28)] sm:px-8 sm:py-10">
            <div className="mx-auto max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
                Pasul următor
              </p>
              <h2 className="font-rounded text-3xl font-bold text-dental-heading sm:text-4xl">
                Pentru recomandarea corectă și confirmarea costului final,
                programează o consultație.
              </h2>
              <p className="text-base leading-7 text-dental-text/85">
                Informațiile din pagină au rol orientativ. Recomandarea medicală și costul final se stabilesc în urma consultației, în funcție de cazul clinic și de planul de tratament propus.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="tel:0731326536"
                className="inline-flex items-center gap-2 rounded-2xl bg-dental-mint px-5 py-3 font-rounded text-sm font-bold text-white shadow-lg shadow-dental-mint/20 transition hover:-translate-y-0.5 hover:bg-dental-mintDark"
              >
                Sună pentru programare
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/servicii"
                className="inline-flex items-center gap-2 rounded-2xl border border-dental-blueDark/20 bg-white px-5 py-3 font-rounded text-sm font-bold text-dental-heading transition hover:-translate-y-0.5 hover:border-dental-mint/30 hover:bg-dental-blue/40"
              >
                Înapoi la servicii
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
