import {
  tariffData,
  type CurrencyCode,
  type TariffItem,
} from '../tarife/tarife.data';

export type ServiceLocationId = (typeof tariffData)[number]['id'];
export type ServiceCategoryId = string;

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
    'Consultații și investigații pentru evaluarea corectă a cazului și stabilirea unui plan de tratament clar.',
  tratamente:
    'Tratamente dentare uzuale, organizate clar pentru o orientare rapidă asupra opțiunilor disponibile.',
  'chirurgie-oro-maxilo-faciala':
    'Proceduri chirurgicale prezentate clar, cu informații orientative despre disponibilitate și costuri.',
  'estetica-dentara':
    'Servicii dedicate îmbunătățirii aspectului zâmbetului și menținerii unui rezultat armonios.',
  protetica:
    'Soluții protetice pentru refacerea funcției și esteticii dentare, afișate clar pe tipuri de servicii.',
  implantologie:
    'Servicii de implantologie și etape asociate, prezentate clar pentru o înțelegere mai ușoară a opțiunilor.',
  endodontie:
    'Tratamente endodontice organizate separat pentru o orientare mai clară asupra serviciilor disponibile.',
  pedodontie:
    'Servicii stomatologice dedicate copiilor, adaptate nevoilor specifice fiecărei etape de dezvoltare.',
  ortodontie:
    'Servicii ortodontice pentru evaluare, planificare și monitorizarea tratamentelor de aliniere dentară.',
};

const blockLabelOverrides: Record<string, string> = {
  consultatii: 'Consultații',
  tratamente: 'Tratamente',
  'manopere-generale': 'Manopere generale',
};

