import { tariffData, type CurrencyCode } from '../tarife/tarife.data';

export type ServiceLocationId = (typeof tariffData)[number]['id'];
export type ServiceCategoryId = (typeof tariffData)[number]['categories'][number]['id'];

export type ServiceCategory = {
  id: ServiceCategoryId;
  label: string;
  description: string;
};

export type ServicePrice = {
  locationId: ServiceLocationId;
  priceDisplay: string;
  currency: CurrencyCode;
  sourceLabel: string;
};

export type ServiceArticleSection = {
  title: string;
  content: string[];
};

export type ServiceContentOverride = {
  excerpt?: string;
  articleIntro?: string;
  articleSections?: ServiceArticleSection[];
  seoTitle?: string;
  seoDescription?: string;
};

export type ServiceEntry = {
  id: string;
  slug: string;
  categoryId: ServiceCategoryId;
  categoryLabel: string;
  title: string;
  sourceLabels: string[];
  excerpt?: string;
  locations: ServiceLocationId[];
  prices: ServicePrice[];
  articleIntro?: string;
  articleSections: ServiceArticleSection[];
  seoTitle?: string;
  seoDescription?: string;
};

export const serviceLocations: Record<
  ServiceLocationId,
  { label: string; shortLabel: string }
> = {
  bucuresti: {
    label: 'București',
    shortLabel: 'București',
  },
  belciugatele: {
    label: 'Belciugatele',
    shortLabel: 'Belciugatele',
  },
  'valea-calugareasca': {
    label: 'Valea Călugărească',
    shortLabel: 'Valea Călugărească',
  },
};

const categoryDescriptions: Record<string, string> = {
  consultatii:
    'Servicii de evaluare, diagnostic și orientare a planului de tratament, organizate clar pentru fiecare locație disponibilă.',
  tratamente:
    'Manopere uzuale și tratamente de bază, afișate într-un format ușor de parcurs și de comparat între locații.',
  'chirurgie-oro-maxilo-faciala':
    'Proceduri chirurgicale prezentate clar, cu diferențele de disponibilitate și tarif afișate pe locații.',
  'estetica-dentara':
    'Servicii de estetică dentară prezentate într-o structură simplă, cu acces rapid la informațiile esențiale.',
  protetica:
    'Soluții protetice organizate pe servicii, astfel încât pacientul să poată identifica rapid disponibilitatea și prețul orientativ.',
  implantologie:
    'Servicii de implantologie afișate clar, cu accent pe structură, locații disponibile și orientare rapidă în ofertă.',
  endodontie:
    'Servicii endodontice grupate separat pentru o parcurgere mai clară și o organizare coerentă a informației.',
  pedodontie:
    'Servicii dedicate stomatologiei pentru copii, prezentate distinct pentru a fi ușor de identificat.',
  ortodontie:
    'Servicii ortodontice afișate separat, cu posibilitatea de a extinde ulterior fiecare pagină cu explicații dedicate.',
};

const categoryLabelMap = new Map<ServiceCategoryId, string>();
const categoryOrder: ServiceCategoryId[] = [];

for (const clinic of tariffData) {
  for (const category of clinic.categories) {
    if (!categoryLabelMap.has(category.id)) {
      categoryLabelMap.set(category.id, category.label);
      categoryOrder.push(category.id);
    }
  }
}

export const serviceCategories: ServiceCategory[] = categoryOrder.map((categoryId) => ({
  id: categoryId,
  label: categoryLabelMap.get(categoryId) ?? categoryId,
  description:
    categoryDescriptions[categoryId] ??
    'Servicii organizate clar pe categorie, cu disponibilitate și prețuri orientative afișate în funcție de locație.',
}));

/**
 * Completează aici textele reale pentru carduri și paginile individuale.
 *
 * Cheia recomandată este item.id din tarife.data.ts.
 * Pentru etapa actuală, fișierul generează automat structura și prețurile,
 * iar conținutul editorial poate fi completat ulterior, fără să dublezi datele.
 */
export const serviceContentOverrides: Partial<
  Record<string, ServiceContentOverride>