function formatCategoryLabel(id: string): string {
  return id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

type NormalizedServiceGroup = {
  categoryId: string;
  categoryLabel: string;
  items: TariffItem[];
};

function getNormalizedGroups(
  clinic: (typeof tariffData)[number]
): NormalizedServiceGroup[] {
  return clinic.categories.flatMap((category) => {
    if (category.id === 'tarife') {
      return category.blocks.map((block) => {
        const normalizedId =
          block.id === 'lista-principala' ? 'tratamente' : block.id;

        const normalizedLabel =
          block.label ??
          blockLabelOverrides[normalizedId] ??
          formatCategoryLabel(normalizedId);

        return {
          categoryId: normalizedId,
          categoryLabel: normalizedLabel,
          items: block.items,
        };
      });
    }

    return [
      {
        categoryId: category.id,
        categoryLabel: category.label,
        items: category.blocks.flatMap((block) => block.items),
      },
    ];
  });
}

const categoryLabelMap = new Map<string, string>();
const categoryOrder: string[] = [];

for (const clinic of tariffData) {
  for (const group of getNormalizedGroups(clinic)) {
    if (!categoryLabelMap.has(group.categoryId)) {
      categoryLabelMap.set(group.categoryId, group.categoryLabel);
      categoryOrder.push(group.categoryId);
    }
  }
}

export const serviceCategories: ServiceCategory[] = categoryOrder.map((categoryId) => ({
  id: categoryId,
  label: categoryLabelMap.get(categoryId) ?? categoryId,
  description:
    categoryDescriptions[categoryId] ??
    'Servicii organizate clar pe categorie, cu informații orientative despre disponibilitate și prețuri în funcție de locație.',
}));

/**
 * Completează aici textele reale pentru carduri și paginile individuale.
 *
 * Cheia recomandată este item.id din tarife.data.ts.
 * Pentru etapa actuală, fișierul generează automat structura și prețurile,
 * iar conținutul editorial poate fi completat ulterior, fără să dublezi datele.
 */
export const serviceContentOverrides: Partial<Record<string, ServiceContentOverride>> = {
  'consultatii:consultatie-primara': {
    excerpt:
      'Consultație inițială pentru evaluarea situației dentare și stabilirea pașilor de tratament potriviți.',
    articleIntro:
      'Consultația primară este primul pas atunci când vrei să înțelegi mai clar starea danturii și opțiunile de tratament disponibile. În cadrul acestei etape, medicul evaluează cazul clinic, discută simptomele și istoricul relevant și te orientează către următorii pași.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Consultația primară are rolul de a oferi o imagine clară asupra situației dentare actuale și de a stabili direcția corectă de tratament.',
          'În funcție de caz, această etapă poate include discuția cu medicul, evaluarea clinică și recomandarea unor investigații suplimentare sau a unor tratamente specifice.',
        ],
      },
      {
        title: 'Când este utilă',
        content: [
          'Este utilă atunci când apar dureri, sensibilitate, disconfort, probleme estetice sau atunci când vrei un control general și o evaluare profesionistă.',
          'De asemenea, este recomandată atunci când dorești să începi un tratament și ai nevoie de o imagine clară asupra etapelor și costurilor orientative.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat în pagină este orientativ, iar recomandarea finală se stabilește în urma evaluării clinice.',
        ],
      },
    ],
    seoTitle: 'Consultație primară | Duo Dent',
    seoDescription:
      'Află detalii despre consultația primară la Duo Dent: evaluare inițială, orientare în tratament și informații utile înainte de programare.',
  },

  'consultatii:consultatie-cu-model-de-studiu': {
    excerpt:
      'Consultație de specialitate care include model de studiu pentru o analiză mai detaliată a cazului.',
    articleIntro:
      'Consultația cu model de studiu este utilă în cazurile care necesită o analiză mai atentă a poziției dentare, a rapoartelor dintre arcade sau a etapelor viitoare de tratament. Această etapă ajută la planificarea mai clară a cazului și la o înțelegere mai bună a opțiunilor disponibile.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Pe lângă evaluarea clinică, acest tip de consultație include realizarea sau utilizarea unui model de studiu pentru analiza detaliată a situației dentare.',
          'Modelul de studiu poate ajuta la o planificare mai precisă, mai ales în cazurile în care este importantă evaluarea spațiului, a alinierii sau a relației dintre arcade.',
        ],
      },
      {
        title: 'Când este recomandată',
        content: [
          'Poate fi recomandată atunci când tratamentul necesită o analiză suplimentară înainte de stabilirea unui plan clar.',
          'Este frecvent utilă în cazurile protetice, ortodontice sau în alte situații în care medicul are nevoie de o documentare mai detaliată.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat are caracter orientativ și trebuie corelat cu recomandarea medicală și particularitățile fiecărui caz.',
        ],
      },
    ],
    seoTitle: 'Consultație cu model de studiu | Duo Dent',
    seoDescription:
      'Detalii despre consultația cu model de studiu la Duo Dent. Analiză mai detaliată a cazului și orientare corectă înainte de tratament.',
  },

  'consultatii:radiografie-digitala-panoramica': {
    excerpt:
      'Radiografie panoramică digitală pentru o imagine de ansamblu asupra danturii și structurilor dento-maxilare.',
    articleIntro:
      'Radiografia digitală panoramică oferă o imagine generală a danturii și a structurilor asociate, fiind utilă în evaluarea și planificarea multor tratamente stomatologice. Ea ajută medicul să înțeleagă mai bine contextul clinic și să stabilească indicațiile potrivite.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Radiografia panoramică este o investigație imagistică realizată pentru a obține o vedere de ansamblu asupra dinților, rădăcinilor, oaselor maxilare și altor structuri relevante.',
          'Aceasta nu înlocuiește consultația, ci completează evaluarea clinică atunci când medicul consideră necesar.',
        ],
      },
      {
        title: 'Când poate fi utilă',
        content: [
          'Poate fi utilă înaintea unui tratament complex, în cazul durerilor neclare, al suspiciunilor legate de infecții, extracții, implanturi sau alte situații care necesită o imagine generală.',
          'Necesitatea ei este stabilită de medic, în funcție de simptomatologie și de obiectivele tratamentului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Prețul afișat este orientativ și poate fi consultat împreună cu celelalte informații din pagina de servicii și tarife.',
        ],
      },
    ],
    seoTitle: 'Radiografie digitală panoramică | Duo Dent',
    seoDescription:
      'Radiografie digitală panoramică la Duo Dent. Investigație utilă pentru evaluarea generală a danturii și planificarea tratamentului.',
  },

  'tratamente:anestezie': {
    excerpt:
      'Anestezie utilizată pentru confortul pacientului în timpul tratamentelor stomatologice.',
    articleIntro:
      'Anestezia este una dintre etapele frecvent întâlnite în stomatologie și are rolul de a crește confortul pacientului în timpul tratamentului. Tipul de anestezie și necesitatea ei sunt stabilite de medic în funcție de procedură și de particularitățile cazului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Anestezia este folosită pentru a reduce sau elimina disconfortul în timpul anumitor manopere stomatologice.',
          'Medicul stabilește dacă este necesară și ce tip de anestezie este potrivit, în funcție de tratamentul efectuat și de starea clinică.',
        ],
      },
      {
        title: 'Când este utilizată',
        content: [
          'Poate fi utilizată în cadrul unor tratamente restaurative, endodontice, chirurgicale sau al altor proceduri care necesită controlul durerii.',
          'Indicația exactă nu depinde doar de denumirea manoperei, ci de evaluarea medicală și de planul de tratament.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și poate varia în funcție de tipul tratamentului în care este integrată anestezia.',
        ],
      },
    ],
    seoTitle: 'Anestezie | Duo Dent',
    seoDescription:
      'Detalii despre anestezia utilizată în cadrul tratamentelor stomatologice la Duo Dent și rolul ei în confortul pacientului.',
  },

  'tratamente:indepartare-obturatie-coroana': {
    excerpt:
      'Îndepărtarea unei obturații sau a unei coroane ca etapă pregătitoare pentru tratamentul ulterior.',
    articleIntro:
      'Îndepărtarea unei obturații sau a unei coroane poate fi necesară atunci când dintele trebuie reevaluat, retratat sau pregătit pentru o etapă nouă de tratament. Această manoperă se face în funcție de starea clinică și de obiectivul urmărit de medic.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în îndepărtarea unei lucrări existente, astfel încât medicul să poată evalua corect dintele și să continue tratamentul într-un mod potrivit.',
          'Aceasta poate fi o etapă intermediară în cadrul unui plan mai amplu, nu neapărat o manoperă de sine stătătoare.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară atunci când există infiltrații, deteriorări, durere, suspiciunea unei probleme sub o lucrare existentă sau necesitatea refacerii acesteia.',
          'Decizia se ia întotdeauna după evaluarea clinică și în funcție de starea reală a dintelui.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ, iar costul final poate depinde de complexitatea cazului și de etapele care urmează.',
        ],
      },
    ],
    seoTitle: 'Îndepărtare obturație / coroană | Duo Dent',
    seoDescription:
      'Află când este necesară îndepărtarea unei obturații sau a unei coroane și cum se integrează această etapă în tratamentul dentar.',
  },

  'tratamente:pansament-stimulativ': {
    excerpt:
      'Pansament dentar utilizat ca etapă intermediară în anumite situații clinice.',
    articleIntro:
      'Pansamentul stimulativ poate face parte din tratamentul unui dinte care necesită o etapă de protecție, calmare sau monitorizare înainte de continuarea intervenției. Rolul exact al acestei manopere este stabilit de medic, în funcție de situația clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Este o etapă terapeutică utilizată în anumite situații pentru protecția și susținerea dintelui înainte de tratamentul definitiv.',
          'Poate avea rol temporar și se integrează într-un plan de tratament stabilit individual.',
        ],
      },
      {
        title: 'Când poate fi recomandat',
        content: [
          'Poate fi recomandat atunci când medicul consideră că dintele are nevoie de o etapă intermediară înainte de obturația finală sau de un alt tratament.',
          'Necesitatea lui depinde de starea dintelui, simptomatologie și răspunsul clinic observat.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat în contextul tratamentului complet.',
        ],
      },
    ],
    seoTitle: 'Pansament stimulativ | Duo Dent',
    seoDescription:
      'Detalii despre pansamentul stimulativ utilizat în anumite tratamente dentare la Duo Dent.',
  },

  'tratamente:coafaj-direct-indirect': {
    excerpt:
      'Manoperă dentară utilizată în anumite situații pentru protecția și susținerea vitalității dintelui.',
    articleIntro:
      'Coafajul direct sau indirect este o manoperă utilizată în anumite situații pentru protejarea structurilor dentare și pentru susținerea evoluției favorabile a dintelui. Indicația se stabilește strict în funcție de evaluarea clinică și de profunzimea afectării.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această manoperă are rolul de a proteja structurile dentare atunci când medicul consideră că este importantă conservarea dintelui și gestionarea atentă a situației clinice.',
          'Alegerea între varianta directă și cea indirectă depinde de modul în care se prezintă cazul și de tratamentul necesar.',
        ],
      },
      {
        title: 'Când poate fi indicat',
        content: [
          'Poate fi indicat în anumite situații în care este necesară o etapă de protecție înainte de continuarea sau finalizarea tratamentului.',
          'Recomandarea se face exclusiv în urma consultației și nu poate fi stabilită doar pe baza denumirii manoperei.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București și Belciugatele.',
          'Tariful afișat are caracter orientativ și trebuie corelat cu planul de tratament stabilit în cabinet.',
        ],
      },
    ],
    seoTitle: 'Coafaj direct / indirect | Duo Dent',
    seoDescription:
      'Află când poate fi recomandat coafajul direct sau indirect și ce rol are în protecția dintelui.',
  },

  'tratamente:obturatie-provizorie': {
    excerpt:
      'Obturație temporară folosită ca etapă intermediară în anumite tratamente dentare.',
    articleIntro:
      'Obturația provizorie este utilizată atunci când tratamentul nu se finalizează într-o singură etapă și este nevoie de protecția temporară a dintelui până la următoarea intervenție. Ea are rol intermediar și este integrată într-un plan de tratament stabilit de medic.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această manoperă constă în sigilarea temporară a dintelui între două etape de tratament sau până la continuarea intervenției definitive.',
          'Rolul ei este de a proteja zona tratată și de a menține condițiile necesare pentru etapa următoare.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară în tratamente endodontice, restaurative sau în alte situații în care tratamentul se desfășoară etapizat.',
          'Indicația exactă depinde de starea dintelui și de strategia terapeutică stabilită de medic.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ, iar costul final poate varia în funcție de tratamentul din care face parte această etapă.',
        ],
      },
    ],
    seoTitle: 'Obturație provizorie | Duo Dent',
    seoDescription:
      'Detalii despre obturația provizorie și rolul ei în tratamentele dentare efectuate la Duo Dent.',
  },

  'tratamente:pansament-calmant': {
    excerpt:
      'Pansament dentar utilizat pentru calmarea și protejarea dintelui în anumite situații clinice.',
    articleIntro:
      'Pansamentul calmant poate fi recomandat atunci când medicul urmărește reducerea disconfortului și protejarea dintelui înainte de tratamentul definitiv. Este o etapă temporară, folosită în funcție de simptomatologie și de evaluarea clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Manopera constă în aplicarea unui material cu rol temporar, menit să protejeze și să liniștească zona afectată până la etapa următoare de tratament.',
          'Aceasta nu înlocuiește tratamentul definitiv, ci face parte din gestionarea corectă a cazului.',
        ],
      },
      {
        title: 'Când poate fi recomandat',
        content: [
          'Poate fi recomandat în situațiile în care există sensibilitate, durere sau necesitatea unei etape intermediare înainte de tratamentul final.',
          'Decizia se ia în funcție de examenul clinic și de evoluția cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București și Belciugatele.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul tratamentului complet recomandat.',
        ],
      },
    ],
    seoTitle: 'Pansament calmant | Duo Dent',
    seoDescription:
      'Află în ce situații poate fi recomandat pansamentul calmant și ce rol are în tratamentul dentar.',
  },

  'tratamente:extirpare-devitala-fara-arsenic': {
    excerpt:
      'Etapă de tratament endodontic realizată în funcție de evaluarea clinică și de indicația medicului.',
    articleIntro:
      'Extirparea devitală fără arsenic este o etapă terapeutică utilizată în anumite tratamente de canal. Necesitatea și modul în care aceasta se integrează în planul de tratament depind de starea dintelui și de evaluarea realizată în cabinet.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă face parte din tratamentul endodontic și urmărește abordarea corectă a structurilor interne ale dintelui, în funcție de situația clinică.',
          'Procedura este realizată conform indicației medicale și poate face parte dintr-un tratament desfășurat în una sau mai multe ședințe.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară atunci când medicul stabilește că dintele are nevoie de tratament endodontic și că această etapă este potrivită pentru cazul respectiv.',
          'Recomandarea se face exclusiv după examinare și nu poate fi stabilită fără evaluare clinică.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și poate varia în funcție de complexitatea cazului și de numărul etapelor implicate.',
        ],
      },
    ],
    seoTitle: 'Extirpare devitală fără arsenic | Duo Dent',
    seoDescription:
      'Detalii despre extirparea devitală fără arsenic și rolul ei în tratamentele endodontice la Duo Dent.',
  },

  'tratamente:extirpare-vitala-monoradiculara': {
    excerpt:
      'Etapă de tratament endodontic pentru dinți monoradiculari, stabilită în funcție de evaluarea clinică.',
    articleIntro:
      'Extirparea vitală monoradiculară este o etapă care poate apărea în tratamentul endodontic al unui dinte cu o singură rădăcină. Indicația ei depinde de diagnosticul stabilit în cabinet și de planul terapeutic potrivit cazului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă este integrată în tratamentul de canal și este adaptată particularităților anatomice și clinice ale dintelui tratat.',
          'Procedura nu este analizată izolat, ci în contextul tratamentului complet recomandat de medic.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când evaluarea clinică arată că dintele necesită tratament endodontic și această etapă este indicată.',
          'Medicul stabilește planul în funcție de simptome, examen clinic și evoluția cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat împreună cu celelalte etape ale tratamentului de canal.',
        ],
      },
    ],
    seoTitle: 'Extirpare vitală monoradiculară | Duo Dent',
    seoDescription:
      'Află mai multe despre extirparea vitală monoradiculară și rolul ei în tratamentul endodontic.',
  },

  'tratamente:extirpare-vitala-pluriradiculara': {
    excerpt:
      'Etapă de tratament endodontic pentru dinți pluriradiculari, realizată în funcție de caz.',
    articleIntro:
      'Extirparea vitală pluriradiculară face parte din tratamentele endodontice adresate dinților cu mai multe rădăcini. Complexitatea acestei etape depinde de anatomia dintelui, de starea clinică și de strategia de tratament stabilită de medic.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă aparține tratamentului de canal și este adaptată particularităților unui dinte pluriradicular.',
          'Modul de lucru și etapele asociate sunt stabilite individual, în funcție de dificultatea cazului.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată în cadrul unui tratament endodontic atunci când medicul stabilește că aceasta este etapa necesară pentru gestionarea corectă a cazului.',
          'Decizia se ia numai după evaluare clinică și, dacă este cazul, imagistică.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și poate varia în funcție de complexitatea tratamentului și de numărul ședințelor necesare.',
        ],
      },
    ],
    seoTitle: 'Extirpare vitală pluriradiculară | Duo Dent',
    seoDescription:
      'Detalii despre extirparea vitală pluriradiculară și integrarea ei în tratamentele endodontice la Duo Dent.',
  },

  'tratamente:obturatie-canal-monoradiculara': {
    excerpt:
      'Etapă a tratamentului endodontic pentru sigilarea canalului unui dinte monoradicular.',
    articleIntro:
      'Obturația de canal monoradiculară face parte din tratamentul endodontic și reprezintă una dintre etapele importante pentru finalizarea corectă a terapiei de canal. Indicația și modul în care aceasta este realizată depind de situația clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă vizează sigilarea canalului radicular după ce medicul a parcurs pașii necesari ai tratamentului endodontic.',
          'Ea se face în cadrul unui plan terapeutic complet și nu se interpretează separat de celelalte etape ale tratamentului de canal.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară atunci când medicul urmărește finalizarea tratamentului endodontic al unui dinte monoradicular.',
          'Necesitatea și momentul acestei etape se stabilesc în funcție de evoluția clinică și de starea dintelui.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie corelat cu complexitatea generală a tratamentului.',
        ],
      },
    ],
    seoTitle: 'Obturație canal monoradiculară | Duo Dent',
    seoDescription:
      'Află mai multe despre obturația de canal monoradiculară și rolul ei în tratamentele endodontice.',
  },

  'tratamente:obturatie-canal-pluriradiculara': {
    excerpt:
      'Etapă a tratamentului endodontic pentru sigilarea canalelor unui dinte pluriradicular.',
    articleIntro:
      'Obturația de canal pluriradiculară este o etapă a tratamentului endodontic și se referă la sigilarea canalelor unui dinte cu mai multe rădăcini. Complexitatea cazului influențează modul de lucru și numărul etapelor necesare.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă se realizează după pregătirea și evaluarea canalelor radiculare, ca parte a tratamentului de canal.',
          'În cazul dinților pluriradiculari, tratamentul poate fi mai complex, iar planul exact este stabilit individual.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară atunci când medicul urmărește finalizarea tratamentului endodontic pentru un dinte cu mai multe rădăcini.',
          'Momentul și indicația exactă depind de starea dintelui și de răspunsul clinic observat pe parcurs.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și poate diferi în funcție de complexitatea cazului.',
        ],
      },
    ],
    seoTitle: 'Obturație canal pluriradiculară | Duo Dent',
    seoDescription:
      'Detalii despre obturația de canal pluriradiculară și integrarea ei în tratamentul endodontic la Duo Dent.',
  },

  'tratamente:dezobturare-canal-per-canal': {
    excerpt:
      'Etapă endodontică utilizată în anumite cazuri pentru reluarea sau corectarea tratamentului de canal.',
    articleIntro:
      'Dezobturarea de canal per canal poate fi necesară în anumite situații în care tratamentul endodontic trebuie reevaluat sau reluat. Această manoperă este indicată doar în urma unei evaluări clinice și imagistice corespunzătoare.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în îndepărtarea materialului existent din canal, atunci când medicul consideră că este necesară reluarea sau completarea tratamentului.',
          'Este o etapă care poate apărea în cazurile mai complexe și se integrează într-un plan terapeutic personalizat.',
        ],
      },
      {
        title: 'Când poate fi indicată',
        content: [
          'Poate fi indicată în situațiile în care există semne că tratamentul anterior trebuie reevaluat sau refăcut.',
          'Decizia aparține medicului și se bazează pe investigații, simptomatologie și examen clinic.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și se raportează la fiecare canal tratat, în funcție de complexitatea intervenției.',
        ],
      },
    ],
    seoTitle: 'Dezobturare canal per canal | Duo Dent',
    seoDescription:
      'Află când poate fi necesară dezobturarea de canal și ce rol are în retratamentul endodontic.',
  },

  'tratamente:obturatie-daycal-tratament-gangrena': {
    excerpt:
      'Etapă de tratament utilizată în anumite cazuri endodontice, în funcție de diagnosticul stabilit.',
    articleIntro:
      'Obturația Daycal în tratamentul gangrenei poate face parte din gestionarea anumitor situații endodontice, în funcție de diagnosticul și strategia terapeutică stabilite de medic. Rolul ei este analizat în contextul întregului tratament.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Este o etapă terapeutică utilizată în anumite cazuri pentru susținerea tratamentului endodontic și gestionarea corectă a evoluției clinice.',
          'Nu reprezintă un tratament complet în sine, ci o componentă integrată într-un plan stabilit individual.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când medicul consideră că această etapă este potrivită pentru controlul și tratarea corectă a cazului.',
          'Indicația se stabilește exclusiv în cabinet, în urma evaluării clinice și imagistice.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București și Belciugatele.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul tratamentului complet recomandat.',
        ],
      },
    ],
    seoTitle: 'Obturație Daycal tratament gangrenă | Duo Dent',
    seoDescription:
      'Detalii despre obturația Daycal utilizată în anumite tratamente endodontice la Duo Dent.',
  },

  'tratamente:sigilare': {
    excerpt:
      'Sigilare dentară cu rol preventiv, recomandată în funcție de evaluarea clinică.',
    articleIntro:
      'Sigilarea este o procedură preventivă recomandată în anumite situații pentru protejarea suprafețelor dentare predispuse la apariția cariilor. Indicația se stabilește în funcție de vârstă, anatomia dintelui și riscul carios.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în aplicarea unui material protector pe suprafețele dentare care pot reține mai ușor placa bacteriană și resturile alimentare.',
          'Scopul este de a reduce riscul apariției cariilor în zonele greu de igienizat.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atât copiilor, cât și adulților, în funcție de situația clinică și de recomandarea medicului.',
          'Este indicată mai ales atunci când există risc crescut de carie sau relief dentar favorabil retenției.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și recomandarea finală se face după consultație.',
        ],
      },
    ],
    seoTitle: 'Sigilare dentară | Duo Dent',
    seoDescription:
      'Află când poate fi recomandată sigilarea dentară și ce rol are în prevenția problemelor dentare.',
  },

  'tratamente:obturatie-dinti-temporari': {
    excerpt:
      'Tratament restaurativ pentru dinții temporari, realizat în funcție de starea clinică a copilului.',
    articleIntro:
      'Obturația pentru dinți temporari este utilizată atunci când un dinte de lapte are nevoie de refacere pentru a-și menține funcția și pentru a susține evoluția corectă a dentiției. Tratamentul este adaptat vârstei și situației clinice.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește refacerea dintelui afectat, astfel încât acesta să își poată păstra rolul până la momentul schimbului dentar natural.',
          'Materialul și abordarea sunt alese în funcție de cooperarea copilului, de dimensiunea leziunii și de recomandarea medicului.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară atunci când un dinte temporar prezintă carie sau altă problemă care necesită restaurare.',
          'Medicul stabilește tratamentul potrivit în funcție de vârstă, starea dintelui și contextul clinic.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ, iar tratamentul se stabilește individual pentru fiecare copil.',
        ],
      },
    ],
    seoTitle: 'Obturație dinți temporari | Duo Dent',
    seoDescription:
      'Detalii despre obturația pentru dinți temporari și rolul ei în menținerea sănătății dentare la copii.',
  },

  'tratamente:obturatie-compozit-include-baza': {
    excerpt:
      'Obturație cu compozit, cu bază inclusă, pentru refacerea dintelui afectat.',
    articleIntro:
      'Obturația cu compozit, cu bază inclusă, este o soluție restaurativă folosită pentru refacerea dintelui afectat și pentru readucerea funcției și a aspectului acestuia. Alegerea acestei manopere depinde de evaluarea clinică și de amploarea leziunii.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Tratamentul urmărește refacerea dintelui prin utilizarea unui material compozit, iar în anumite situații include și o bază de protecție, în funcție de indicația medicului.',
          'Scopul este de a reda funcționalitatea și de a proteja cât mai bine structura dentară rămasă.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când dintele are nevoie de restaurare și medicul consideră că această variantă este potrivită clinic.',
          'Decizia finală depinde de profunzimea leziunii, de localizarea ei și de starea generală a dintelui.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și poate varia în funcție de complexitatea cazului și de suprafața restaurată.',
        ],
      },
    ],
    seoTitle: 'Obturație compozit (include baza) | Duo Dent',
    seoDescription:
      'Află mai multe despre obturația cu compozit, cu bază inclusă, și rolul ei în refacerea dintelui.',
  },

  'tratamente:drenaj-endo': {
    excerpt:
      'Etapă de tratament endodontic realizată în anumite situații pentru gestionarea corectă a cazului.',
    articleIntro:
      'Drenajul endodontic poate fi necesar în anumite situații clinice pentru controlul local al procesului inflamator sau infecțios și pentru continuarea corectă a tratamentului. Este o manoperă care se indică numai după evaluarea realizată de medic.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă face parte din abordarea unor cazuri endodontice și este utilizată atunci când medicul consideră că este necesară pentru gestionarea corectă a situației clinice.',
          'Ea nu reprezintă tratamentul complet, ci o etapă integrată într-un plan terapeutic mai amplu.',
        ],
      },
      {
        title: 'Când poate fi necesar',
        content: [
          'Poate fi necesar în anumite situații acute sau în cazurile în care este nevoie de o etapă intermediară înaintea tratamentului definitiv.',
          'Indicația se stabilește exclusiv în cabinet, după consult și evaluare.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat în contextul tratamentului complet recomandat.',
        ],
      },
    ],
    seoTitle: 'Drenaj endodontic | Duo Dent',
    seoDescription:
      'Detalii despre drenajul endodontic și rolul lui în gestionarea anumitor situații clinice la Duo Dent.',
  },

  'tratamente:obturatie-cu-calciu-tratament-gangrena': {
    excerpt:
      'Etapă de tratament endodontic utilizată în anumite cazuri, în funcție de diagnosticul stabilit.',
    articleIntro:
      'Obturația cu calciu în tratamentul gangrenei este o etapă care poate fi recomandată în anumite situații endodontice, în funcție de evoluția cazului și de indicația medicului. Rolul ei este de a susține tratamentul corect al dintelui.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această manoperă este parte din tratamentul endodontic și poate fi utilizată în anumite etape terapeutice, conform recomandării medicale.',
          'Nu se analizează separat de restul tratamentului, ci ca parte a unei strategii de gestionare a cazului.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când medicul consideră că situația clinică necesită această etapă înainte de finalizarea tratamentului.',
          'Decizia depinde de examenul clinic, simptomatologie și investigațiile relevante.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul tratamentului complet.',
        ],
      },
    ],
    seoTitle: 'Obturație cu calciu tratament gangrenă | Duo Dent',
    seoDescription:
      'Află mai multe despre obturația cu calciu utilizată în anumite tratamente endodontice la Duo Dent.',
  },

  'tratamente:imobilizare-dentara-cu-banda-fibra-de-sticla': {
    excerpt:
      'Imobilizare dentară cu bandă din fibră de sticlă, realizată în funcție de indicația clinică.',
    articleIntro:
      'Imobilizarea dentară cu bandă din fibră de sticlă poate fi recomandată în anumite situații pentru stabilizarea unor dinți afectați și pentru susținerea tratamentului. Necesitatea acestei manopere este stabilită doar în urma evaluării clinice.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește stabilizarea unor dinți prin utilizarea unei benzi din fibră de sticlă, atunci când medicul consideră că această soluție este potrivită.',
          'Rolul ei este de a susține funcțional zona tratată și de a integra cazul într-un plan terapeutic coerent.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată în situații în care este nevoie de stabilizare dentară, în funcție de starea clinică și de obiectivele tratamentului.',
          'Recomandarea se face individual, după consult și evaluare detaliată.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Prețul afișat este orientativ și poate varia în funcție de complexitatea cazului.',
        ],
      },
    ],
    seoTitle: 'Imobilizare dentară cu bandă fibră de sticlă | Duo Dent',
    seoDescription:
      'Detalii despre imobilizarea dentară cu bandă din fibră de sticlă și situațiile în care poate fi recomandată.',
  },

  'chirurgie-oro-maxilo-faciala:extractie-dinti-temporari-parodontotici': {
    excerpt:
      'Extracție dentară realizată în funcție de indicația clinică și de evaluarea făcută de medic.',
    articleIntro:
      'Extracția dinților temporari sau parodontotici poate fi necesară atunci când menținerea lor nu mai este recomandată din punct de vedere clinic. Decizia se ia după evaluarea stării dintelui și a contextului general al tratamentului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această procedură constă în îndepărtarea dintelui atunci când medicul stabilește că aceasta este soluția corectă pentru evoluția favorabilă a cazului.',
          'Intervenția este planificată în funcție de particularitățile clinice și poate necesita recomandări specifice înainte și după tratament.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară atunci când dintele nu mai poate fi păstrat sau atunci când menținerea lui afectează tratamentul ulterior.',
          'Indicația se stabilește după consultație și, dacă este nevoie, după investigațiile recomandate de medic.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ, iar complexitatea procedurii diferă de la caz la caz.',
        ],
      },
    ],
    seoTitle: 'Extracție dinți temporari / parodontotici | Duo Dent',
    seoDescription:
      'Află când poate fi recomandată extracția dinților temporari sau parodontotici și ce presupune această intervenție.',
  },

  'chirurgie-oro-maxilo-faciala:extractie-dinti-monoradiculari-rest-monoradicular': {
    excerpt:
      'Extracție dentară pentru dinți monoradiculari sau resturi monoradiculare, indicată în anumite situații clinice.',
    articleIntro:
      'Extracția dinților monoradiculari sau a resturilor monoradiculare poate fi recomandată atunci când dintele nu mai poate fi salvat sau când menținerea lui nu este benefică pentru planul de tratament. Procedura este stabilită în urma evaluării clinice.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Intervenția constă în îndepărtarea dintelui sau a restului radicular, în condițiile stabilite de medic după examinare.',
          'Abordarea diferă în funcție de starea locală, de gradul de distrucție și de dificultatea cazului.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când dintele nu mai poate fi recuperat sau când prezența lui împiedică evoluția corectă a tratamentului.',
          'Recomandarea aparține medicului și se face în funcție de contextul clinic real.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și poate varia în funcție de dificultatea intervenției.',
        ],
      },
    ],
    seoTitle: 'Extracție dinți monoradiculari / rest monoradicular | Duo Dent',
    seoDescription:
      'Detalii despre extracția dinților monoradiculari sau a resturilor monoradiculare la Duo Dent.',
  },

  'chirurgie-oro-maxilo-faciala:extractie-dinti-pluriradiculari-rest-pluriradicular': {
    excerpt:
      'Extracție dentară pentru dinți pluriradiculari sau resturi pluriradiculare, realizată în funcție de complexitatea cazului.',
    articleIntro:
      'Extracția dinților pluriradiculari sau a resturilor pluriradiculare poate fi mai complexă și este recomandată atunci când dintele nu mai poate fi păstrat. Planificarea intervenției se face după consultație și evaluarea atentă a cazului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această procedură vizează îndepărtarea unui dinte cu mai multe rădăcini sau a unor resturi radiculare, în condițiile stabilite de medic.',
          'Gradul de dificultate depinde de anatomia dintelui, de starea locală și de particularitățile cazului.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară atunci când dintele nu mai poate fi tratat sau când menținerea lui nu mai este indicată clinic.',
          'Medicul stabilește dacă extracția este cea mai potrivită soluție, în funcție de evaluarea făcută în cabinet.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat are caracter orientativ și trebuie corelat cu complexitatea reală a intervenției.',
        ],
      },
    ],
    seoTitle: 'Extracție dinți pluriradiculari / rest pluriradicular | Duo Dent',
    seoDescription:
      'Află detalii despre extracția dinților pluriradiculari și a resturilor pluriradiculare la Duo Dent.',
  },

  'chirurgie-oro-maxilo-faciala:extractie-molar-de-minte': {
    excerpt:
      'Extracție de molar de minte, recomandată în funcție de poziția dintelui și de contextul clinic.',
    articleIntro:
      'Extracția molarului de minte poate fi necesară în anumite situații clinice, în funcție de poziția dintelui, de simptome și de recomandarea medicului. Intervenția este planificată individual, după evaluarea cazului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în îndepărtarea molarului de minte atunci când medicul stabilește că aceasta este soluția potrivită.',
          'Complexitatea intervenției poate varia în funcție de poziția dintelui, acces și starea structurilor din jur.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când molarul de minte provoacă durere, inflamație, complicații locale sau când există risc pentru dinții vecini.',
          'Indicația exactă se stabilește după consultație și, dacă este necesar, după investigații imagistice.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ, iar costul final poate depinde de gradul de dificultate al procedurii.',
        ],
      },
    ],
    seoTitle: 'Extracție molar de minte | Duo Dent',
    seoDescription:
      'Detalii despre extracția molarului de minte la Duo Dent: când poate fi recomandată și ce presupune intervenția.',
  },

  'chirurgie-oro-maxilo-faciala:cimentare-glass-dinte': {
    excerpt:
      'Cimentare dentară realizată în funcție de tipul lucrării și de indicația medicală.',
    articleIntro:
      'Cimentarea Glass pe dinte reprezintă o manoperă prin care o lucrare sau o componentă dentară este fixată în funcție de indicația medicului și de nevoile tratamentului. Această etapă se integrează într-un plan terapeutic stabilit individual.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în fixarea unei lucrări sau componente pe dinte, utilizând materialul ales de medic în funcție de contextul clinic.',
          'Rolul acestei etape este de a asigura integrarea corectă a lucrării în tratamentul recomandat.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară în tratamente protetice sau restaurative, atunci când medicul consideră că această etapă este potrivită pentru stabilizarea și funcționarea corectă a lucrării.',
          'Indicația exactă depinde de tratamentul general și de situația dintelui.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat în contextul tratamentului complet.',
        ],
      },
    ],
    seoTitle: 'Cimentare Glass / dinte | Duo Dent',
    seoDescription:
      'Află mai multe despre cimentarea Glass pe dinte și rolul ei în tratamentele dentare la Duo Dent.',
  },

  'chirurgie-oro-maxilo-faciala:cimentare-provizorie-repin-dinte': {
    excerpt:
      'Cimentare provizorie utilizată ca etapă intermediară în anumite tratamente dentare.',
    articleIntro:
      'Cimentarea provizorie Repin pe dinte este o etapă temporară utilizată atunci când lucrarea trebuie fixată provizoriu înainte de soluția finală. Rolul ei este de a susține funcționalitatea și continuitatea tratamentului până la etapa definitivă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în fixarea provizorie a unei lucrări sau componente, astfel încât tratamentul să poată continua în condiții corecte.',
          'Aceasta este o etapă intermediară, nu soluția finală a cazului.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când este nevoie de o etapă temporară între realizarea lucrării și fixarea definitivă.',
          'Indicația depinde de tipul tratamentului și de strategia stabilită de medic.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie corelat cu tratamentul din care această etapă face parte.',
        ],
      },
    ],
    seoTitle: 'Cimentare provizorie Repin / dinte | Duo Dent',
    seoDescription:
      'Detalii despre cimentarea provizorie Repin pe dinte și rolul ei în etapele intermediare ale tratamentului.',
  },

  'chirurgie-oro-maxilo-faciala:refacere-coronara-cu-surub-intradentar': {
    excerpt:
      'Refacere coronară cu șurub intradentar, recomandată în anumite situații pentru susținerea reconstrucției dintelui.',
    articleIntro:
      'Refacerea coronară cu șurub intradentar poate fi recomandată atunci când medicul consideră că dintele are nevoie de o susținere suplimentară pentru reconstrucția coronară. Alegerea acestei soluții depinde de starea dintelui și de planul de tratament propus.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește refacerea structurii dentare prin utilizarea unui șurub intradentar, atunci când această soluție este indicată clinic.',
          'Rolul ei este de a susține reconstrucția dintelui și integrarea ulterioară într-un tratament restaurativ sau protetic.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când dintele are nevoie de susținere suplimentară pentru refacerea coronară.',
          'Medicul stabilește dacă această opțiune este potrivită, în funcție de structura dentară rămasă și de obiectivele tratamentului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București și Belciugatele.',
          'Prețul afișat este orientativ, iar recomandarea finală se stabilește numai după evaluare clinică.',
        ],
      },
    ],
    seoTitle: 'Refacere coronară cu șurub intradentar | Duo Dent',
    seoDescription:
      'Află în ce situații poate fi recomandată refacerea coronară cu șurub intradentar la Duo Dent.',
  },

  'chirurgie-oro-maxilo-faciala:incizie-abces': {
    excerpt:
      'Incizie realizată în anumite situații clinice pentru gestionarea corectă a unui abces dentar.',
    articleIntro:
      'Incizia unui abces poate fi necesară în anumite situații pentru gestionarea corectă a unei infecții și pentru ameliorarea contextului clinic. Această intervenție se face doar la recomandarea medicului și în funcție de evaluarea realizată în cabinet.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă într-o intervenție locală realizată pentru gestionarea situației clinice atunci când medicul consideră că aceasta este necesară.',
          'Ea face parte din abordarea terapeutică a cazului și poate fi urmată de alte etape de tratament.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară atunci când există semne clinice care indică nevoia unei intervenții locale pentru controlul situației.',
          'Indicația se stabilește exclusiv de medic, după consultație și examinare.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și poate varia în funcție de particularitățile cazului.',
        ],
      },
    ],
    seoTitle: 'Incizie abces | Duo Dent',
    seoDescription:
      'Detalii despre incizia abcesului dentar și rolul ei în gestionarea anumitor situații clinice la Duo Dent.',
  },








  'chirurgie-oro-maxilo-faciala:gingivectomie-excizie-polip-gingival': {
    excerpt:
      'Intervenție locală realizată în funcție de evaluarea clinică și de recomandarea medicului.',
    articleIntro:
      'Gingivectomia sau excizia unui polip gingival poate fi recomandată în anumite situații pentru corectarea unei probleme locale la nivel gingival. Indicația exactă și planul de tratament se stabilesc numai după consultație și evaluare clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în îndepărtarea țesutului gingival afectat atunci când medicul consideră că această intervenție este necesară.',
          'Scopul este de a trata corect zona respectivă și de a permite o evoluție locală favorabilă, în funcție de contextul clinic.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când există modificări locale gingivale care necesită îndepărtare sau corecție.',
          'Decizia se ia în urma evaluării clinice, iar recomandarea diferă de la caz la caz.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat în funcție de complexitatea reală a cazului.',
        ],
      },
    ],
    seoTitle: 'Gingivectomie / excizie polip gingival | Duo Dent',
    seoDescription:
      'Detalii despre gingivectomie și excizia polipului gingival la Duo Dent, cu informații utile înainte de programare.',
  },

  'chirurgie-oro-maxilo-faciala:sutura': {
    excerpt:
      'Etapă chirurgicală utilizată atunci când tratamentul necesită închiderea și protejarea corectă a zonei intervenite.',
    articleIntro:
      'Sutura poate face parte din anumite intervenții stomatologice sau chirurgicale și are rolul de a susține vindecarea corectă a zonei tratate. Necesitatea ei depinde de tipul procedurii și de recomandarea medicului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Sutura este o etapă de închidere și protecție a zonei tratate, utilizată atunci când medicul consideră că este necesară pentru evoluția corectă a cazului.',
          'Aceasta nu reprezintă un tratament separat în sine, ci poate face parte dintr-o intervenție mai amplă.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară după anumite extracții, intervenții chirurgicale sau alte manopere care implică tratamentul țesuturilor locale.',
          'Indicația exactă se stabilește în funcție de procedura efectuată și de particularitățile clinice ale pacientului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și se corelează cu intervenția din care această etapă face parte.',
        ],
      },
    ],
    seoTitle: 'Sutură | Duo Dent',
    seoDescription:
      'Află mai multe despre sutură ca etapă a anumitor intervenții stomatologice și chirurgicale la Duo Dent.',
  },

  'chirurgie-oro-maxilo-faciala:tratament-alveolita-postextractionala': {
    excerpt:
      'Tratament recomandat în anumite situații care apar după extracție, în funcție de simptomatologie și evaluare clinică.',
    articleIntro:
      'Tratamentul alveolitei postextracționale poate fi necesar atunci când după o extracție apar simptome sau semne clinice care necesită intervenție. Conduita corectă se stabilește doar în cabinet, după evaluarea zonei și a evoluției postoperatorii.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Tratamentul urmărește gestionarea corectă a unei complicații locale apărute după extracție, astfel încât vindecarea să poată continua în condiții mai bune.',
          'Etapele exacte depind de starea clinică și de recomandarea medicului.',
        ],
      },
      {
        title: 'Când poate fi necesar',
        content: [
          'Poate fi necesar atunci când după extracție apar durere persistentă, disconfort accentuat sau alte semne care sugerează o evoluție locală nefavorabilă.',
          'Evaluarea rapidă în cabinet este importantă pentru stabilirea conduitei potrivite.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și poate varia în funcție de situația clinică și de tratamentul necesar.',
        ],
      },
    ],
    seoTitle: 'Tratament alveolită postextracțională | Duo Dent',
    seoDescription:
      'Detalii despre tratamentul alveolitei postextracționale la Duo Dent și importanța evaluării corecte după extracție.',
  },

  'chirurgie-oro-maxilo-faciala:tratament-antiinflamator-gingival-dinte-antibiotic': {
    excerpt:
      'Tratament local recomandat în anumite situații clinice, în funcție de evaluarea medicului.',
    articleIntro:
      'Tratamentul antiinflamator gingival sau dentar poate fi recomandat în anumite situații pentru controlul local al inflamației și pentru susținerea tratamentului general. Indicația exactă se stabilește numai după consultație și evaluare clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă poate face parte din abordarea terapeutică a unor probleme locale gingivale sau dentare, atunci când medicul consideră că este necesară.',
          'Rolul ei este de a susține controlul situației clinice și de a integra cazul într-un plan de tratament potrivit.',
        ],
      },
      {
        title: 'Când poate fi recomandat',
        content: [
          'Poate fi recomandat în anumite situații inflamatorii locale, în funcție de simptomatologie, examen clinic și recomandarea medicului.',
          'Indicația exactă diferă de la caz la caz și nu se stabilește fără evaluare directă.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat în contextul tratamentului complet recomandat.',
        ],
      },
    ],
    seoTitle: 'Tratament antiinflamator gingival / dinte | Duo Dent',
    seoDescription:
      'Detalii despre tratamentul antiinflamator gingival sau dentar la Duo Dent, cu informații utile înainte de programare.',
  },

  'chirurgie-oro-maxilo-faciala:tratament-desensibilizare-include-gutiere': {
    excerpt:
      'Tratament de desensibilizare integrat într-un plan stabilit de medic, cu gutiere incluse.',
    articleIntro:
      'Tratamentul de desensibilizare cu gutiere poate fi recomandat în anumite situații pentru reducerea sensibilității și pentru susținerea confortului pacientului. Indicația, modul de utilizare și durata tratamentului se stabilesc individual.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest tratament include utilizarea unor gutiere și a unei scheme recomandate de medic, în funcție de nevoile clinice ale pacientului.',
          'Rolul lui este de a susține controlul sensibilității și de a integra corect această etapă într-un plan terapeutic mai amplu, atunci când este necesar.',
        ],
      },
      {
        title: 'Când poate fi recomandat',
        content: [
          'Poate fi recomandat în cazurile în care pacientul se confruntă cu sensibilitate dentară sau când medicul consideră că această abordare este potrivită.',
          'Necesitatea lui se stabilește după evaluarea clinică și în funcție de cauzele sensibilității.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și include informația de bază disponibilă în listă, însă recomandarea finală aparține medicului.',
        ],
      },
    ],
    seoTitle: 'Tratament desensibilizare (include gutiere) | Duo Dent',
    seoDescription:
      'Află mai multe despre tratamentul de desensibilizare cu gutiere și când poate fi recomandat la Duo Dent.',
  },

  'chirurgie-oro-maxilo-faciala:decapusonare-molar-de-minte': {
    excerpt:
      'Procedură recomandată în anumite situații legate de molarul de minte, în funcție de evaluarea clinică.',
    articleIntro:
      'Decapusonarea molarului de minte poate fi indicată în anumite situații atunci când țesuturile din jurul dintelui creează disconfort sau favorizează apariția unor probleme locale. Planul de tratament este stabilit după consultație și evaluare clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește tratarea locală a zonei din jurul molarului de minte, atunci când medicul consideră că aceasta este soluția potrivită.',
          'Intervenția este recomandată în funcție de contextul clinic și de modul în care se prezintă zona respectivă.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când molarul de minte provoacă episoade repetate de disconfort, inflamație sau alte probleme locale.',
          'Decizia se ia în urma evaluării clinice și, dacă este necesar, a investigațiilor imagistice.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și poate varia în funcție de particularitățile cazului.',
        ],
      },
    ],
    seoTitle: 'Decapusonare molar de minte | Duo Dent',
    seoDescription:
      'Detalii despre decapusonarea molarului de minte și situațiile în care această procedură poate fi recomandată.',
  },

  'chirurgie-oro-maxilo-faciala:consultatie-specialist-chirurgie': {
    excerpt:
      'Consultație de specialitate pentru evaluarea cazurilor care pot necesita abordare chirurgicală.',
    articleIntro:
      'Consultația de specialitate în chirurgie este recomandată atunci când cazul necesită o evaluare atentă din perspectivă chirurgicală. În această etapă, medicul analizează situația clinică, explică opțiunile disponibile și stabilește conduita potrivită.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Consultația include evaluarea clinică a cazului și orientarea pacientului către cea mai potrivită soluție, în funcție de problema existentă.',
          'Dacă este necesar, medicul poate recomanda investigații suplimentare sau poate explica etapele unei intervenții chirurgicale.',
        ],
      },
      {
        title: 'Când este utilă',
        content: [
          'Este utilă atunci când există suspiciunea că tratamentul necesită o intervenție chirurgicală sau o abordare mai complexă.',
          'Poate reprezenta și primul pas pentru planificarea corectă a unei proceduri chirurgicale dentare sau oro-maxilo-faciale.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și se referă la etapa de evaluare și orientare a cazului.',
        ],
      },
    ],
    seoTitle: 'Consultație specialist chirurgie | Duo Dent',
    seoDescription:
      'Consultație de specialitate în chirurgie la Duo Dent, pentru evaluare corectă și stabilirea pașilor de tratament.',
  },

  'chirurgie-oro-maxilo-faciala:rezectie-apicala-dinti-monoradiculari': {
    excerpt:
      'Intervenție chirurgicală realizată în anumite cazuri, în funcție de evaluarea specialistului.',
    articleIntro:
      'Rezecția apicală pentru dinți monoradiculari poate fi recomandată în anumite situații atunci când medicul consideră că această abordare este potrivită pentru gestionarea cazului. Decizia se ia în funcție de examenul clinic, investigații și obiectivele tratamentului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această intervenție face parte din chirurgia dentară și este utilizată în anumite cazuri pentru tratarea unei situații localizate la nivelul rădăcinii dintelui.',
          'Planificarea exactă a procedurii și etapele asociate sunt explicate individual, în funcție de contextul clinic.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când medicul stabilește că această intervenție oferă o variantă potrivită de tratament pentru dintele respectiv.',
          'Necesitatea ei se stabilește numai după evaluare clinică și imagistică.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și poate varia în funcție de complexitatea reală a cazului.',
        ],
      },
    ],
    seoTitle: 'Rezecție apicală dinți monoradiculari | Duo Dent',
    seoDescription:
      'Detalii despre rezecția apicală pentru dinți monoradiculari la Duo Dent și când poate fi recomandată.',
  },

  'chirurgie-oro-maxilo-faciala:rezectie-apicala-dinti-pluriradiculari': {
    excerpt:
      'Intervenție chirurgicală recomandată în anumite cazuri, pentru dinți pluriradiculari.',
    articleIntro:
      'Rezecția apicală pentru dinți pluriradiculari poate fi indicată în anumite situații clinice, în funcție de evaluarea specialistului și de particularitățile rădăcinilor implicate. Planul de tratament se stabilește numai după consultație și investigații.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura face parte din chirurgia dentară și este utilizată în anumite cazuri pentru abordarea unei probleme localizate la nivelul unuia sau mai multor vârfuri radiculare.',
          'Complexitatea intervenției este influențată de anatomia dintelui și de situația clinică concretă.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când medicul consideră că această variantă este potrivită pentru evoluția favorabilă a cazului.',
          'Decizia finală se ia pe baza evaluării clinice și imagistice și nu poate fi stabilită în afara consultației.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat în funcție de complexitatea intervenției.',
        ],
      },
    ],
    seoTitle: 'Rezecție apicală dinți pluriradiculari | Duo Dent',
    seoDescription:
      'Află detalii despre rezecția apicală pentru dinți pluriradiculari și rolul ei în anumite tratamente chirurgicale.',
  },

  'chirurgie-oro-maxilo-faciala:extractie-molar-de-minte-semiinclus': {
    excerpt:
      'Extracție de molar de minte semiinclus, planificată în funcție de poziția dintelui și de contextul clinic.',
    articleIntro:
      'Extracția molarului de minte semiinclus poate fi mai complexă decât o extracție obișnuită și se recomandă numai după evaluarea corectă a poziției dintelui și a structurilor din jur. Medicul stabilește indicația și planul intervenției în funcție de fiecare caz.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în îndepărtarea molarului de minte atunci când acesta este semiinclus și creează sau poate crea probleme locale.',
          'Gradul de dificultate diferă de la caz la caz, iar intervenția este planificată în funcție de evaluarea clinică și imagistică.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când molarul de minte semiinclus provoacă durere, inflamație, presiune sau alte complicații locale.',
          'Indicația exactă este stabilită de medic după consultație și investigațiile necesare.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și poate varia în funcție de complexitatea intervenției.',
        ],
      },
    ],
    seoTitle: 'Extracție molar de minte semiinclus | Duo Dent',
    seoDescription:
      'Detalii despre extracția molarului de minte semiinclus la Duo Dent și situațiile în care poate fi recomandată.',
  },

  'chirurgie-oro-maxilo-faciala:extractie-molar-de-minte-inclus': {
    excerpt:
      'Extracție de molar de minte inclus, realizată în funcție de indicația medicală și complexitatea cazului.',
    articleIntro:
      'Extracția molarului de minte inclus este o intervenție care necesită planificare atentă și evaluare corectă înainte de tratament. Medicul stabilește conduita terapeutică în funcție de poziția dintelui, simptome și riscurile asociate.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Intervenția constă în îndepărtarea unui molar de minte inclus, atunci când această soluție este considerată potrivită clinic.',
          'Fiind o procedură mai complexă, planificarea ei ține cont de poziția dintelui și de relația cu structurile învecinate.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când molarul inclus generează sau poate genera durere, inflamație, presiune, complicații locale sau alte probleme dentare.',
          'Indicația exactă este stabilită numai după consultație și investigațiile recomandate.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și poate varia în funcție de dificultatea reală a intervenției.',
        ],
      },
    ],
    seoTitle: 'Extracție molar de minte inclus | Duo Dent',
    seoDescription:
      'Află mai multe despre extracția molarului de minte inclus și când poate fi necesară această intervenție.',
  },

  'chirurgie-oro-maxilo-faciala:extractie-canin-inclus': {
    excerpt:
      'Intervenție chirurgicală realizată în anumite situații pentru extragerea unui canin inclus.',
    articleIntro:
      'Extracția unui canin inclus poate fi recomandată în anumite situații clinice, în funcție de poziția dintelui, de posibilitățile de tratament și de planul stabilit de medic. Decizia se ia numai după evaluare și investigații corespunzătoare.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în extragerea unui canin inclus atunci când medicul stabilește că această soluție este necesară pentru cazul respectiv.',
          'Intervenția este planificată individual, în funcție de localizarea dintelui și de complexitatea situației clinice.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când caninul inclus nu poate fi integrat favorabil într-un plan de tratament sau când prezența lui generează probleme locale.',
          'Recomandarea depinde de evaluarea specialistului și de investigațiile efectuate.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat în funcție de particularitățile cazului.',
        ],
      },
    ],
    seoTitle: 'Extracție canin inclus | Duo Dent',
    seoDescription:
      'Detalii despre extracția caninului inclus la Duo Dent și situațiile în care poate fi recomandată.',
  },

  'chirurgie-oro-maxilo-faciala:regularizare-creasta-osoasa-hemiarcada': {
    excerpt:
      'Intervenție chirurgicală recomandată în anumite situații pentru adaptarea corectă a câmpului protetic sau chirurgical.',
    articleIntro:
      'Regularizarea crestei osoase la nivel de hemiarcadă poate fi necesară în anumite cazuri pentru pregătirea corectă a zonei și pentru integrarea tratamentului ulterior. Indicația exactă este stabilită după evaluarea medicală.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește adaptarea și regularizarea unei zone osoase atunci când medicul consideră că aceasta este necesară pentru tratamentul planificat.',
          'Intervenția poate face parte dintr-un context protetic, chirurgical sau implantar, în funcție de caz.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când zona osoasă necesită corecție pentru a permite o evoluție mai bună a tratamentului.',
          'Necesitatea ei se stabilește numai după consultație și investigațiile relevante.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și poate varia în funcție de complexitatea intervenției.',
        ],
      },
    ],
    seoTitle: 'Regularizare creastă osoasă / hemiarcadă | Duo Dent',
    seoDescription:
      'Află mai multe despre regularizarea crestei osoase și rolul ei în anumite tratamente stomatologice și chirurgicale.',
  },

  'chirurgie-oro-maxilo-faciala:extractie-dentara-cu-alveolotomie': {
    excerpt:
      'Extracție dentară cu alveolotomie, recomandată în anumite cazuri cu dificultate crescută.',
    articleIntro:
      'Extracția dentară cu alveolotomie poate fi necesară în cazurile în care intervenția nu se poate realiza printr-o extracție simplă. Planul operator se stabilește în funcție de evaluarea clinică și imagistică, precum și de dificultatea reală a cazului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă într-o extracție realizată printr-o abordare mai complexă, atunci când situația clinică o impune.',
          'Medicul stabilește modul de intervenție în funcție de poziția dintelui, acces și particularitățile anatomice.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când dintele nu poate fi extras în condiții obișnuite și este necesară o abordare chirurgicală suplimentară.',
          'Decizia se ia exclusiv după consultație și evaluarea corectă a cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și se corelează cu gradul de dificultate al intervenției.',
        ],
      },
    ],
    seoTitle: 'Extracție dentară cu alveolotomie | Duo Dent',
    seoDescription:
      'Detalii despre extracția dentară cu alveolotomie și situațiile în care această intervenție poate fi necesară.',
  },

  'chirurgie-oro-maxilo-faciala:extirpare-tumori-benigne-ale-mucoasei-orale': {
    excerpt:
      'Intervenție chirurgicală realizată în anumite cazuri pentru îndepărtarea unei formațiuni benigne a mucoasei orale.',
    articleIntro:
      'Extirparea tumorilor benigne ale mucoasei orale poate fi recomandată în anumite situații, în funcție de caracteristicile formațiunii și de evaluarea specialistului. Indicația și planificarea tratamentului se stabilesc individual.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în îndepărtarea unei formațiuni benigne de la nivelul mucoasei orale, atunci când medicul consideră că această intervenție este necesară.',
          'Intervenția este planificată în funcție de localizare, dimensiune și contextul clinic.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când formațiunea necesită îndepărtare pentru tratament, confort sau clarificarea conduitei medicale.',
          'Recomandarea finală aparține specialistului și se bazează pe evaluarea clinică directă.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și poate varia în funcție de complexitatea cazului și a intervenției.',
        ],
      },
    ],
    seoTitle: 'Extirpare tumori benigne ale mucoasei orale | Duo Dent',
    seoDescription:
      'Detalii despre extirparea formațiunilor benigne ale mucoasei orale la Duo Dent și etapele evaluării chirurgicale.',
  },

  'chirurgie-oro-maxilo-faciala:sinus-lifting-extern': {
    excerpt:
      'Intervenție asociată anumitor tratamente implantare, planificată în funcție de evaluarea osoasă și de recomandarea medicului.',
    articleIntro:
      'Sinus liftingul extern poate face parte din planul de tratament implantar în anumite situații în care medicul consideră că este nevoie de o etapă suplimentară pentru pregătirea corectă a zonei. Indicația se stabilește după consultație și investigațiile necesare.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această intervenție este asociată anumitor planuri de tratament din implantologie și are rolul de a pregăti corespunzător zona pentru etapa următoare.',
          'Planificarea ei se face individual, în funcție de volumul osos disponibil și de strategia terapeutică stabilită de medic.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când evaluarea clinică și imagistică arată că este necesară o etapă suplimentară înainte de tratamentul implantar.',
          'Necesitatea ei diferă de la caz la caz și se stabilește numai după investigații complete.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București și Belciugatele.',
          'Prețul afișat este orientativ și trebuie interpretat în contextul planului complet de tratament.',
        ],
      },
    ],
    seoTitle: 'Sinus lifting extern | Duo Dent',
    seoDescription:
      'Află mai multe despre sinus liftingul extern și rolul lui în anumite planuri de tratament implantar la Duo Dent.',
  },

  'chirurgie-oro-maxilo-faciala:sinus-lifting-intern': {
    excerpt:
      'Intervenție asociată anumitor tratamente implantare, indicată în funcție de evaluarea clinică și imagistică.',
    articleIntro:
      'Sinus liftingul intern poate fi recomandat în anumite situații din implantologie, atunci când medicul consideră că este necesară pregătirea suplimentară a zonei pentru integrarea tratamentului. Planul este stabilit individual, în funcție de fiecare caz.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Intervenția face parte din anumite planuri de tratament implantar și este utilizată atunci când medicul stabilește că această etapă este necesară.',
          'Modul de abordare și integrarea ei în tratament depind de evaluarea clinică și de investigațiile imagistice.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când situația osoasă și planul implantar impun o etapă suplimentară de pregătire a zonei.',
          'Necesitatea ei este stabilită individual, după consultație și investigații complete.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și se corelează cu tratamentul complet recomandat.',
        ],
      },
    ],
    seoTitle: 'Sinus lifting intern | Duo Dent',
    seoDescription:
      'Detalii despre sinus liftingul intern și rolul lui în anumite tratamente implantare la Duo Dent.',
  },

  'chirurgie-oro-maxilo-faciala:cimentare-adhesor-dinte': {
    excerpt:
      'Cimentare dentară realizată ca parte a unui tratament restaurativ sau protetic.',
    articleIntro:
      'Cimentarea Adhesor pe dinte este o etapă utilizată în anumite tratamente restaurative sau protetice, atunci când medicul stabilește că această variantă este potrivită. Rolul ei este de a fixa corect o lucrare sau o componentă a tratamentului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în fixarea unei lucrări sau componente pe dinte, în funcție de indicația și planul de tratament stabilite de medic.',
          'Această etapă este integrată într-un tratament mai amplu și nu se analizează separat de restul procedurilor.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară în anumite tratamente protetice sau restaurative, în funcție de soluția aleasă pentru caz.',
          'Indicația exactă depinde de tratamentul general și de particularitățile dintelui sau lucrării.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Belciugatele.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul planului complet de tratament.',
        ],
      },
    ],
    seoTitle: 'Cimentare Adhesor / dinte | Duo Dent',
    seoDescription:
      'Detalii despre cimentarea Adhesor pe dinte și rolul ei în tratamentele dentare la Duo Dent.',
  },

  'manopere-generale:ablatie-coroana': {
    excerpt:
      'Îndepărtarea unei coroane dentare ca etapă pregătitoare pentru evaluare, refacere sau continuarea tratamentului.',
    articleIntro:
      'Ablația coroanei poate fi necesară atunci când o lucrare existentă trebuie îndepărtată pentru reevaluarea dintelui, refacerea tratamentului sau continuarea unei alte etape terapeutice. Medicul stabilește necesitatea acestei manopere după evaluarea clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura constă în îndepărtarea unei coroane existente, astfel încât medicul să poată evalua corect situația dintelui și a lucrării.',
          'Aceasta poate fi o etapă intermediară într-un tratament mai amplu, nu neapărat o manoperă finală în sine.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când lucrarea trebuie înlocuită, adaptată sau când există suspiciuni privind starea dintelui de sub coroană.',
          'Decizia se ia în funcție de evaluarea clinică și de obiectivele tratamentului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat în funcție de complexitatea cazului și de etapele care urmează.',
        ],
      },
    ],
    seoTitle: 'Ablație coroană | Duo Dent',
    seoDescription:
      'Află mai multe despre ablația coroanei dentare și rolul ei în evaluarea și continuarea tratamentului.',
  },

  'estetica-dentara:tratament-de-albire-a-dintilor-in-cabinet': {
    excerpt:
      'Tratament de albire realizat în cabinet, pentru îmbunătățirea aspectului zâmbetului.',
    articleIntro:
      'Albirea dentară realizată în cabinet este o procedură estetică recomandată în anumite situații pentru îmbunătățirea aspectului zâmbetului. Indicația și rezultatul urmărit depind de particularitățile fiecărui caz și de recomandarea medicului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura este realizată în cabinet și urmărește deschiderea nuanței dinților, în limitele compatibile cu situația clinică și cu obiectivul estetic al pacientului.',
          'Înaintea recomandării, medicul verifică dacă starea dentară și gingivală permite efectuarea tratamentului în condiții potrivite.',
        ],
      },
      {
        title: 'Când poate fi potrivită',
        content: [
          'Poate fi potrivită atunci când pacientul își dorește o îmbunătățire estetică a zâmbetului și există condițiile clinice necesare pentru realizarea tratamentului.',
          'Uneori, medicul poate recomanda etape prealabile, cum ar fi igienizarea profesională sau tratarea unor probleme existente.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ, iar recomandarea finală se stabilește după evaluare clinică.',
        ],
      },
    ],
    seoTitle: 'Albire dentară în cabinet | Duo Dent',
    seoDescription:
      'Detalii despre tratamentul de albire dentară realizat în cabinet la Duo Dent și când poate fi recomandat.',
  },

  'estetica-dentara:tratament-de-albire-a-dintilor-la-domiciliu': {
    excerpt:
      'Tratament de albire realizat la domiciliu, pe baza recomandării și indicațiilor oferite în cabinet.',
    articleIntro:
      'Albirea dentară la domiciliu poate fi o opțiune potrivită în anumite situații, atunci când medicul consideră că această variantă este compatibilă cu starea dentară și cu obiectivul estetic urmărit. Planul de utilizare se stabilește individual.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Tratamentul se realizează la domiciliu, pe baza indicațiilor oferite de medic și, atunci când este cazul, cu ajutorul unor suporturi personalizate.',
          'Pentru rezultate potrivite și utilizare corectă, este important ca recomandarea să fie făcută după evaluare clinică.',
        ],
      },
      {
        title: 'Când poate fi potrivit',
        content: [
          'Poate fi potrivit atunci când pacientul își dorește o variantă de tratament realizată acasă, sub îndrumarea medicului.',
          'Indicația depinde de starea dinților, de sensibilitate și de alte particularități clinice care trebuie verificate în cabinet.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat împreună cu recomandarea medicală și planul stabilit în cabinet.',
        ],
      },
    ],
    seoTitle: 'Albire dentară la domiciliu | Duo Dent',
    seoDescription:
      'Află mai multe despre albirea dentară la domiciliu recomandată de Duo Dent și când poate fi potrivită.',
  },

  'estetica-dentara:detartraj-plus-periaj-profesional-dinte': {
    excerpt:
      'Procedură de igienizare profesională realizată la nivel dentar, în funcție de recomandarea medicului.',
    articleIntro:
      'Detartrajul și periajul profesional la nivelul dintelui fac parte din procedurile de igienizare utilizate pentru îndepărtarea depunerilor și pentru susținerea sănătății orale. Recomandarea exactă depinde de starea clinică și de necesitățile pacientului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește curățarea profesională a suprafețelor dentare și reducerea depunerilor care nu pot fi îndepărtate eficient doar prin igiena de acasă.',
          'Aceasta poate face parte dintr-un plan de igienizare mai amplu sau dintr-o etapă de întreținere recomandată periodic.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când există depuneri, colorații sau nevoia de susținere a igienei orale prin curățare profesională.',
          'Frecvența și forma exactă a igienizării sunt stabilite de medic în funcție de nevoile fiecărui pacient.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și poate varia în funcție de modul în care procedura este integrată în tratament.',
        ],
      },
    ],
    seoTitle: 'Detartraj + periaj profesional / dinte | Duo Dent',
    seoDescription:
      'Detalii despre detartrajul și periajul profesional la Duo Dent, ca parte a igienizării dentare.',
  },

  'estetica-dentara:detartraj-plus-periaj-profesional-arcada': {
    excerpt:
      'Igienizare profesională la nivel de arcadă, recomandată pentru întreținerea sănătății orale și a aspectului zâmbetului.',
    articleIntro:
      'Detartrajul și periajul profesional la nivel de arcadă fac parte din procedurile de igienizare recomandate pentru îndepărtarea depunerilor și pentru menținerea unui echilibru oral cât mai bun. Medicul stabilește frecvența și necesitatea acestei proceduri în funcție de fiecare caz.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește curățarea profesională a unei arcade, prin îndepărtarea depunerilor și completarea igienei orale de rutină.',
          'Aceasta poate fi recomandată atât ca măsură de întreținere, cât și ca etapă pregătitoare înaintea altor tratamente.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată periodic, atunci când medicul consideră că este necesară o igienizare profesională mai atentă.',
          'În unele cazuri, poate fi utilă înaintea unor tratamente estetice sau restaurative.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul recomandării medicale și al stării orale actuale.',
        ],
      },
    ],
    seoTitle: 'Detartraj + periaj profesional / arcadă | Duo Dent',
    seoDescription:
      'Află mai multe despre detartrajul și periajul profesional la nivel de arcadă realizate la Duo Dent.',
  },

  'estetica-dentara:detartraj-plus-prophyjet-arcada': {
    excerpt:
      'Procedură de igienizare profesională la nivel de arcadă, completată cu Prophyjet.',
    articleIntro:
      'Detartrajul și Prophyjetul la nivel de arcadă fac parte din procedurile de igienizare profesională recomandate pentru curățarea eficientă a suprafețelor dentare și pentru susținerea unui aspect mai curat al zâmbetului. Indicația exactă se stabilește în cabinet.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura combină îndepărtarea depunerilor cu curățarea profesională realizată prin Prophyjet, în funcție de nevoile clinice ale pacientului.',
          'Rolul ei este de a susține igiena orală profesională și de a completa întreținerea zilnică realizată acasă.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când există depuneri, colorații sau nevoia unei igienizări mai complete la nivelul arcadei.',
          'Medicul stabilește dacă această combinație de proceduri este potrivită pentru cazul respectiv.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie corelat cu recomandarea medicală și necesitățile reale ale pacientului.',
        ],
      },
    ],
    seoTitle: 'Detartraj + Prophyjet / arcadă | Duo Dent',
    seoDescription:
      'Detalii despre detartrajul și Prophyjetul realizate la nivel de arcadă în clinicile Duo Dent.',
  },

  'estetica-dentara:prophyjet-arcada': {
    excerpt:
      'Procedură profesională de curățare la nivel de arcadă, recomandată în funcție de evaluarea clinică.',
    articleIntro:
      'Prophyjetul la nivel de arcadă este o procedură de igienizare profesională care poate contribui la îndepărtarea colorațiilor și la îmbunătățirea aspectului general al dinților. Necesitatea ei se stabilește în funcție de starea orală și de recomandarea medicului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește curățarea profesională a suprafețelor dentare la nivel de arcadă, pentru reducerea colorațiilor și completarea igienei orale.',
          'Poate fi efectuată ca etapă de întreținere sau ca parte a unei igienizări profesionale mai ample.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când există colorații sau depuneri care necesită o curățare profesională mai atentă.',
          'Medicul decide dacă această procedură este suficientă singură sau dacă trebuie asociată cu alte manopere de igienizare.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și se interpretează în contextul recomandării făcute în cabinet.',
        ],
      },
    ],
    seoTitle: 'Prophyjet / arcadă | Duo Dent',
    seoDescription:
      'Află mai multe despre Prophyjetul realizat la nivel de arcadă și rolul lui în igienizarea profesională.',
  },

  'estetica-dentara:tatuaj-dentar': {
    excerpt:
      'Procedură estetică realizată la recomandarea și în condițiile stabilite de medic.',
    articleIntro:
      'Tatuajul dentar este o procedură estetică adresată pacienților care își doresc un element decorativ aplicat în contextul unei soluții stabilite împreună cu medicul. Indicația și posibilitatea realizării lui depind de evaluarea clinică și de tipul lucrării sau al dintelui implicat.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește integrarea unui element estetic decorativ, atunci când această opțiune este compatibilă cu situația clinică și cu dorința pacientului.',
          'Detaliile privind realizarea, durata și integrarea în tratament sunt discutate individual în cabinet.',
        ],
      },
      {
        title: 'Când poate fi potrivit',
        content: [
          'Poate fi potrivit pentru pacienții interesați de o soluție estetică personalizată, atunci când medicul confirmă că aceasta este posibilă și potrivită.',
          'Recomandarea finală ține cont de particularitățile clinice și de contextul tratamentului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ, iar toate detaliile se stabilesc după evaluare și discuția cu medicul.',
        ],
      },
    ],
    seoTitle: 'Tatuaj dentar | Duo Dent',
    seoDescription:
      'Detalii despre tatuajul dentar la Duo Dent și condițiile în care această opțiune estetică poate fi realizată.',
  },

  'estetica-dentara:pachet-detartraj-plus-periaj-plus-prophyjet-ambele-arcade': {
    excerpt:
      'Pachet complet de igienizare profesională pentru ambele arcade.',
    articleIntro:
      'Pachetul de detartraj, periaj și Prophyjet pentru ambele arcade reunește mai multe proceduri de igienizare profesională, recomandate pentru curățarea eficientă a dinților și pentru susținerea sănătății orale. Indicația exactă este stabilită de medic, în funcție de nevoile fiecărui pacient.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Pachetul combină mai multe etape de igienizare profesională pentru curățarea depunerilor, reducerea colorațiilor și îmbunătățirea aspectului general al zâmbetului.',
          'Acesta poate fi recomandat ca procedură completă de întreținere sau ca etapă pregătitoare pentru alte tratamente.',
        ],
      },
      {
        title: 'Când poate fi recomandat',
        content: [
          'Poate fi recomandat atunci când medicul consideră că este nevoie de o igienizare profesională completă la nivelul ambelor arcade.',
          'Este util atât pentru întreținere periodică, cât și în contextul pregătirii pentru alte intervenții stomatologice.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat împreună cu recomandarea făcută în cabinet.',
        ],
      },
    ],
    seoTitle: 'Pachet detartraj + periaj + Prophyjet | Duo Dent',
    seoDescription:
      'Detalii despre pachetul complet de igienizare profesională pentru ambele arcade disponibil la Duo Dent.',
  },











  'protetica:coroana-ceramica-pe-structura-de-oxid-de-zirconiu': {
    excerpt:
      'Lucrare protetică fixă recomandată în anumite situații pentru refacerea funcției și a esteticii dentare.',
    articleIntro:
      'Coroana ceramică pe structură de oxid de zirconiu este o soluție protetică utilizată în anumite cazuri pentru refacerea dintelui sau a unei zone tratate. Alegerea acestei variante depinde de situația clinică, de suportul existent și de planul propus de medic.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această lucrare face parte din zona protetică și urmărește refacerea funcției dentare și a aspectului estetic într-un mod adaptat cazului clinic.',
          'Tipul exact de lucrare, etapele necesare și integrarea ei în tratament se stabilesc individual, după evaluarea medicală.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când un dinte are nevoie de o refacere protetică stabilă și estetică sau când tratamentul general cere o astfel de soluție.',
          'Decizia finală ține cont de structura dentară rămasă, de solicitările funcționale și de recomandarea medicului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și poate varia în funcție de particularitățile lucrării și ale planului de tratament.',
        ],
      },
    ],
    seoTitle: 'Coroană ceramică pe structură de zirconiu | Duo Dent',
    seoDescription:
      'Detalii despre coroana ceramică pe structură de zirconiu și rolul ei în tratamentele protetice realizate la Duo Dent.',
  },

  'protetica:coroana-ceramica-pe-structura-de-au-pt': {
    excerpt:
      'Lucrare protetică fixă utilizată în anumite situații, în funcție de recomandarea medicală și de planul de tratament.',
    articleIntro:
      'Coroana ceramică pe structură de Au-Pt este o variantă protetică utilizată în anumite cazuri, în funcție de cerințele funcționale, estetice și de recomandarea medicului. Soluția finală se stabilește individual, după evaluare clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Lucrarea are rolul de a reface funcția și aspectul dintelui, fiind integrată într-un plan protetic stabilit pentru fiecare pacient.',
          'Tipul de material și alegerea acestei soluții se fac în funcție de particularitățile clinice și de obiectivele tratamentului.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când medicul consideră că această variantă este potrivită pentru refacerea unei zone dentare sau pentru completarea unei lucrări protetice.',
          'Alegerea ei depinde de suportul dentar, de rezistența necesară și de integrarea estetică urmărită.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București și Belciugatele.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul planului protetic complet.',
        ],
      },
    ],
    seoTitle: 'Coroană ceramică pe structură de Au-Pt | Duo Dent',
    seoDescription:
      'Află mai multe despre coroana ceramică pe structură de Au-Pt și când poate fi recomandată în tratamentele Duo Dent.',
  },

  'protetica:coroana-ceramica-pe-structura-cr-cb': {
    excerpt:
      'Lucrare protetică fixă recomandată pentru refacerea dintelui, în funcție de indicația medicului.',
    articleIntro:
      'Coroana ceramică pe structură Cr-Cb este una dintre soluțiile protetice utilizate pentru refacerea funcției dentare și a esteticii zâmbetului. Indicația exactă și alegerea acestei variante se stabilesc după evaluarea clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această lucrare protetică este utilizată pentru refacerea unui dinte tratat sau afectat, atunci când medicul consideră că este soluția potrivită.',
          'Integrarea ei în tratament depinde de starea dintelui, de suportul disponibil și de planul general propus.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când este necesară o refacere protetică stabilă și când caracteristicile cazului permit această opțiune.',
          'Decizia finală aparține medicului și se ia în funcție de evaluarea completă a situației clinice.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și poate diferi în funcție de complexitatea lucrării și de planul de tratament.',
        ],
      },
    ],
    seoTitle: 'Coroană ceramică pe structură Cr-Cb | Duo Dent',
    seoDescription:
      'Detalii despre coroana ceramică pe structură Cr-Cb și rolul ei în tratamentele protetice la Duo Dent.',
  },

  'protetica:coroana-acrilica-provizorie-in-cabinet': {
    excerpt:
      'Lucrare provizorie realizată în cabinet ca etapă intermediară în anumite tratamente protetice.',
    articleIntro:
      'Coroana acrilică provizorie realizată în cabinet poate fi folosită ca etapă temporară până la finalizarea lucrării definitive. Rolul ei este de a susține protecția, funcția și aspectul zonei tratate pe durata etapelor intermediare.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această lucrare provizorie este realizată pentru a acoperi temporar un dinte sau o zonă aflată în tratament, până la aplicarea soluției definitive.',
          'Ea are rol funcțional și estetic temporar și face parte dintr-un plan protetic mai amplu.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când tratamentul protetic necesită o etapă intermediară de protecție și adaptare.',
          'Necesitatea ei depinde de tipul tratamentului și de recomandarea medicului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul lucrării definitive și al etapelor asociate.',
        ],
      },
    ],
    seoTitle: 'Coroană acrilică provizorie în cabinet | Duo Dent',
    seoDescription:
      'Află mai multe despre coroana acrilică provizorie realizată în cabinet și rolul ei în tratamentele protetice.',
  },

  'protetica:dispozitiv-corono-radicular-cr-cb': {
    excerpt:
      'Componentă protetică utilizată în anumite cazuri pentru susținerea refacerii coronare.',
    articleIntro:
      'Dispozitivul corono-radicular Cr-Cb poate face parte din tratamentul protetic atunci când medicul consideră că este necesară o susținere suplimentară pentru refacerea dintelui. Alegerea lui depinde de starea clinică și de planul terapeutic stabilit.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această componentă este utilizată în anumite situații pentru a susține reconstrucția și refacerea protetică a dintelui.',
          'Necesitatea ei se stabilește în funcție de structura dentară rămasă și de soluția protetică aleasă.',
        ],
      },
      {
        title: 'Când poate fi recomandat',
        content: [
          'Poate fi recomandat atunci când medicul consideră că dintele are nevoie de o susținere adecvată pentru integrarea lucrării protetice.',
          'Indicația exactă depinde de examinarea clinică și de rezistența structurii dentare existente.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și se corelează cu complexitatea tratamentului protetic asociat.',
        ],
      },
    ],
    seoTitle: 'Dispozitiv corono-radicular Cr-Cb | Duo Dent',
    seoDescription:
      'Detalii despre dispozitivul corono-radicular Cr-Cb și rolul lui în anumite tratamente protetice la Duo Dent.',
  },

  'protetica:coroana-acrilica-provizorie-in-laborator': {
    excerpt:
      'Lucrare provizorie realizată în laborator, utilizată ca etapă intermediară în tratamentele protetice.',
    articleIntro:
      'Coroana acrilică provizorie realizată în laborator este o soluție temporară utilizată în anumite etape ale tratamentului protetic, până la finalizarea lucrării definitive. Rolul ei este stabilit în funcție de planul medical și de particularitățile cazului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Lucrarea provizorie are rolul de a proteja și de a menține funcția și aspectul zonei tratate până la aplicarea soluției definitive.',
          'Fiind realizată în laborator, aceasta poate face parte dintr-un traseu protetic etapizat, stabilit de medic.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când tratamentul necesită o etapă provizorie înainte de finalizarea lucrării definitive.',
          'Necesitatea ei depinde de tipul cazului și de strategia de tratament aleasă.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul întregului tratament protetic.',
        ],
      },
    ],
    seoTitle: 'Coroană acrilică provizorie în laborator | Duo Dent',
    seoDescription:
      'Detalii despre coroana acrilică provizorie realizată în laborator și rolul ei în tratamentele protetice Duo Dent.',
  },

  'protetica:proteza-acrilica': {
    excerpt:
      'Soluție protetică mobilă recomandată în anumite cazuri pentru refacerea funcției și a esteticii.',
    articleIntro:
      'Proteza acrilică este una dintre soluțiile protetice mobile utilizate în anumite situații pentru refacerea funcției masticatorii și a aspectului estetic. Indicația și alegerea ei se stabilesc după consultație și evaluarea clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această soluție protetică urmărește refacerea echilibrului funcțional și estetic atunci când lipsa dinților necesită o abordare protetică mobilă.',
          'Planul exact, etapele de realizare și adaptarea lucrării sunt stabilite în funcție de particularitățile pacientului.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când medicul consideră că proteza acrilică este o soluție potrivită pentru refacerea funcției și pentru confortul pacientului.',
          'Recomandarea finală depinde de suportul existent, de nevoile funcționale și de opțiunile discutate în cabinet.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și poate varia în funcție de complexitatea lucrării și de etapele necesare.',
        ],
      },
    ],
    seoTitle: 'Proteză acrilică | Duo Dent',
    seoDescription:
      'Află mai multe despre proteza acrilică și când poate fi recomandată în tratamentele protetice realizate la Duo Dent.',
  },

  'protetica:mentinator-de-spatiu-kemmeny': {
    excerpt:
      'Dispozitiv protetic utilizat în anumite situații pentru menținerea spațiului dentar.',
    articleIntro:
      'Menținătorul de spațiu poate fi recomandat în anumite situații pentru păstrarea corectă a spațiului dentar, în funcție de evaluarea clinică și de planul stabilit de medic. Rolul lui este de a susține tratamentul și evoluția corectă a cazului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest dispozitiv este utilizat pentru menținerea spațiului într-o anumită zonă dentară, atunci când medicul consideră că este necesar.',
          'Integrarea lui în tratament depinde de contextul clinic și de obiectivul terapeutic urmărit.',
        ],
      },
      {
        title: 'Când poate fi recomandat',
        content: [
          'Poate fi recomandat atunci când este importantă păstrarea unui spațiu dentar pentru evoluția corectă a cazului sau pentru o etapă ulterioară de tratament.',
          'Necesitatea lui este stabilită individual, după consultație și evaluare.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și se interpretează în contextul planului complet recomandat de medic.',
        ],
      },
    ],
    seoTitle: 'Menținător de spațiu | Duo Dent',
    seoDescription:
      'Detalii despre menținătorul de spațiu și rolul lui în anumite tratamente protetice sau de susținere realizate la Duo Dent.',
  },

  'protetica:sistem-de-ancorare-complex': {
    excerpt:
      'Componentă protetică utilizată în anumite lucrări, în funcție de soluția aleasă pentru caz.',
    articleIntro:
      'Sistemul de ancorare complex poate face parte din anumite lucrări protetice, atunci când planul de tratament impune o astfel de soluție. Medicul stabilește necesitatea lui în funcție de cazul clinic și de obiectivele funcționale și estetice urmărite.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această componentă este utilizată pentru susținerea și integrarea unor lucrări protetice care necesită o soluție de ancorare adaptată.',
          'Rolul exact și modul de includere în tratament sunt explicate individual, după stabilirea soluției potrivite.',
        ],
      },
      {
        title: 'Când poate fi recomandat',
        content: [
          'Poate fi recomandat atunci când tipul de lucrare protetică ales pentru pacient necesită un sistem de ancorare corespunzător.',
          'Decizia depinde de structura existentă, de tipul lucrării și de recomandarea medicului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat în contextul tratamentului protetic din care face parte.',
        ],
      },
    ],
    seoTitle: 'Sistem de ancorare complex | Duo Dent',
    seoDescription:
      'Află mai multe despre sistemul de ancorare complex și rolul lui în anumite lucrări protetice realizate la Duo Dent.',
  },

  'protetica:microproteza-new-ancorvis': {
    excerpt:
      'Soluție protetică utilizată în anumite cazuri, în funcție de recomandarea medicului și de planul de tratament.',
    articleIntro:
      'Microproteza poate reprezenta o soluție potrivită în anumite situații protetice, în funcție de suportul existent și de obiectivele tratamentului. Tipul exact de lucrare și recomandarea finală se stabilesc după evaluarea clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această lucrare face parte din zona soluțiilor protetice și este utilizată în funcție de particularitățile cazului și de opțiunea aleasă de medic.',
          'Planificarea ei ține cont de necesitățile funcționale, de confort și de integrarea estetică a lucrării.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când situația clinică permite o astfel de soluție și când medicul consideră că este potrivită pentru refacerea dorită.',
          'Alegerea finală se face în funcție de suportul existent și de planul protetic stabilit în cabinet.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și poate varia în funcție de complexitatea lucrării și de etapele implicate.',
        ],
      },
    ],
    seoTitle: 'Microproteză | Duo Dent',
    seoDescription:
      'Detalii despre microproteză și rolul ei în anumite soluții protetice recomandate în clinicile Duo Dent.',
  },

  'protetica:inlocuire-sistem-special-capsa-culisa-buc': {
    excerpt:
      'Intervenție protetică pentru înlocuirea unei componente speciale a lucrării existente.',
    articleIntro:
      'Înlocuirea unui sistem special, precum capsa sau culisa, poate fi necesară atunci când o lucrare protetică are nevoie de adaptare, recondiționare sau refacerea unei componente. Necesitatea acestei etape este stabilită în cabinet, după evaluare.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește înlocuirea unei componente speciale din cadrul unei lucrări protetice existente, atunci când această etapă este necesară pentru funcționarea corectă a lucrării.',
          'Intervenția se face în funcție de tipul lucrării și de starea sistemului respectiv.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când o lucrare protetică necesită adaptare, reparație sau înlocuirea unei componente care nu mai funcționează corespunzător.',
          'Recomandarea se face individual, după examinarea lucrării și a situației clinice.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și se interpretează în funcție de particularitățile lucrării existente.',
        ],
      },
    ],
    seoTitle: 'Înlocuire sistem special capsă / culisă | Duo Dent',
    seoDescription:
      'Detalii despre înlocuirea sistemelor speciale de tip capsă sau culisă în lucrările protetice realizate la Duo Dent.',
  },

  'protetica:gutiera-albire-arcada': {
    excerpt:
      'Dispozitiv personalizat utilizat în anumite tratamente de albire recomandate de medic.',
    articleIntro:
      'Gutiera de albire pentru arcadă este un dispozitiv personalizat care poate face parte dintr-un tratament estetic recomandat de medic. Necesitatea ei și modul de utilizare sunt stabilite în cabinet, în funcție de cazul clinic și de planul de albire ales.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Gutiera este realizată pentru adaptare corectă la nivelul arcadei și pentru utilizare conform recomandării medicale.',
          'Rolul ei este de a susține tratamentul de albire atunci când medicul indică această variantă de abordare.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când tratamentul de albire la domiciliu sau un protocol estetic similar necesită utilizarea unei gutiere personalizate.',
          'Indicația depinde de starea orală, de sensibilitate și de obiectivul estetic urmărit.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și face parte din informația generală disponibilă pentru tratamentul recomandat.',
        ],
      },
    ],
    seoTitle: 'Gutieră albire arcadă | Duo Dent',
    seoDescription:
      'Află mai multe despre gutiera de albire pentru arcadă și rolul ei în tratamentele estetice recomandate la Duo Dent.',
  },

  'protetica:gutiera-bruxism': {
    excerpt:
      'Dispozitiv personalizat recomandat în anumite situații pentru protecția dinților și controlul efectelor bruxismului.',
    articleIntro:
      'Gutiera pentru bruxism poate fi recomandată atunci când medicul consideră că este nevoie de o protecție suplimentară pentru dinți sau de susținerea controlului unor efecte asociate bruxismului. Alegerea ei se face după evaluare clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Gutiera este un dispozitiv personalizat, adaptat arcadei pacientului, utilizat în funcție de recomandarea medicului.',
          'Rolul ei este de a proteja structurile dentare și de a susține tratamentul atunci când există indicație pentru o astfel de soluție.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când există semne clinice, simptome sau un context în care medicul consideră utilă utilizarea unei gutiere.',
          'Necesitatea ei se stabilește în funcție de evaluare, nu doar pe baza denumirii simptomelor.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și se interpretează împreună cu recomandarea medicală și planul de tratament.',
        ],
      },
    ],
    seoTitle: 'Gutieră bruxism | Duo Dent',
    seoDescription:
      'Detalii despre gutiera pentru bruxism și rolul ei în protecția dinților și în planul recomandat de medic la Duo Dent.',
  },

  'protetica:rebazare-proteza': {
    excerpt:
      'Etapă de adaptare a protezei existente, recomandată în anumite situații pentru îmbunătățirea stabilității și confortului.',
    articleIntro:
      'Rebazarea protezei poate fi necesară atunci când o proteză existentă are nevoie de adaptare pentru a corespunde mai bine situației actuale din cavitatea orală. Necesitatea acestei etape se stabilește după evaluare clinică și examinarea lucrării.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește adaptarea bazei unei proteze existente, pentru a îmbunătăți sprijinul, stabilitatea sau confortul în utilizare.',
          'Aceasta este recomandată în funcție de modificările apărute în timp și de starea clinică actuală.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când proteza nu mai oferă adaptarea dorită sau când medicul constată că este necesară o corecție a modului în care aceasta se așază.',
          'Recomandarea depinde de evaluarea lucrării existente și de examinarea clinică a pacientului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și poate varia în funcție de particularitățile protezei și ale cazului clinic.',
        ],
      },
    ],
    seoTitle: 'Rebazare proteză | Duo Dent',
    seoDescription:
      'Detalii despre rebazarea protezei și rolul ei în adaptarea și stabilizarea lucrărilor protetice existente la Duo Dent.',
  },

  'protetica:amprenta-pentru-model-de-studiu-ambele-arcade': {
    excerpt:
      'Etapă de lucru utilizată pentru analiza și planificarea corectă a anumitor tratamente.',
    articleIntro:
      'Amprenta pentru model de studiu la nivelul ambelor arcade poate face parte din procesul de analiză și planificare a tratamentului. Rolul ei este de a oferi medicului un suport suplimentar pentru evaluarea corectă a cazului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă permite obținerea unor modele utile pentru studiu, analiză și planificare, în funcție de tratamentul urmărit.',
          'Nu reprezintă un tratament final în sine, ci o etapă tehnică importantă în anumite cazuri.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când medicul are nevoie de o analiză suplimentară pentru stabilirea planului de tratament.',
          'Este frecvent integrată în evaluarea unor cazuri protetice, ortodontice sau complexe.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și se corelează cu rolul acestei etape în planul general de tratament.',
        ],
      },
    ],
    seoTitle: 'Amprentă pentru model de studiu | Duo Dent',
    seoDescription:
      'Află mai multe despre amprenta pentru model de studiu și rolul ei în analiza și planificarea tratamentelor la Duo Dent.',
  },

  'protetica:reparatie-proteza-acrilica': {
    excerpt:
      'Intervenție protetică recomandată atunci când o proteză acrilică existentă necesită reparație.',
    articleIntro:
      'Reparația protezei acrilice poate fi necesară atunci când lucrarea existentă prezintă probleme care permit corectare și readaptare. Necesitatea acestei intervenții se stabilește în urma evaluării lucrării și a situației clinice.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește remedierea unei proteze acrilice existente, atunci când aceasta poate fi reparată în condiții potrivite.',
          'Tipul de reparație depinde de situația concretă a lucrării și de recomandarea medicului.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când proteza prezintă o problemă ce poate fi corectată fără refacerea integrală a lucrării.',
          'Decizia se ia după analiza protezei și a modului în care aceasta mai poate fi utilizată corect.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și depinde de complexitatea reparației și de starea lucrării existente.',
        ],
      },
    ],
    seoTitle: 'Reparație proteză acrilică | Duo Dent',
    seoDescription:
      'Detalii despre reparația protezei acrilice și situațiile în care această intervenție poate fi recomandată la Duo Dent.',
  },

  'protetica:inlocuire-dinte-lipsa-din-proteza': {
    excerpt:
      'Intervenție protetică realizată pentru completarea unei proteze existente.',
    articleIntro:
      'Înlocuirea unui dinte lipsă din proteză poate fi necesară atunci când o lucrare protetică existentă are nevoie de completare pentru a-și recăpăta funcția și aspectul dorit. Soluția este stabilită după evaluarea lucrării și a cazului clinic.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește completarea unei proteze existente prin înlocuirea unui dinte lipsă din structura acesteia.',
          'Această etapă este realizată în funcție de posibilitatea tehnică și de starea generală a lucrării protetice.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când o proteză existentă necesită completare pentru a funcționa și a arăta corespunzător.',
          'Indicația finală se stabilește după evaluarea lucrării și a contextului clinic în care aceasta este utilizată.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat în funcție de tipul lucrării și de intervenția necesară.',
        ],
      },
    ],
    seoTitle: 'Înlocuire dinte lipsă din proteză | Duo Dent',
    seoDescription:
      'Află mai multe despre înlocuirea unui dinte lipsă din proteză și rolul acestei etape în refacerea lucrărilor protetice.',
  },

  'protetica:inlocuire-croset': {
    excerpt:
      'Etapă protetică realizată pentru recondiționarea sau completarea unei lucrări existente.',
    articleIntro:
      'Înlocuirea croșetului poate fi necesară atunci când o lucrare protetică mobilă are nevoie de adaptare sau de refacerea unei componente esențiale pentru funcționare. Necesitatea acestei etape se stabilește în cabinet, după evaluare.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Procedura urmărește înlocuirea unei componente de susținere din cadrul unei lucrări protetice mobile, pentru a reda stabilitatea și funcția acesteia.',
          'Intervenția este adaptată tipului de lucrare și modului în care aceasta este utilizată de pacient.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când croșetul existent este deteriorat, nu mai funcționează corespunzător sau necesită înlocuire pentru adaptare mai bună.',
          'Recomandarea depinde de starea lucrării și de evaluarea efectuată de medic.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și se interpretează în funcție de intervenția necesară asupra lucrării protetice.',
        ],
      },
    ],
    seoTitle: 'Înlocuire croșet | Duo Dent',
    seoDescription:
      'Detalii despre înlocuirea croșetului și rolul acestei etape în adaptarea lucrărilor protetice mobile la Duo Dent.',
  },

  'protetica:proteza-elastica': {
    excerpt:
      'Soluție protetică mobilă utilizată în anumite cazuri, în funcție de planul de tratament stabilit de medic.',
    articleIntro:
      'Proteza elastică poate reprezenta una dintre variantele de tratament protetic mobil, în funcție de particularitățile cazului și de recomandarea medicului. Alegerea ei se face numai după evaluare clinică și discuția despre opțiunile potrivite.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această soluție protetică urmărește refacerea funcției și a echilibrului estetic într-o manieră adaptată cazului și tipului de sprijin disponibil.',
          'Planul de realizare, adaptare și integrare a lucrării se stabilește individual, în funcție de pacient.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când medicul consideră că această variantă este potrivită pentru nevoile funcționale și clinice ale pacientului.',
          'Alegerea finală depinde de suportul existent, de obiectivele tratamentului și de alte soluții analizate în cabinet.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și poate varia în funcție de complexitatea lucrării și de etapele asociate.',
        ],
      },
    ],
    seoTitle: 'Proteză elastică | Duo Dent',
    seoDescription:
      'Detalii despre proteza elastică și situațiile în care această soluție protetică poate fi recomandată la Duo Dent.',
  },

  'protetica:proteza-scheletata': {
    excerpt:
      'Lucrare protetică mobilă recomandată în anumite cazuri pentru refacerea funcției și stabilității.',
    articleIntro:
      'Proteza scheletată poate fi recomandată în anumite situații ca soluție protetică mobilă, în funcție de suportul dentar existent și de obiectivele funcționale și estetice ale tratamentului. Medicul stabilește această indicație după evaluare clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această lucrare are rolul de a reface funcția și de a oferi o soluție protetică adaptată cazului, atunci când medicul consideră că este potrivită.',
          'Planificarea și alegerea ei țin cont de suportul existent și de modul în care lucrarea trebuie să se integreze în tratamentul general.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când o proteză scheletată oferă o variantă potrivită pentru refacerea funcției și echilibrului oral.',
          'Alegerea depinde de evaluarea clinică, de structurile restante și de recomandarea medicului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Belciugatele și Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul lucrării și al etapelor necesare pentru realizarea ei.',
        ],
      },
    ],
    seoTitle: 'Proteză scheletată | Duo Dent',
    seoDescription:
      'Află mai multe despre proteza scheletată și rolul ei în anumite tratamente protetice recomandate la Duo Dent.',
  },

  'protetica:sistem-special-capsa-culisa': {
    excerpt:
      'Componentă protetică utilizată în anumite lucrări mobile, în funcție de soluția aleasă pentru caz.',
    articleIntro:
      'Sistemul special de tip capsă sau culisă poate face parte dintr-o lucrare protetică atunci când planul de tratament impune o astfel de soluție. Alegerea lui depinde de tipul lucrării, de suportul existent și de recomandarea medicului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această componentă este utilizată pentru susținerea și funcționarea unei lucrări protetice, atunci când medicul consideră că este potrivită pentru cazul respectiv.',
          'Modul exact în care este integrată în tratament depinde de tipul lucrării și de obiectivele funcționale urmărite.',
        ],
      },
      {
        title: 'Când poate fi recomandat',
        content: [
          'Poate fi recomandat atunci când lucrarea protetică necesită un sistem special de prindere sau stabilizare.',
          'Necesitatea lui se stabilește individual, după evaluarea clinică și după analiza variantei protetice alese.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și face parte din informația generală disponibilă pentru tratamentul protetic recomandat.',
        ],
      },
    ],
    seoTitle: 'Sistem special capsă / culisă | Duo Dent',
    seoDescription:
      'Detalii despre sistemele speciale de tip capsă sau culisă și rolul lor în anumite lucrări protetice realizate la Duo Dent.',
  },

  'protetica:coroana-zirconiu-integral': {
    excerpt:
      'Lucrare protetică fixă utilizată pentru refacerea funcției și esteticii dentare, în funcție de recomandarea medicului.',
    articleIntro:
      'Coroana din zirconiu integral este o soluție protetică recomandată în anumite cazuri pentru refacerea dintelui și integrarea estetică în zâmbet. Alegerea acestei variante se face după evaluare clinică și stabilirea planului de tratament.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Lucrarea are rolul de a reface un dinte afectat sau tratat, atunci când medicul consideră că această variantă oferă o soluție potrivită.',
          'Tipul exact de lucrare și integrarea ei în tratament se stabilesc în funcție de suportul existent și de cerințele funcționale și estetice.',
        ],
      },
      {
        title: 'Când poate fi recomandată',
        content: [
          'Poate fi recomandată atunci când este necesară o refacere protetică fixă și când structura clinică permite această soluție.',
          'Recomandarea finală aparține medicului și se bazează pe analiza completă a cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Tariful afișat este orientativ și poate varia în funcție de complexitatea lucrării și de etapele tratamentului.',
        ],
      },
    ],
    seoTitle: 'Coroană zirconiu integral | Duo Dent',
    seoDescription:
      'Detalii despre coroana din zirconiu integral și rolul ei în tratamentele protetice realizate la Duo Dent.',
  },

  'protetica:pivot-de-sticla-cu-refacere-bont-protetic': {
    excerpt:
      'Etapă protetică utilizată în anumite cazuri pentru susținerea refacerii dentare.',
    articleIntro:
      'Pivotul de sticlă cu refacere de bont protetic poate fi recomandat atunci când dintele are nevoie de o bază suplimentară pentru integrarea ulterioară a unei lucrări protetice. Necesitatea acestei soluții se stabilește după evaluarea clinică.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă are rolul de a susține refacerea dintelui atunci când medicul consideră că este nevoie de o structură suplimentară pentru continuarea tratamentului protetic.',
          'Procedura este integrată într-un plan mai amplu și nu se analizează separat de restul etapelor terapeutice.',
        ],
      },
      {
        title: 'Când poate fi recomandat',
        content: [
          'Poate fi recomandat atunci când structura dintelui necesită susținere suplimentară pentru a permite refacerea protetică.',
          'Indicația depinde de starea dintelui, de tratamentele anterioare și de planul propus de medic.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat în contextul tratamentului complet recomandat.',
        ],
      },
    ],
    seoTitle: 'Pivot de sticlă cu refacere bont protetic | Duo Dent',
    seoDescription:
      'Află mai multe despre pivotul de sticlă cu refacere de bont protetic și rolul lui în tratamentele realizate la Duo Dent.',
  },

  'implantologie:consultatie-specialist-implantologie': {
    excerpt:
      'Consultație de specialitate pentru evaluarea cazurilor care pot necesita tratament implantar.',
    articleIntro:
      'Consultația de specialitate în implantologie este primul pas pentru analiza corectă a unui caz care poate necesita tratament implantar. În cadrul acestei etape, medicul evaluează situația clinică, explică opțiunile disponibile și stabilește dacă sunt necesare investigații suplimentare.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Consultația are rolul de a clarifica situația clinică și de a orienta pacientul către cea mai potrivită variantă de tratament implantar, dacă aceasta este indicată.',
          'În această etapă se discută contextul general al cazului, opțiunile posibile și pașii necesari pentru planificare.',
        ],
      },
      {
        title: 'Când este utilă',
        content: [
          'Este utilă atunci când pacientul dorește să afle dacă tratamentul implantar este o opțiune potrivită pentru situația lui.',
          'Poate reprezenta și punctul de plecare pentru stabilirea etapelor chirurgicale și protetice asociate unui astfel de tratament.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București și Belciugatele.',
          'Tariful afișat este orientativ, iar recomandarea finală se stabilește după evaluarea clinică și investigațiile necesare.',
        ],
      },
    ],
    seoTitle: 'Consultație specialist implantologie | Duo Dent',
    seoDescription:
      'Detalii despre consultația de specialitate în implantologie la Duo Dent și pașii de evaluare înaintea planului de tratament.',
  },

  'implantologie:faza-chirurgicala-de-inserare-a-implantului': {
    excerpt:
      'Etapă chirurgicală din tratamentul implantar, planificată individual în funcție de evaluarea medicală.',
    articleIntro:
      'Faza chirurgicală de inserare a implantului face parte din tratamentul implantar și se stabilește numai după evaluarea clinică și imagistică. Necesitatea ei, numărul implanturilor și planul exact diferă de la caz la caz.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă reprezintă inserarea implantului ca parte a unui plan de tratament stabilit individual, în funcție de nevoile pacientului.',
          'Planificarea și desfășurarea ei depind de structura osoasă, de contextul clinic și de obiectivele generale ale tratamentului.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Inserarea implantului este una dintre etapele tratamentului implantar și poate fi urmată de alte faze necesare pentru finalizarea lucrării.',
          'Nu toate cazurile urmează exact aceeași succesiune, iar medicul stabilește individual ordinea și amploarea etapelor.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și se interpretează în contextul planului complet de tratament implantar.',
        ],
      },
    ],
    seoTitle: 'Inserare implant - fază chirurgicală | Duo Dent',
    seoDescription:
      'Află mai multe despre faza chirurgicală de inserare a implantului și modul în care se integrează în tratamentul implantar la Duo Dent.',
  },

  'implantologie:faza-protetica': {
    excerpt:
      'Etapă din tratamentul implantar care urmărește integrarea lucrării protetice pe implant.',
    articleIntro:
      'Faza protetică din implantologie reprezintă etapa în care tratamentul se orientează către refacerea funcțională și estetică pe suport implantar. Planul exact depinde de structura cazului și de etapele stabilite anterior de medic.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă include elementele necesare pentru realizarea și integrarea lucrării protetice pe implant, în funcție de soluția aleasă.',
          'Nu reprezintă un tratament separat de restul planului, ci o parte esențială din finalizarea cazului implantar.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Faza protetică urmează etapele de evaluare și, atunci când este cazul, etapa chirurgicală, fiind adaptată planului de tratament stabilit pentru pacient.',
          'Structura ei poate varia în funcție de numărul implanturilor, tipul lucrării și obiectivele funcționale și estetice.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București și Belciugatele.',
          'Tariful afișat este orientativ și face parte din informația generală disponibilă pentru tratamentul implantar.',
        ],
      },
    ],
    seoTitle: 'Fază protetică implantologie | Duo Dent',
    seoDescription:
      'Detalii despre faza protetică din implantologie și rolul ei în finalizarea tratamentelor implantare la Duo Dent.',
  },

  'implantologie:element-de-agregare': {
    excerpt:
      'Componentă utilizată în anumite etape ale tratamentului implantar, în funcție de soluția aleasă.',
    articleIntro:
      'Elementul de agregare poate face parte din tratamentul implantar atunci când soluția protetică sau tehnică aleasă îl include. Rolul lui se stabilește în contextul planului general de tratament și nu se analizează separat de restul etapelor.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această componentă este utilizată în anumite cazuri pentru integrarea corectă a etapelor protetice sau tehnice asociate tratamentului implantar.',
          'Necesitatea ei depinde de tipul lucrării, de structura cazului și de recomandarea medicului.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Elementul de agregare este parte dintr-un plan implantar mai amplu și poate apărea doar în anumite soluții protetice.',
          'Rolul lui exact este explicat pacientului după stabilirea tratamentului complet și a componentelor necesare.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în București, Belciugatele și Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat în contextul planului complet de tratament implantar.',
        ],
      },
    ],
    seoTitle: 'Element de agregare | Duo Dent',
    seoDescription:
      'Află mai multe despre elementul de agregare și rolul lui în anumite tratamente implantare realizate la Duo Dent.',
  },

  'implantologie:faza-protetica-coroana': {
    excerpt:
      'Etapă protetică din tratamentul implantar, asociată refacerii coronare pe implant.',
    articleIntro:
      'Faza protetică pentru coroană pe implant reprezintă una dintre etapele prin care tratamentul implantar este finalizat din punct de vedere funcțional și estetic. Planul exact este stabilit individual, în funcție de structura cazului și de recomandarea medicului.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această etapă urmărește integrarea coroanei pe suport implantar, ca parte a soluției finale stabilite pentru pacient.',
          'Tipul exact de lucrare și etapele tehnice asociate sunt stabilite în funcție de cazul clinic și de planul protetic general.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Faza protetică pentru coroană apare după etapele de evaluare și după cele chirurgicale, atunci când cazul este pregătit pentru această etapă.',
          'Ordinea și durata etapelor sunt stabilite individual, în funcție de evoluția tratamentului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul tratamentului implantar complet.',
        ],
      },
    ],
    seoTitle: 'Fază protetică coroană pe implant | Duo Dent',
    seoDescription:
      'Detalii despre faza protetică pentru coroană pe implant și rolul ei în finalizarea tratamentului implantar la Duo Dent.',
  },

  'implantologie:4-implanturi-plus-lucrare-provizorie': {
    excerpt:
      'Pachet orientativ din implantologie, stabilit individual în funcție de evaluarea clinică.',
    articleIntro:
      'Soluția cu 4 implanturi și lucrare provizorie poate face parte din anumite planuri de tratament implantar, atunci când medicul consideră că această abordare este potrivită pentru cazul clinic. Configurația exactă și etapele necesare se stabilesc numai după consultație și investigații.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această opțiune combină etapa implantară cu o lucrare provizorie, în condițiile în care situația clinică permite o astfel de planificare.',
          'Detaliile exacte privind numărul de etape, tipul lucrării și succesiunea lor sunt stabilite individual de medic.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Planul cu 4 implanturi și lucrare provizorie este parte dintr-o strategie implantară complexă, adaptată fiecărui pacient.',
          'Nu toate cazurile sunt compatibile cu aceeași abordare, iar recomandarea se face numai după evaluare completă.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Prețul afișat este orientativ și face parte din informația generală de pornire pentru această soluție de tratament.',
        ],
      },
    ],
    seoTitle: '4 implanturi + lucrare provizorie | Duo Dent',
    seoDescription:
      'Află mai multe despre soluția cu 4 implanturi și lucrare provizorie disponibilă în cadrul tratamentelor implantare Duo Dent.',
  },

  'implantologie:6-implanturi-plus-lucrare-provizorie': {
    excerpt:
      'Pachet orientativ de tratament implantar, recomandat în anumite cazuri după evaluarea medicală.',
    articleIntro:
      'Soluția cu 6 implanturi și lucrare provizorie poate fi recomandată în anumite cazuri, în funcție de evaluarea clinică, de structura osoasă și de planul stabilit de medic. Configurația exactă a tratamentului diferă de la pacient la pacient.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această opțiune de tratament combină inserarea implanturilor cu o lucrare provizorie, atunci când condițiile clinice permit această abordare.',
          'Planul exact, etapele și tipul lucrării sunt stabilite în funcție de obiectivele funcționale și de situația clinică reală.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Soluția cu 6 implanturi este parte a unui plan implantar complet, care poate include mai multe etape chirurgicale și protetice.',
          'Recomandarea depinde de analiza medicală a cazului și nu poate fi standardizată pentru toți pacienții.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul evaluării și al planului de tratament recomandat.',
        ],
      },
    ],
    seoTitle: '6 implanturi + lucrare provizorie | Duo Dent',
    seoDescription:
      'Detalii despre soluția cu 6 implanturi și lucrare provizorie și modul în care aceasta poate fi integrată în tratamentul implantar la Duo Dent.',
  },

  'implantologie:proteza-pe-4-implanturi-include-bonturile': {
    excerpt:
      'Soluție protetică pe implanturi, integrată într-un plan implantar stabilit individual.',
    articleIntro:
      'Proteza pe 4 implanturi poate face parte din tratamentul implantar atunci când această soluție este compatibilă cu situația clinică și cu planul propus de medic. Structura exactă a lucrării și etapele asociate se stabilesc individual.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această soluție descrie o variantă protetică susținută de 4 implanturi, integrată într-un tratament implantar mai amplu.',
          'Tipul lucrării, componentele incluse și etapele necesare sunt stabilite în funcție de evaluarea clinică și de strategia medicală aleasă.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Lucrarea pe 4 implanturi apare în etapa de finalizare protetică a tratamentului, după evaluarea și, atunci când este cazul, etapele chirurgicale necesare.',
          'Nu toate cazurile urmează aceeași schemă, iar recomandarea depinde de particularitățile fiecărui pacient.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Prețul afișat este orientativ și face parte din informația generală de pornire pentru această opțiune de tratament.',
        ],
      },
    ],
    seoTitle: 'Proteză pe 4 implanturi | Duo Dent',
    seoDescription:
      'Detalii despre proteza pe 4 implanturi și modul în care această soluție poate fi integrată în tratamentele implantare Duo Dent.',
  },

  'implantologie:proteza-pe-6-implanturi-include-bonturile': {
    excerpt:
      'Soluție protetică pe implanturi, recomandată în anumite cazuri în funcție de planul medical.',
    articleIntro:
      'Proteza pe 6 implanturi este o soluție care poate fi integrată în anumite tratamente implantare, atunci când medicul stabilește că această variantă este potrivită pentru cazul clinic analizat. Planul exact și etapele necesare se definesc individual.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această soluție face parte din etapa protetică a tratamentului implantar și presupune integrarea unei lucrări susținute de 6 implanturi.',
          'Detaliile legate de componente, materiale și etape sunt stabilite în funcție de recomandarea medicului și de analiza completă a cazului.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Proteza pe 6 implanturi apare în cadrul unui plan implantar mai amplu, care poate include evaluare, etape chirurgicale și etapă protetică finală.',
          'Necesitatea ei depinde de contextul clinic și de obiectivele funcționale și estetice urmărite.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Tariful afișat este orientativ și trebuie interpretat în contextul tratamentului complet recomandat.',
        ],
      },
    ],
    seoTitle: 'Proteză pe 6 implanturi | Duo Dent',
    seoDescription:
      'Află mai multe despre proteza pe 6 implanturi și rolul ei în anumite tratamente implantare realizate la Duo Dent.',
  },

  'implantologie:proteza-cu-capse-pe-implanturi': {
    excerpt:
      'Soluție protetică mobilă pe implanturi, analizată individual în funcție de structura cazului.',
    articleIntro:
      'Proteza cu capse pe implanturi poate fi o opțiune de tratament în anumite cazuri, atunci când medicul consideră că această soluție este potrivită din punct de vedere funcțional și clinic. Alegerea ei se stabilește numai după evaluare completă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această variantă descrie o lucrare protetică susținută de implanturi, în care retenția este realizată printr-un sistem cu capse.',
          'Tipul exact de lucrare și modul în care aceasta este integrată în planul de tratament se stabilesc individual.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Proteza cu capse pe implanturi face parte din etapa protetică a tratamentului implantar și este recomandată doar în anumite situații clinice.',
          'Medicul stabilește dacă această variantă este compatibilă cu suportul implantar și cu obiectivele tratamentului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească.',
          'Prețul afișat este orientativ și trebuie interpretat în contextul evaluării și al soluției finale recomandate.',
        ],
      },
    ],
    seoTitle: 'Proteză cu capse pe implanturi | Duo Dent',
    seoDescription:
      'Detalii despre proteza cu capse pe implanturi și rolul ei în anumite tratamente implantare recomandate la Duo Dent.',
  },







  'endodontie:tratament-monoradicular-microscop': {
    excerpt:
      'Serviciu din zona tratamentelor de canal, prezentat orientativ pentru o înțelegere mai clară a rolului lui în planul de tratament.',
    articleIntro:
      'Tratament monoradicular microscop face parte din serviciile Duo Dent din zona de endodonție. Pagina are rol informativ și te ajută să înțelegi mai clar unde se încadrează acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu aparține zonei de endodonție și vizează tratamentul de canal al unui dinte monoradicular, atunci când situația clinică impune această etapă.',
          'Folosirea microscopului permite o evaluare și o abordare mai precisă, însă indicația exactă se stabilește după consultație.',
        ],
      },
      {
        title: 'Când poate fi necesar',
        content: [
          'Poate fi recomandat atunci când medicul urmărește tratarea sau salvarea unui dinte afectat, în funcție de simptome, examen clinic și investigațiile disponibile.',
          'Durata tratamentului și numărul de ședințe pot varia în funcție de complexitatea cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 500 RON. În endodonție, planul exact se stabilește după evaluarea completă a cazului.',
        ],
      },
    ],
    seoTitle: 'Tratament monoradicular microscop | Duo Dent',
    seoDescription:
      'Detalii despre tratament monoradicular la microscop în cadrul serviciilor de endodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'endodontie:tratament-pluriradicular-microscop': {
    excerpt:
      'Serviciu din zona tratamentelor de canal, prezentat orientativ pentru o orientare mai clară în opțiunile disponibile.',
    articleIntro:
      'Tratament pluriradicular microscop face parte din serviciile Duo Dent din zona de endodonție. Pagina are rol informativ și te ajută să înțelegi mai clar unde se încadrează acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu vizează tratamentul de canal al unui dinte pluriradicular, abordat cu ajutorul microscopului, atunci când medicul consideră necesară această soluție.',
          'Complexitatea tratamentului diferă de la caz la caz, în funcție de anatomia dintelui și de starea clinică existentă.',
        ],
      },
      {
        title: 'Când poate fi necesar',
        content: [
          'Poate fi necesar atunci când obiectivul este tratarea sau retratarea unui dinte afectat, pentru menținerea lui pe arcadă, dacă situația clinică permite.',
          'Recomandarea exactă se stabilește după evaluare și după analiza completă a cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 650 RON. În endodonție, costul final și etapele necesare se confirmă după consultație.',
        ],
      },
    ],
    seoTitle: 'Tratament pluriradicular microscop | Duo Dent',
    seoDescription:
      'Detalii despre tratament pluriradicular la microscop în cadrul serviciilor de endodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'endodontie:tratament-molar-de-minte-microscop': {
    excerpt:
      'Serviciu din zona endodonției, afișat separat pentru o înțelegere mai clară a complexității tratamentului.',
    articleIntro:
      'Tratament molar de minte microscop face parte din serviciile Duo Dent din zona de endodonție. Pagina are rol informativ și te ajută să înțelegi mai clar unde se încadrează acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu vizează tratamentul endodontic al molarului de minte, atunci când cazul permite această abordare și când medicul o consideră justificată clinic.',
          'Tratamentul poate avea un grad mai mare de complexitate, iar utilizarea microscopului susține o abordare mai precisă.',
        ],
      },
      {
        title: 'Când poate fi necesar',
        content: [
          'Poate fi necesar în anumite situații clinice, însă recomandarea depinde de poziția dintelui, de accesibilitate și de prognosticul estimat.',
          'Nu toate cazurile se tratează la fel, iar indicația finală se stabilește individual.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 700 RON. În endodonție, decizia finală se bazează pe evaluarea clinică și pe recomandarea medicului.',
        ],
      },
    ],
    seoTitle: 'Tratament molar de minte microscop | Duo Dent',
    seoDescription:
      'Detalii despre tratament de molar de minte la microscop în cadrul serviciilor de endodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'endodontie:retratament-monoradicular-microscop': {
    excerpt:
      'Serviciu de retratament endodontic, prezentat separat pentru o orientare mai clară asupra opțiunilor disponibile.',
    articleIntro:
      'Retratament monoradicular microscop face parte din serviciile Duo Dent din zona de endodonție. Pagina are rol informativ și te ajută să înțelegi mai clar unde se încadrează acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu vizează reluarea tratamentului de canal pentru un dinte monoradicular, atunci când medicul consideră că este nevoie de o nouă intervenție endodontică.',
          'Retratamentul este abordat în funcție de situația existentă, de istoricul dintelui și de obiectivul terapeutic.',
        ],
      },
      {
        title: 'Când poate fi necesar',
        content: [
          'Poate fi recomandat atunci când există semne clinice sau radiologice care indică necesitatea reluării tratamentului endodontic.',
          'Recomandarea exactă și prognosticul se stabilesc individual, după evaluarea completă a cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 650 RON. În endodonție, retratamentul poate presupune o complexitate diferită față de tratamentul inițial.',
        ],
      },
    ],
    seoTitle: 'Retratament monoradicular microscop | Duo Dent',
    seoDescription:
      'Detalii despre retratament monoradicular la microscop în cadrul serviciilor de endodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'endodontie:retratament-pluriradicular-microscop': {
    excerpt:
      'Serviciu de retratament endodontic, afișat separat pentru o orientare mai clară în structura tratamentului.',
    articleIntro:
      'Retratament pluriradicular microscop face parte din serviciile Duo Dent din zona de endodonție. Pagina are rol informativ și te ajută să înțelegi mai clar unde se încadrează acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu vizează reluarea tratamentului de canal pentru un dinte pluriradicular, în situațiile în care medicul consideră necesară această etapă.',
          'Gradul de dificultate poate fi mai mare, iar planul exact este stabilit în funcție de particularitățile cazului.',
        ],
      },
      {
        title: 'Când poate fi necesar',
        content: [
          'Poate fi indicat atunci când tratamentul anterior trebuie reevaluat și reluat, pentru a obține un rezultat clinic mai bun, dacă situația o permite.',
          'Decizia finală depinde de evaluarea completă și de prognosticul estimat pentru dintele respectiv.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 750 RON. Numărul de ședințe și etapele necesare se stabilesc individual.',
        ],
      },
    ],
    seoTitle: 'Retratament pluriradicular microscop | Duo Dent',
    seoDescription:
      'Detalii despre retratament pluriradicular la microscop în cadrul serviciilor de endodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'endodontie:aplicare-mta-perforatie-microscop': {
    excerpt:
      'Serviciu endodontic prezentat orientativ, pentru o înțelegere mai clară a etapelor posibile din tratamentul de canal.',
    articleIntro:
      'Aplicare MTA perforație microscop face parte din serviciile Duo Dent din zona de endodonție. Pagina are rol informativ și te ajută să înțelegi mai clar unde se încadrează acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu reprezintă o etapă endodontică indicată în anumite situații specifice, atunci când medicul decide utilizarea acestei abordări în cadrul tratamentului.',
          'Rolul lui se stabilește în funcție de particularitățile cazului și de evaluarea clinică realizată în cabinet.',
        ],
      },
      {
        title: 'Când poate fi necesar',
        content: [
          'Poate fi necesar în cazurile în care tratamentul endodontic presupune gestionarea unei situații clinice particulare, identificate de medic.',
          'Indicația exactă nu se stabilește doar după denumirea serviciului, ci după analiza completă a cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 150 RON. În endodonție, unele poziții din listă descriu etape punctuale, nu tratamente complete.',
        ],
      },
    ],
    seoTitle: 'Aplicare MTA perforație microscop | Duo Dent',
    seoDescription:
      'Detalii despre aplicare MTA perforație la microscop în cadrul serviciilor de endodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'endodontie:indepartare-ac-pivot-metalic-dentarus': {
    excerpt:
      'Serviciu endodontic afișat separat pentru clarificarea etapelor posibile dintr-un tratament complex.',
    articleIntro:
      'Îndepărtare ac / pivot metalic / dentarus face parte din serviciile Duo Dent din zona de endodonție. Pagina are rol informativ și te ajută să înțelegi mai clar unde se încadrează acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu descrie o etapă tehnică din zona endodonției, care poate apărea în anumite cazuri, în funcție de istoricul tratamentului și de situația dintelui.',
          'Necesitatea ei este stabilită doar după evaluare clinică și după analiza cazului de către medic.',
        ],
      },
      {
        title: 'Când poate fi necesar',
        content: [
          'Poate fi necesar atunci când tratamentul endodontic sau retratamentul presupune îndepărtarea unor elemente existente pentru a permite continuarea terapiei.',
          'Complexitatea intervenției diferă de la caz la caz, iar recomandarea este întotdeauna personalizată.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 200 RON. În endodonție, tratamentul final poate include mai multe etape complementare.',
        ],
      },
    ],
    seoTitle: 'Îndepărtare ac / pivot metalic / dentarus | Duo Dent',
    seoDescription:
      'Detalii despre îndepărtare ac, pivot metalic sau dentarus în cadrul serviciilor de endodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'endodontie:pansament-hidroxid-de-ca-per-sedinta': {
    excerpt:
      'Serviciu endodontic prezentat orientativ, pentru înțelegerea mai clară a etapelor posibile din tratamentul de canal.',
    articleIntro:
      'Pansament hidroxid de Ca per ședință face parte din serviciile Duo Dent din zona de endodonție. Pagina are rol informativ și te ajută să înțelegi mai clar unde se încadrează acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie o etapă care poate apărea în cadrul tratamentului endodontic, atunci când medicul consideră necesară includerea ei în plan.',
          'Rolul exact și durata acestei etape se stabilesc în funcție de evoluția clinică și de obiectivul tratamentului.',
        ],
      },
      {
        title: 'Când poate fi necesar',
        content: [
          'Poate fi necesar în anumite cazuri, ca parte a tratamentului sau a retratamentului de canal, însă indicația exactă aparține medicului.',
          'Nu toate cazurile urmează aceleași etape, iar structura finală a tratamentului este personalizată.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 200 RON. Tarifele afișate în pagină sunt orientative și trebuie corelate cu planul complet de tratament.',
        ],
      },
    ],
    seoTitle: 'Pansament hidroxid de Ca per ședință | Duo Dent',
    seoDescription:
      'Detalii despre pansament cu hidroxid de calciu per ședință în cadrul serviciilor de endodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'endodontie:obturatie-fotopolimerizabila-dinte-devital': {
    excerpt:
      'Serviciu asociat tratamentelor endodontice, afișat separat pentru o orientare mai clară asupra etapelor de restaurare.',
    articleIntro:
      'Obturație fotopolimerizabilă dinte devital face parte din serviciile Duo Dent din zona de endodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie o etapă de restaurare asociată unui dinte devital, în funcție de recomandarea medicului și de starea clinică a dintelui.',
          'Soluția exactă se stabilește după evaluarea cazului și poate face parte dintr-un plan mai amplu de tratament.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi necesară după tratamentul endodontic, atunci când medicul consideră potrivită refacerea dintelui prin această variantă.',
          'Alegerea finală depinde de rezistența structurilor dentare rămase și de obiectivul terapeutic.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 300 RON. Etapele finale de restaurare se stabilesc în raport cu întregul plan de tratament.',
        ],
      },
    ],
    seoTitle: 'Obturație fotopolimerizabilă dinte devital | Duo Dent',
    seoDescription:
      'Detalii despre obturație fotopolimerizabilă pentru dinte devital în cadrul serviciilor Duo Dent, disponibilă în Valea Călugărească.',
  },

  'endodontie:obturatie-pivot-fibra-de-sticla': {
    excerpt:
      'Serviciu asociat endodonției, afișat separat pentru clarificarea etapelor posibile de refacere dentară.',
    articleIntro:
      'Obturație pivot fibră de sticlă face parte din serviciile Duo Dent din zona de endodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție descrie o soluție de refacere care poate fi recomandată în anumite situații după tratamentul endodontic, în funcție de suportul dentar existent.',
          'Necesitatea ei este stabilită de medic după evaluarea clinică și în funcție de planul de restaurare propus.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi luată în calcul atunci când structura dintelui impune o soluție suplimentară de susținere înaintea etapei finale de refacere.',
          'Indicația exactă se stabilește individual, în funcție de cazul clinic și de obiectivul tratamentului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 350 RON. În endodonție, unele poziții din listă descriu etape complementare ale tratamentului.',
        ],
      },
    ],
    seoTitle: 'Obturație pivot fibră de sticlă | Duo Dent',
    seoDescription:
      'Detalii despre obturație cu pivot din fibră de sticlă în cadrul serviciilor Duo Dent, disponibilă în Valea Călugărească.',
  },

  'endodontie:gingivectomie-preprotetica-microscop': {
    excerpt:
      'Serviciu prezentat în zona endodonției pentru o orientare mai clară asupra etapelor complementare din tratament.',
    articleIntro:
      'Gingivectomie preprotetică microscop face parte din serviciile Duo Dent din zona de endodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie o etapă complementară care poate fi necesară în anumite cazuri, în funcție de indicația clinică și de planul propus de medic.',
          'Rolul ei exact se stabilește în contextul tratamentului, nu doar în funcție de denumirea serviciului.',
        ],
      },
      {
        title: 'Când poate fi necesară',
        content: [
          'Poate fi recomandată atunci când medicul consideră că este nevoie de o astfel de etapă pentru a facilita tratamentul sau refacerea ulterioară.',
          'Indicația exactă aparține evaluării clinice și nu se poate stabili în afara consultației.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 150 RON. Planul complet de tratament se stabilește întotdeauna după evaluarea medicală.',
        ],
      },
    ],
    seoTitle: 'Gingivectomie preprotetică microscop | Duo Dent',
    seoDescription:
      'Detalii despre gingivectomie preprotetică la microscop în cadrul serviciilor Duo Dent, disponibilă în Valea Călugărească.',
  },

  'pedodontie:urgenta': {
    excerpt:
      'Serviciu dedicat stomatologiei pentru copii, prezentat clar pentru o orientare mai ușoară înainte de programare.',
    articleIntro:
      'Urgență face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Serviciul de urgență din pedodonție este destinat situațiilor care necesită evaluare rapidă în cabinet, în contextul stomatologiei pentru copii.',
          'Abordarea este adaptată vârstei copilului, nivelului de cooperare și contextului clinic observat la consultație.',
        ],
      },
      {
        title: 'În ce situații poate fi util',
        content: [
          'Poate fi util atunci când apare o problemă care necesită evaluare rapidă, iar părintele are nevoie de orientare medicală clară în cabinet.',
          'Conduita exactă se stabilește după examinare și în funcție de nevoile clinice ale copilului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 150 RON. În pedodonție, ritmul tratamentului și alegerea etapelor se stabilesc atent, în funcție de copil și de situația clinică.',
        ],
      },
    ],
    seoTitle: 'Urgență pedodonție | Duo Dent',
    seoDescription:
      'Detalii despre serviciul de urgență pentru copii în cadrul pedodonției Duo Dent, disponibil în Valea Călugărească.',
  },

  'pedodontie:igienizare': {
    excerpt:
      'Serviciu de igienizare dedicat copiilor, prezentat într-un format clar și ușor de parcurs.',
    articleIntro:
      'Igienizare face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu este inclus în pedodonție și este adaptat vârstei copilului, nivelului de cooperare și particularităților clinice observate în cabinet.',
          'Scopul lui este să ofere o îngrijire potrivită pentru etapa de dezvoltare a copilului și să susțină menținerea unei igiene orale corecte.',
        ],
      },
      {
        title: 'În ce situații poate fi util',
        content: [
          'Poate fi util ca parte a controalelor periodice sau atunci când medicul recomandă o etapă de igienizare adaptată copilului.',
          'Recomandarea exactă și ritmul controalelor se stabilesc individual, în funcție de contextul clinic.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 150 RON. În cazul copiilor, experiența în cabinet și modul de etapizare a tratamentului sunt importante.',
        ],
      },
    ],
    seoTitle: 'Igienizare copii | Duo Dent',
    seoDescription:
      'Detalii despre igienizare pentru copii în cadrul serviciilor de pedodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'pedodontie:drenaj-endo': {
    excerpt:
      'Serviciu dedicat stomatologiei pentru copii, prezentat clar pentru o orientare mai ușoară în pagină.',
    articleIntro:
      'Drenaj endo face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu este inclus în pedodonție și se adresează copiilor, în contextul unei evaluări și abordări adaptate vârstei și situației clinice.',
          'Conduita exactă se stabilește în cabinet, după examinare și în funcție de obiectivul terapeutic.',
        ],
      },
      {
        title: 'În ce situații poate fi util',
        content: [
          'Poate fi util în anumite situații clinice care necesită intervenție în zona endodontică pediatrică, însă recomandarea exactă aparține medicului.',
          'Tratamentul este planificat cu atenție, astfel încât experiența copilului în cabinet să rămână cât mai clară și previzibilă.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 150 RON. În pedodonție, etapele tratamentului se stabilesc individual, în funcție de copil și de nevoile clinice.',
        ],
      },
    ],
    seoTitle: 'Drenaj endo copii | Duo Dent',
    seoDescription:
      'Detalii despre drenaj endo pentru copii în cadrul serviciilor de pedodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'pedodontie:fluorizare-topica': {
    excerpt:
      'Serviciu dedicat copiilor, prezentat clar pentru o orientare mai ușoară înainte de programare.',
    articleIntro:
      'Fluorizare topică face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Fluorizarea topică este inclusă în pedodonție și este abordată în funcție de vârsta copilului, de starea dentiției și de recomandarea medicului.',
          'Scopul acestei pagini este să ofere părinților o orientare clară, fără a înlocui evaluarea din cabinet.',
        ],
      },
      {
        title: 'În ce situații poate fi utilă',
        content: [
          'Poate fi utilă în cadrul controalelor periodice sau ca parte a recomandărilor de prevenție stabilite de medic.',
          'Necesitatea și ritmul acestor etape se stabilesc individual, în funcție de contextul clinic.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 150 RON. În stomatologia pentru copii, prevenția și monitorizarea periodică au un rol important.',
        ],
      },
    ],
    seoTitle: 'Fluorizare topică copii | Duo Dent',
    seoDescription:
      'Detalii despre fluorizare topică pentru copii în cadrul serviciilor de pedodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'pedodontie:sigilare-dinte-temporar': {
    excerpt:
      'Serviciu dedicat stomatologiei pentru copii, prezentat într-un format clar și ușor de parcurs.',
    articleIntro:
      'Sigilare dinte temporar face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu este inclus în pedodonție și se adresează copiilor, în funcție de vârstă, starea dentiției și recomandarea medicului.',
          'Pagina are rolul de a oferi părinților un reper clar despre serviciu și despre modul în care el se poate integra în monitorizarea copilului.',
        ],
      },
      {
        title: 'În ce situații poate fi util',
        content: [
          'Poate fi util în anumite situații de prevenție, atunci când medicul consideră că este potrivit pentru dentiția temporară.',
          'Recomandarea exactă se stabilește în cabinet, după evaluare și în funcție de particularitățile fiecărui caz.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 100 RON. Etapele preventive la copii se recomandă individual, în funcție de situația clinică.',
        ],
      },
    ],
    seoTitle: 'Sigilare dinte temporar | Duo Dent',
    seoDescription:
      'Detalii despre sigilare dinte temporar în cadrul serviciilor de pedodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'pedodontie:sigilare-dinte-permanent': {
    excerpt:
      'Serviciu dedicat copiilor, explicat clar pentru o orientare mai ușoară înainte de programare.',
    articleIntro:
      'Sigilare dinte permanent face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu este inclus în pedodonție și este recomandat în funcție de vârsta copilului, etapa de dezvoltare și evaluarea realizată de medic.',
          'Rolul lui este de a susține măsurile preventive și de a oferi o protecție suplimentară atunci când cazul o justifică.',
        ],
      },
      {
        title: 'În ce situații poate fi util',
        content: [
          'Poate fi util ca parte a strategiei de prevenție recomandate de medic pentru dentiția permanentă la copil.',
          'Indicația exactă se stabilește în cabinet, după analiza situației clinice și a nevoilor individuale.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 200 RON. Monitorizarea periodică rămâne importantă și după etapele preventive.',
        ],
      },
    ],
    seoTitle: 'Sigilare dinte permanent | Duo Dent',
    seoDescription:
      'Detalii despre sigilare dinte permanent în cadrul serviciilor de pedodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'pedodontie:tratament-endo-dinti-temporari': {
    excerpt:
      'Serviciu dedicat stomatologiei pentru copii, prezentat clar pentru o înțelegere mai ușoară a rolului lui în tratament.',
    articleIntro:
      'Tratament endo dinți temporari face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu se adresează copiilor și este integrat în pedodonție, unde tratamentele sunt adaptate vârstei și situației clinice.',
          'Planul exact se stabilește după evaluarea copilului, în funcție de dintele implicat și de obiectivul terapeutic.',
        ],
      },
      {
        title: 'În ce situații poate fi util',
        content: [
          'Poate fi util atunci când medicul consideră că este nevoie de o etapă endodontică pentru un dinte temporar.',
          'Recomandarea exactă se stabilește individual, în funcție de examenul clinic și de evoluția cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 200 RON. În pedodonție, tratamentul este etapizat atent, în funcție de cooperarea copilului și de nevoile clinice.',
        ],
      },
    ],
    seoTitle: 'Tratament endo dinți temporari | Duo Dent',
    seoDescription:
      'Detalii despre tratament endodontic pentru dinți temporari în cadrul serviciilor de pedodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'pedodontie:obturatie-cis': {
    excerpt:
      'Serviciu dedicat copiilor, prezentat clar pentru o orientare mai ușoară în opțiunile disponibile.',
    articleIntro:
      'Obturație CIS face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie o soluție de restaurare utilizată în pedodonție, în funcție de recomandarea medicului și de situația clinică a copilului.',
          'Alegerea exactă se stabilește în cabinet, după evaluare și în funcție de obiectivul tratamentului.',
        ],
      },
      {
        title: 'În ce situații poate fi utilă',
        content: [
          'Poate fi utilă în anumite tratamente din stomatologia pediatrică, atunci când medicul consideră că este potrivită pentru cazul respectiv.',
          'Indicația finală depinde de vârstă, cooperare și de particularitățile clinice observate.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 200 RON. Etapele de tratament la copii sunt adaptate individual pentru fiecare caz.',
        ],
      },
    ],
    seoTitle: 'Obturație CIS | Duo Dent',
    seoDescription:
      'Detalii despre obturație CIS în cadrul serviciilor de pedodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'pedodontie:obturatie-irm': {
    excerpt:
      'Serviciu dedicat stomatologiei pentru copii, explicat clar pentru o orientare mai ușoară înainte de programare.',
    articleIntro:
      'Obturație IRM face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie o soluție de restaurare utilizată în pedodonție, recomandată de medic în funcție de particularitățile cazului.',
          'Rolul ei exact se stabilește în cabinet, după evaluare și în contextul planului de tratament pentru copil.',
        ],
      },
      {
        title: 'În ce situații poate fi utilă',
        content: [
          'Poate fi utilă în anumite tratamente specifice stomatologiei pediatrice, atunci când medicul consideră această etapă potrivită.',
          'Nu toate cazurile urmează aceleași soluții, iar tratamentul este adaptat individual.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 150 RON. Ritmul tratamentului la copii se stabilește atent, în funcție de contextul clinic și de cooperare.',
        ],
      },
    ],
    seoTitle: 'Obturație IRM | Duo Dent',
    seoDescription:
      'Detalii despre obturație IRM în cadrul serviciilor de pedodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'pedodontie:obturatie-compozit-foto': {
    excerpt:
      'Serviciu dedicat copiilor, prezentat clar pentru o înțelegere mai ușoară a opțiunilor de tratament.',
    articleIntro:
      'Obturație compozit foto face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie o soluție de restaurare utilizată în stomatologia pediatrică, în funcție de recomandarea medicului și de situația dintelui.',
          'Alegerea tratamentului se face individual, după examinare și în funcție de obiectivul clinic urmărit.',
        ],
      },
      {
        title: 'În ce situații poate fi utilă',
        content: [
          'Poate fi utilă în anumite cazuri în care medicul recomandă o refacere adaptată contextului clinic al copilului.',
          'Tratamentul nu se stabilește doar după denumirea serviciului, ci după evaluarea completă realizată în cabinet.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 250 RON. În pedodonție, tratamentul este întotdeauna adaptat vârstei și nevoilor copilului.',
        ],
      },
    ],
    seoTitle: 'Obturație compozit foto | Duo Dent',
    seoDescription:
      'Detalii despre obturație compozit foto în cadrul serviciilor de pedodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'pedodontie:extractie-dinte-temporar-cu-anestezie-topica': {
    excerpt:
      'Serviciu dedicat copiilor, prezentat clar pentru o orientare mai ușoară înainte de programare.',
    articleIntro:
      'Extracție dinte temporar cu anestezie topică face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu aparține stomatologiei pentru copii și este abordat în funcție de vârstă, cooperare și situația clinică observată la consultație.',
          'Modul exact de intervenție este stabilit de medic, în funcție de nevoile copilului și de contextul clinic.',
        ],
      },
      {
        title: 'În ce situații poate fi util',
        content: [
          'Poate fi util atunci când medicul recomandă extracția unui dinte temporar și consideră această abordare potrivită pentru caz.',
          'Decizia finală se ia după evaluarea clinică și după discuția cu părintele sau aparținătorul.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 100 RON. În pedodonție, confortul copilului și modul de etapizare a tratamentului sunt esențiale.',
        ],
      },
    ],
    seoTitle: 'Extracție dinte temporar cu anestezie topică | Duo Dent',
    seoDescription:
      'Detalii despre extracție dinte temporar cu anestezie topică în cadrul serviciilor de pedodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'pedodontie:extractie-dinte-temporar-cu-anestezie-prin-infiltratie': {
    excerpt:
      'Serviciu dedicat copiilor, prezentat într-un format clar și ușor de parcurs.',
    articleIntro:
      'Extracție dinte temporar cu anestezie prin infiltrație face parte din serviciile Duo Dent din zona de pedodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu este inclus în stomatologia pentru copii și este recomandat de medic în funcție de contextul clinic și de nevoile copilului.',
          'Abordarea exactă este stabilită în cabinet, după evaluare și în funcție de particularitățile fiecărui caz.',
        ],
      },
      {
        title: 'În ce situații poate fi util',
        content: [
          'Poate fi util atunci când extracția unui dinte temporar este recomandată și medicul consideră potrivită această variantă de lucru.',
          'Planul final este stabilit individual, în funcție de vârstă, cooperare și obiectivul tratamentului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 150 RON. În pedodonție, fiecare etapă este adaptată pentru a susține o experiență cât mai clară și echilibrată în cabinet.',
        ],
      },
    ],
    seoTitle: 'Extracție dinte temporar cu anestezie prin infiltrație | Duo Dent',
    seoDescription:
      'Detalii despre extracție dinte temporar cu anestezie prin infiltrație în cadrul serviciilor de pedodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'ortodontie:consultatie-ortodontica-de-specialitate-amprente-pentru-modele-de-studiu': {
    excerpt:
      'Serviciu de evaluare ortodontică, prezentat clar pentru o înțelegere mai ușoară a pașilor inițiali.',
    articleIntro:
      'Consultație ortodontică de specialitate (amprente pentru modele de studiu) face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această consultație face parte din evaluarea ortodontică și poate include analiza cazului, discuția despre opțiuni și pregătirea etapelor necesare pentru înțelegerea situației clinice.',
          'Rolul ei este să ofere o bază clară pentru planificarea tratamentului ortodontic, atunci când cazul o impune.',
        ],
      },
      {
        title: 'Cum se integrează în plan',
        content: [
          'Această etapă poate sta la baza unui plan ortodontic și ajută la organizarea clară a pașilor următori.',
          'Recomandarea finală și structura tratamentului se stabilesc după evaluarea de specialitate.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 300 RON. În ortodonție, evaluarea inițială are un rol important în stabilirea tratamentului potrivit.',
        ],
      },
    ],
    seoTitle:
      'Consultație ortodontică de specialitate (amprente pentru modele de studiu) | Duo Dent',
    seoDescription:
      'Detalii despre consultație ortodontică de specialitate cu amprente pentru modele de studiu în cadrul Duo Dent, disponibilă în Valea Călugărească.',
  },

  'ortodontie:plan-de-tratament': {
    excerpt:
      'Serviciu din zona ortodonției, explicat clar pentru o orientare mai ușoară în etapele tratamentului.',
    articleIntro:
      'Plan de tratament face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Planul de tratament reprezintă cadrul în care sunt organizate etapele ortodontice recomandate pentru un anumit caz.',
          'El transformă evaluarea de specialitate într-o structură clară, ușor de înțeles, care ajută pacientul să știe care sunt pașii următori.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Această etapă apare după evaluarea ortodontică și ajută la stabilirea ordinii etapelor, a obiectivelor și a ritmului de monitorizare.',
          'Planul final este întotdeauna personalizat, în funcție de particularitățile cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 200 RON. În ortodonție, claritatea planului de tratament are un rol important în buna desfășurare a etapelor următoare.',
        ],
      },
    ],
    seoTitle: 'Plan de tratament ortodontic | Duo Dent',
    seoDescription:
      'Detalii despre planul de tratament ortodontic în cadrul Duo Dent, disponibil în Valea Călugărească.',
  },

  'ortodontie:aparat-ortodontic-fix-metalic-arcada': {
    excerpt:
      'Serviciu din zona ortodonției, prezentat clar pentru o înțelegere mai ușoară a tratamentului.',
    articleIntro:
      'Aparat ortodontic fix metalic / arcadă face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar această opțiune, unde este disponibilă și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie o opțiune de tratament ortodontic fix, recomandată în funcție de evaluarea de specialitate și de obiectivele urmărite.',
          'Alegerea aparatului și a etapelor asociate se stabilește individual, în funcție de particularitățile cazului.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Tratamentul ortodontic nu înseamnă doar aplicarea aparatului, ci și monitorizarea periodică și ajustările necesare pe parcurs.',
          'Planul complet se stabilește după consultație și poate include etape suplimentare, în funcție de evoluția cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 2000 RON. În ortodonție, monitorizarea regulată este o parte esențială a tratamentului.',
        ],
      },
    ],
    seoTitle: 'Aparat ortodontic fix metalic / arcadă | Duo Dent',
    seoDescription:
      'Detalii despre aparat ortodontic fix metalic pe arcadă în cadrul serviciilor Duo Dent, disponibil în Valea Călugărească.',
  },

  'ortodontie:aparat-ortodontic-ceramic-safir-arcada': {
    excerpt:
      'Serviciu din zona ortodonției, explicat clar pentru o orientare mai ușoară asupra opțiunilor disponibile.',
    articleIntro:
      'Aparat ortodontic ceramic (safir) / arcadă face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar această opțiune, unde este disponibilă și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această opțiune de tratament ortodontic este afișată separat pentru a diferenția mai clar tipurile de aparate disponibile în listă.',
          'Recomandarea ei depinde de evaluarea ortodontică, de obiectivele tratamentului și de particularitățile cazului.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Alegerea tipului de aparat este doar o parte din tratament. Pe lângă aplicare, sunt importante controalele periodice și adaptarea etapelor în funcție de evoluție.',
          'Planul complet este stabilit întotdeauna după consultația de specialitate.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 3000 RON. Costul are caracter orientativ și se interpretează în contextul planului ortodontic complet.',
        ],
      },
    ],
    seoTitle: 'Aparat ortodontic ceramic (safir) / arcadă | Duo Dent',
    seoDescription:
      'Detalii despre aparat ortodontic ceramic safir pe arcadă în cadrul serviciilor Duo Dent, disponibil în Valea Călugărească.',
  },

  'ortodontie:disjunctor': {
    excerpt:
      'Serviciu din zona ortodonției, prezentat clar pentru o înțelegere mai ușoară a rolului lui în tratament.',
    articleIntro:
      'Disjunctor face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie un dispozitiv ortodontic utilizat în anumite planuri de tratament, în funcție de diagnosticul stabilit de medic.',
          'Indicația lui exactă se stabilește după evaluarea de specialitate și după analiza particularităților cazului.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Poate face parte dintr-un plan ortodontic mai amplu, alături de alte etape de monitorizare și adaptare a tratamentului.',
          'Durata și rolul exact sunt stabilite individual, în funcție de evoluție și de obiectivele urmărite.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 1500 RON. În ortodonție, fiecare dispozitiv este recomandat în funcție de diagnosticul și planul de tratament stabilite de medic.',
        ],
      },
    ],
    seoTitle: 'Disjunctor | Duo Dent',
    seoDescription:
      'Detalii despre disjunctor în cadrul serviciilor de ortodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'ortodontie:aparat-nance': {
    excerpt:
      'Serviciu ortodontic prezentat clar pentru o orientare mai ușoară în opțiunile disponibile.',
    articleIntro:
      'Aparat Nance face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie un dispozitiv ortodontic inclus în anumite planuri de tratament, în funcție de diagnosticul stabilit de medic.',
          'Recomandarea exactă și rolul lui în tratament se stabilesc doar după consultația de specialitate.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Poate face parte dintr-o etapă ortodontică sau dintr-o strategie de ghidare a tratamentului, în funcție de particularitățile cazului.',
          'Etapele și durata sunt stabilite individual și urmărite prin controale periodice.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 1000 RON. În ortodonție, alegerea dispozitivului depinde întotdeauna de evaluarea clinică.',
        ],
      },
    ],
    seoTitle: 'Aparat Nance | Duo Dent',
    seoDescription:
      'Detalii despre aparat Nance în cadrul serviciilor de ortodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'ortodontie:headgear': {
    excerpt:
      'Serviciu ortodontic explicat clar pentru o mai bună înțelegere a rolului lui în tratament.',
    articleIntro:
      'Headgear face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie un dispozitiv ortodontic utilizat în anumite situații clinice, în funcție de diagnosticul și planul recomandat.',
          'Rolul lui exact este stabilit de medic după evaluarea de specialitate și după analiza obiectivelor tratamentului.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Poate face parte dintr-un plan ortodontic mai amplu, în care monitorizarea evoluției este la fel de importantă ca aplicarea dispozitivului.',
          'Durata și utilizarea lui sunt stabilite individual, în funcție de răspunsul clinic și de nevoile cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 800 RON. În ortodonție, recomandarea finală aparține întotdeauna evaluării de specialitate.',
        ],
      },
    ],
    seoTitle: 'Headgear | Duo Dent',
    seoDescription:
      'Detalii despre headgear în cadrul serviciilor de ortodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'ortodontie:barbita-cu-capelina': {
    excerpt:
      'Serviciu ortodontic prezentat clar pentru o orientare mai ușoară asupra etapelor de tratament.',
    articleIntro:
      'Bărbiță cu capelină face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie un dispozitiv ortodontic recomandat în anumite situații clinice, în funcție de diagnosticul și obiectivele tratamentului.',
          'Rolul lui exact se stabilește după evaluarea de specialitate și în contextul planului ortodontic complet.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Poate face parte dintr-un plan ortodontic personalizat, în care fiecare etapă este organizată în funcție de evoluția cazului.',
          'Monitorizarea regulată și adaptarea tratamentului sunt esențiale pe tot parcursul terapiei.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 600 RON. Tipul exact de tratament ortodontic se stabilește după consultația de specialitate.',
        ],
      },
    ],
    seoTitle: 'Bărbiță cu capelină | Duo Dent',
    seoDescription:
      'Detalii despre bărbiță cu capelină în cadrul serviciilor de ortodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'ortodontie:masca-faciala': {
    excerpt:
      'Serviciu ortodontic prezentat clar pentru o înțelegere mai ușoară a opțiunilor disponibile.',
    articleIntro:
      'Mască facială face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie un dispozitiv ortodontic utilizat în anumite planuri de tratament, atunci când medicul consideră că este potrivit pentru caz.',
          'Indicația exactă se stabilește în funcție de diagnosticul ortodontic și de obiectivele urmărite.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Poate face parte dintr-un plan ortodontic mai amplu, în care evoluția este monitorizată periodic și adaptată după nevoie.',
          'Succesiunea etapelor și durata tratamentului sunt stabilite individual, pentru fiecare pacient.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 1000 RON. În ortodonție, recomandarea finală depinde de evaluarea completă a cazului.',
        ],
      },
    ],
    seoTitle: 'Mască facială | Duo Dent',
    seoDescription:
      'Detalii despre mască facială în cadrul serviciilor de ortodonție Duo Dent, disponibilă în Valea Călugărească.',
  },

  'ortodontie:aparat-mio-functional': {
    excerpt:
      'Serviciu ortodontic explicat clar pentru o orientare mai ușoară înainte de programare.',
    articleIntro:
      'Aparat mio-funcțional face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie un dispozitiv ortodontic recomandat în anumite situații, în funcție de evaluarea de specialitate și de nevoile cazului.',
          'Rolul lui exact se stabilește după consultație, în cadrul unui plan ortodontic personalizat.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Poate face parte dintr-o etapă de tratament sau dintr-o strategie de ghidare a dezvoltării, în funcție de obiectivele urmărite.',
          'Durata și monitorizarea tratamentului sunt stabilite individual și urmărite în timp prin controale regulate.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 1000 RON. În ortodonție, tratamentul este planificat și adaptat în funcție de evoluția clinică.',
        ],
      },
    ],
    seoTitle: 'Aparat mio-funcțional | Duo Dent',
    seoDescription:
      'Detalii despre aparat mio-funcțional în cadrul serviciilor de ortodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'ortodontie:gutiera-de-contentie-retinere-plus-indepartare-aparat-dentar-arcada': {
    excerpt:
      'Serviciu din zona ortodonției, afișat clar pentru o înțelegere mai ușoară a etapelor finale de tratament.',
    articleIntro:
      'Gutieră de contenție/reținere + îndepărtare aparat dentar (arcadă) face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție descrie o etapă asociată finalizării tratamentului ortodontic și menținerii rezultatului obținut.',
          'Rolul ei este de a susține stabilitatea rezultatului după îndepărtarea aparatului, conform recomandării medicului.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Această etapă apare, de regulă, la finalul tratamentului ortodontic și este importantă pentru menținerea rezultatului în timp.',
          'Planul exact și indicațiile de purtare se stabilesc individual, în funcție de evoluția cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 350 RON. În ortodonție, etapa de retenție este o parte importantă a tratamentului, nu doar un pas final administrativ.',
        ],
      },
    ],
    seoTitle:
      'Gutieră de contenție/reținere + îndepărtare aparat dentar (arcadă) | Duo Dent',
    seoDescription:
      'Detalii despre gutieră de contenție și îndepărtare aparat dentar pe arcadă în cadrul serviciilor Duo Dent, disponibilă în Valea Călugărească.',
  },

  'ortodontie:control-aparat-fix': {
    excerpt:
      'Serviciu de monitorizare ortodontică, explicat clar pentru o orientare mai ușoară în etapele de tratament.',
    articleIntro:
      'Control aparat fix face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu descrie etapa de monitorizare periodică a tratamentului ortodontic cu aparat fix.',
          'În cadrul controalelor, medicul urmărește evoluția tratamentului și stabilește adaptările necesare pentru pasul următor.',
        ],
      },
      {
        title: 'De ce este important',
        content: [
          'Controalele periodice au un rol esențial în buna desfășurare a tratamentului și în menținerea direcției corecte a etapelor stabilite.',
          'Fără monitorizare regulată, tratamentul ortodontic nu poate fi urmărit corect în timp.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 200 RON. Frecvența controalelor este stabilită de medic, în funcție de planul de tratament și de evoluția cazului.',
        ],
      },
    ],
    seoTitle: 'Control aparat fix | Duo Dent',
    seoDescription:
      'Detalii despre controlul periodic pentru aparat fix în cadrul serviciilor de ortodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'ortodontie:control-aparat-mobil': {
    excerpt:
      'Serviciu de monitorizare ortodontică, prezentat clar pentru o orientare mai ușoară în pașii tratamentului.',
    articleIntro:
      'Control aparat mobil face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Acest serviciu descrie etapa de monitorizare a tratamentului ortodontic cu aparat mobil, în funcție de recomandarea medicului și de planul stabilit.',
          'În cadrul controlului, evoluția este analizată și, dacă este nevoie, tratamentul este ajustat.',
        ],
      },
      {
        title: 'De ce este important',
        content: [
          'Controalele regulate sunt importante pentru urmărirea evoluției și pentru adaptarea tratamentului în funcție de răspunsul clinic.',
          'Tratamentul ortodontic nu înseamnă doar purtarea aparatului, ci și monitorizarea atentă pe parcurs.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 100 RON. Ritmul controalelor este stabilit individual, în funcție de tratamentul recomandat.',
        ],
      },
    ],
    seoTitle: 'Control aparat mobil | Duo Dent',
    seoDescription:
      'Detalii despre controlul periodic pentru aparat mobil în cadrul serviciilor de ortodonție Duo Dent, disponibil în Valea Călugărească.',
  },

  'ortodontie:mini-implant-ortodontic': {
    excerpt:
      'Serviciu ortodontic prezentat clar pentru o înțelegere mai ușoară a etapelor posibile din tratament.',
    articleIntro:
      'Mini implant ortodontic face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Această poziție din listă descrie o etapă care poate apărea în anumite tratamente ortodontice, în funcție de planul stabilit de medic.',
          'Necesitatea ei este evaluată individual, după analiza completă a cazului și a obiectivelor terapeutice.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Poate face parte dintr-un plan ortodontic mai complex, acolo unde medicul consideră că această soluție susține mai bine evoluția tratamentului.',
          'Rolul exact și momentul în care este recomandat se stabilesc după consultație și în funcție de particularitățile cazului.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 400 RON. În ortodonție, indicația finală depinde întotdeauna de evaluarea de specialitate.',
        ],
      },
    ],
    seoTitle: 'Mini implant ortodontic | Duo Dent',
    seoDescription:
      'Detalii despre mini implant ortodontic în cadrul serviciilor Duo Dent, disponibil în Valea Călugărească.',
  },

  'ortodontie:fotografie-caz': {
    excerpt:
      'Serviciu din zona ortodonției, afișat separat pentru o înțelegere mai clară a etapelor de documentare și monitorizare.',
    articleIntro:
      'Fotografie caz face parte din serviciile Duo Dent din zona de ortodonție. Pagina are rol informativ și te ajută să înțelegi mai clar acest serviciu, unde este disponibil și care este prețul orientativ afișat în listă.',
    articleSections: [
      {
        title: 'Ce presupune',
        content: [
          'Fotografia de caz este prezentată separat pentru că poate face parte din documentarea și monitorizarea tratamentului ortodontic.',
          'Ea ajută la urmărirea evoluției și la păstrarea unei imagini clare asupra etapelor tratamentului, fără a reprezenta în sine un tratament separat.',
        ],
      },
      {
        title: 'Cum se integrează în tratament',
        content: [
          'Poate fi inclusă în evaluarea inițială sau în monitorizarea evoluției, în funcție de planul stabilit de medic.',
          'Rolul ei este de a susține documentarea corectă a cazului și urmărirea etapelor în timp.',
        ],
      },
      {
        title: 'Informații utile',
        content: [
          'Serviciul este disponibil în Valea Călugărească. În pagina principală poți vedea rapid disponibilitatea și prețul orientativ afișat pentru acest serviciu.',
          'În prezent, valoarea afișată este de 150 RON. În ortodonție, documentarea corectă a cazului contribuie la o planificare și o monitorizare mai clară.',
        ],
      },
    ],
    seoTitle: 'Fotografie caz | Duo Dent',
    seoDescription:
      'Detalii despre fotografia de caz în cadrul serviciilor de ortodonție Duo Dent, disponibilă în Valea Călugărească.',
  }, 
};

const serviceMap = new Map<string, ServiceEntry>();

for (const clinic of tariffData) {
  for (const group of getNormalizedGroups(clinic)) {
    for (const item of group.items) {
      const key = `${group.categoryId}:${item.id}`;
      const override =
        serviceContentOverrides[key] ?? serviceContentOverrides[item.id] ?? {};

      const sourceLabel = clinic.label;

      if (!serviceMap.has(key)) {
        serviceMap.set(key, {
          id: item.id,
          slug: item.id,
          categoryId: group.categoryId,
          categoryLabel: group.categoryLabel,
          title: item.label,
          sourceLabels: [sourceLabel],
          excerpt: override.excerpt,
          locations: [clinic.id],
          prices: [
            {
              locationId: clinic.id,
              priceDisplay: item.priceDisplay,
              currency: item.currency,
              sourceLabel,
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
        sourceLabel,
      });

      if (!existing.sourceLabels.includes(sourceLabel)) {
        existing.sourceLabels.push(sourceLabel);
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