> = {
  // exemplu:
  // 'consultatie-primara': {
  //   excerpt:
  //     'Scurtă evaluare inițială care ajută la înțelegerea situației clinice și la stabilirea pașilor următori.',
  //   articleIntro:
  //     'Consultația primară este punctul de plecare pentru înțelegerea cazului și pentru stabilirea unui plan de tratament corect.',
  //   articleSections: [
  //     {
  //       title: 'Ce presupune',
  //       content: [
  //         'Text de completat.',
  //       ],
  //     },
  //   ],
  //   seoTitle: 'Consultație primară | Duo Dent',
  //   seoDescription:
  //     'Detalii despre consultația primară în clinicile Duo Dent, cu disponibilitate pe locații și informații utile înainte de programare.',
  // },
};

const serviceMap = new Map<string, ServiceEntry>();

for (const clinic of tariffData) {
  for (const category of clinic.categories) {
    for (const block of category.blocks) {
      for (const item of block.items) {
        const key = `${category.id}:${block.id}:${item.id}`;
        const override = serviceContentOverrides[item.id] ?? {};

        if (!serviceMap.has(key)) {
          serviceMap.set(key, {
            id: item.id,
            slug: item.id,
            categoryId: category.id,
            categoryLabel: category.label,
            title: item.label,
            sourceLabels: [clinic.label],
            excerpt: override.excerpt,
            locations: [clinic.id],
            prices: [
              {
                locationId: clinic.id,
                priceDisplay: item.priceDisplay,
                currency: item.currency,
                sourceLabel: clinic.label,
              },
            ],
            articleIntro: override.articleIntro,
            articleSections: override.articleSections ?? [],
            seoTitle: override.seoTitle,
            seoDescription: override.seoDescription,
          });

          continue;
        }

        const existing = serviceMap.get(key)!;

        if (!existing.locations.includes(clinic.id)) {
          existing.locations.push(clinic.id);
        }

        existing.prices.push({
          locationId: clinic.id,
          priceDisplay: item.priceDisplay,
          currency: item.currency,
          sourceLabel: clinic.label,
        });

        if (!existing.sourceLabels.includes(clinic.label)) {
          existing.sourceLabels.push(clinic.label);
        }
      }
    }
  }
}

export const services: ServiceEntry[] = Array.from(serviceMap.values()).sort(
  (a, b) => {
    const categoryComparison =
      categoryOrder.indexOf(a.categoryId) - categoryOrder.indexOf(b.categoryId);

    if (categoryComparison !== 0) {
      return categoryComparison;
    }

    return a.title.localeCompare(b.title, 'ro');
  }
);

export function formatServicePrice(
  priceDisplay: string,
  currency: CurrencyCode
): string {
  return `${priceDisplay.replace(/\s*-\s*/g, ' – ')} ${currency}`;
}

function getComparablePriceValue(priceDisplay: string): number | null {
  const match = priceDisplay.match(/\d+(?:[.,]\d+)?/);

  if (!match) {
    return null;
  }

  return Number(match[0].replace(',', '.'));
}

export function getServicePriceSummary(service: ServiceEntry): string {
  if (service.prices.length === 0) {
    return 'Preț disponibil la cerere';
  }

  const uniqueFormattedPrices = Array.from(
    new Set(
      service.prices.map((price) =>
        formatServicePrice(price.priceDisplay, price.currency)
      )
    )
  );

  if (uniqueFormattedPrices.length === 1) {
    return uniqueFormattedPrices[0];
  }

  const currencies = Array.from(new Set(service.prices.map((price) => price.currency)));

  if (currencies.length === 1) {
    const numericValues = service.prices
      .map((price) => getComparablePriceValue(price.priceDisplay))
      .filter((value): value is number => value !== null);

    if (numericValues.length > 0) {
      return `de la ${Math.min(...numericValues)} ${currencies[0]}`;
    }
  }

  return 'Preț variabil în funcție de locație';
}

export function getServiceHref(service: Pick<ServiceEntry, 'categoryId' | 'slug'>): string {
  return `/servicii/${service.categoryId}/${service.slug}`;
}

export function getCategoryById(
  categoryId: ServiceCategoryId | string
): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.id === categoryId);
}

export function getServicesByCategory(
  categoryId: ServiceCategoryId | string
): ServiceEntry[] {
  return services.filter((service) => service.categoryId === categoryId);
}

export function getServiceByParams(
  categoryId: string,
  slug: string
): ServiceEntry | undefined {
  return services.find(
    (service) => service.categoryId === categoryId && service.slug === slug
  );
}
