export type CurrencyCode = 'RON' | 'EUR';

export type TariffItem = {
  id: string;
  label: string;
  priceDisplay: string;
  currency: CurrencyCode;
};

export type TariffBlock = {
  id: string;
  label?: string;
  currencyLabel?: string;
  introLines?: string[];
  items: TariffItem[];
  notes?: string[];
};

export type TariffCategory = {
  id: string;
  label: string;
  blocks: TariffBlock[];
  notes?: string[];
};

export type ClinicTariffs = {
  id: 'bucuresti' | 'belciugatele' | 'valea-calugareasca';
  label: string;
  categories: TariffCategory[];
};

export const tariffData: ClinicTariffs[] = [
  {
    id: 'bucuresti',
    label: 'București',
    categories: [
      {
        id: 'tarife',
        label: 'Tarife',
        blocks: [
          {
            id: 'consultatii',
            currencyLabel: 'Ron',
            introLines: [
              'Include : evaluarea starii de sanatate dentara, investigatii de specialitate, elaborarea planului de tratament, evaluarea estimativa a costurilor',
            ],
            items: [
              { id: 'consultatie-primara', label: 'Consultatie primară', priceDisplay: '150', currency: 'RON' },
              { id: 'consultatie-cu-model-de-studiu', label: 'Consultatie ( cu model de studiu )', priceDisplay: '200', currency: 'RON' },
            ],
          },
          {
            id: 'tratamente',
            label: 'Tratamente',
            currencyLabel: 'Ron',
            items: [
              { id: 'anestezie', label: 'Anestezie ( include anestezia de contact )', priceDisplay: '40', currency: 'RON' },
              { id: 'indepartare-obturatie-coroana', label: 'Indepartare obturatie coroana', priceDisplay: '50', currency: 'RON' },
              { id: 'pansament-stimulativ', label: 'Pansament stimulativ', priceDisplay: '280', currency: 'RON' },
              { id: 'coafaj-indirect-direct', label: 'Coafaj indirect / direct', priceDisplay: '50', currency: 'RON' },
              { id: 'obturatie-provizorie', label: 'Obturatie provizorie', priceDisplay: '250', currency: 'RON' },
              { id: 'pansament-calmant', label: 'Pansament calmant', priceDisplay: '280', currency: 'RON' },
              { id: 'extirpare-devitala-fara-arsenic', label: 'Extirpare devitala ( fara arsenic )', priceDisplay: '280', currency: 'RON' },
              { id: 'extirpare-vitala-monoradiculara', label: 'Extirpare vitala monoradiculara', priceDisplay: '250', currency: 'RON' },
              { id: 'extirpare-vitala-pluriradiculara', label: 'Extirpare vitala pluriradiculara', priceDisplay: '280', currency: 'RON' },
              { id: 'obturatie-canal-monoradiculara', label: 'Obturatie canal monoradiculara', priceDisplay: '250', currency: 'RON' },
              { id: 'obturatie-canal-pluriradiculara', label: 'Obturatie canal pluriradiculara', priceDisplay: '280', currency: 'RON' },
              { id: 'dezobturare-canal-per-canal', label: 'Dezobturare canal per canal', priceDisplay: '80', currency: 'RON' },
              { id: 'obturatie-daycal-tratament-gangrena', label: 'Obturatie (Daycal) tratament gangrena', priceDisplay: '350', currency: 'RON' },
              { id: 'sigilare', label: 'Sigilare', priceDisplay: '230', currency: 'RON' },
              { id: 'obturatie-dinti-temporari', label: 'Obturatie dinti temporari', priceDisplay: '240', currency: 'RON' },
              { id: 'obturatie-compozit-include-baza', label: 'Obturatie compozit ( include baza )', priceDisplay: '350', currency: 'RON' },
            ],
          },
          {
            id: 'manopere-generale',
            currencyLabel: 'Ron',
            notes: [
              '* Nu include anestezia locala',
              '** Pentru lucrarile ce nu au fost executate in cabinetul nostru si pentru care nu se acorda garantie',
            ],
            items: [
              { id: 'extractie-dinti-temporari-parodontotie', label: 'Extractie dinti temporari / parodontotie *', priceDisplay: '230', currency: 'RON' },
              { id: 'extractie-dinti-monoradiculari-rest-monoradicular', label: 'Extractie dinti monoradiculari / rest monoradicular *', priceDisplay: '270', currency: 'RON' },
              { id: 'extractie-dinti-pluriradiculari-rest-pluriradicular', label: 'Extractie dinti pluriradiculari / rest pluriradicular *', priceDisplay: '290', currency: 'RON' },
              { id: 'extractie-molar-de-minte', label: 'Extractie molar de minte *', priceDisplay: '340', currency: 'RON' },
              { id: 'ablatie-coroana', label: 'Ablatie coroana', priceDisplay: '80', currency: 'RON' },
              { id: 'cimentare-glass-dinte', label: 'Cimentare Glass / dinte **', priceDisplay: '80', currency: 'RON' },
              { id: 'cimentare-provizorie-repin-dinte', label: 'Cimentare provizorie Repin / dinte **', priceDisplay: '30', currency: 'RON' },
              { id: 'refacere-coronara-cu-surub-intradentar', label: 'Refacere coronara cu surub intradentar', priceDisplay: '450', currency: 'RON' },
              { id: 'incizie-abces', label: 'Incizie abces', priceDisplay: '200', currency: 'RON' },
              { id: 'gingivectomie-excizie-polip-gingival', label: 'Gingivectomie / excizie polip gingival', priceDisplay: '200', currency: 'RON' },
              { id: 'sutura', label: 'Sutura', priceDisplay: '200', currency: 'RON' },
              { id: 'tratament-alveolita-postextractionala', label: 'Tratament alveolita postextractionala', priceDisplay: '250', currency: 'RON' },
              { id: 'tratament-antiinflamator-gingival-dinte-antibiotic', label: 'Tratament antiinflamator gingival / dinte ( antibiotic )', priceDisplay: '100', currency: 'RON' },
              { id: 'tratament-desensibilizare-include-gutiere', label: 'Tratament desensibilizare ( include gutiere )', priceDisplay: '450', currency: 'RON' },
              { id: 'decapusonare-molar-de-minte', label: 'Decapusonare “ molar de minte “', priceDisplay: '240', currency: 'RON' },
            ],
          },
        ],
        notes: [
          'Unele interventii apar si in categoria „Chirurgie oro-maxilo-faciala”. Acolo sunt listate manoperele realizate de medicul chirurg, pentru situatiile mai complicate.',
        ],
      },
      {
        id: 'estetica-dentara',
        label: 'Estetică dentară',
        blocks: [
          {
            id: 'lista-principala',
            items: [
              { id: 'tratament-de-albire-in-cabinet', label: 'Tratament de albire a dintilor ( in cabinet )', priceDisplay: '1100', currency: 'RON' },
              { id: 'tratament-de-albire-la-domiciliu', label: 'Tratament de albire a dintilor ( la domiciliu )', priceDisplay: '800', currency: 'RON' },
              { id: 'detartraj-plus-periaj-profesional-dinte', label: 'Detartraj + periaj profesional / dinte', priceDisplay: '20', currency: 'RON' },
              { id: 'detartraj-plus-periaj-profesional-arcada', label: 'Detartraj + periaj professional / arcada', priceDisplay: '200', currency: 'RON' },
              { id: 'detartraj-plus-prophyjet-arcada', label: 'Detartraj + Prophyjet / arcada', priceDisplay: '200', currency: 'RON' },
              { id: 'prophyjet-arcada', label: 'Prophyjet / arcada', priceDisplay: '150', currency: 'RON' },
              { id: 'tatuaj-dentar', label: 'Tatuaj dentar', priceDisplay: '250', currency: 'RON' },
            ],
          },
        ],
      },
      {
        id: 'protetica',
        label: 'Protetica',
        blocks: [
          {
            id: 'lista-vizibila',
            currencyLabel: 'Ron',
            items: [
              { id: 'coroana-ceramica-oxid-zirconiu', label: 'Coroana ceramica pe structura de Oxid de Zirconiu', priceDisplay: '1000', currency: 'RON' },
              { id: 'coroana-ceramica-au-pt', label: 'Coroana ceramica pe structura de Au-Pt', priceDisplay: '1500', currency: 'RON' },
              { id: 'coroana-ceramica-cr-cb', label: 'Coroana ceramica pe structura Cr-Cb', priceDisplay: '850', currency: 'RON' },
              { id: 'coroana-acrilica-provizorie-in-cabinet', label: 'Coroana acrilica provizorie ( in cabinet)', priceDisplay: '150', currency: 'RON' },
              { id: 'dispozitiv-corono-radicular-cr-cb', label: 'Dispozitiv corono-radicular Cr-Cb', priceDisplay: '350', currency: 'RON' },
              { id: 'coroana-acrilica-provizorie-in-laborator', label: 'Coroana acrilica provizorie ( in laborator)', priceDisplay: '220', currency: 'RON' },
              { id: 'proteza-acrilica', label: 'Proteza acrilica', priceDisplay: '2000', currency: 'RON' },
              { id: 'mentinator-de-spatiu-kemmeny', label: 'Mentinator de spatiu ( Kemmeny )', priceDisplay: '550', currency: 'RON' },
              { id: 'sistem-de-ancorare-complex', label: 'Sistem de ancorare complex', priceDisplay: '400', currency: 'RON' },
              { id: 'microproteza-new-ancorvis', label: 'Microproteza ( New Ancorvis )', priceDisplay: '650', currency: 'RON' },
              { id: 'inlocuire-sistem-special-capsa-culisa-buc', label: 'Inlocuire sistem special ( capsa , culisa ) / buc.', priceDisplay: '150', currency: 'RON' },
              { id: 'gutiera-albire-arcada', label: 'Gutiera albire ( arcada )', priceDisplay: '170', currency: 'RON' },
              { id: 'gutiera-bruxism', label: 'Gutiera bruxism', priceDisplay: '300', currency: 'RON' },
              { id: 'rebazare-proteza', label: 'Rebazare proteza', priceDisplay: '300', currency: 'RON' },
              { id: 'amprenta-pentru-model-de-studiu-ambele-arcade', label: 'Amprenta pentru model de studiu ( ambele arcade)', priceDisplay: '150', currency: 'RON' },
              { id: 'reparatie-proteza-acrilica', label: 'Reparatie proteza acrilica', priceDisplay: '200', currency: 'RON' },
              { id: 'inlocuire-dinte-lipsa-din-proteza', label: 'Inlocuire dinte lipsa din proteza', priceDisplay: '150', currency: 'RON' },
              { id: 'inlocuire-croset', label: 'Inlocuire croset', priceDisplay: '100', currency: 'RON' },
            ],
          },
        ],
        notes: [
          'Din pozele primite lipseste o portiune din lista dintre „Mentinator de spatiu ( Kemmeny )” si „Sistem de ancorare complex”, deci sectiunea Bucuresti / Protetica nu este completa in sursa disponibila.',
        ],
      },
      {
        id: 'chirurgie-oro-maxilo-faciala',
        label: 'Chirurgie oro-maxilo-faciala',
        blocks: [
          {
            id: 'lista-principala',
            currencyLabel: 'Ron',
            introLines: [
              'Include : consult, diagnostic, plan de tratament, etape de tratament, costuri estimative',
            ],
            notes: [
              '* manoperele includ si anestezia locala',
              '** manopera include flaconul de Bio-os plus membrana',
            ],
            items: [
              { id: 'consultatie-specialist', label: 'Consultatie specialist', priceDisplay: '150', currency: 'RON' },
              { id: 'rezectie-apicala-dinti-monoradiculari', label: 'Rezectie apicala dinti monoradiculari *', priceDisplay: '500', currency: 'RON' },
              { id: 'rezectie-apicala-dinti-pluriradiculari', label: 'Rezectie apicala dinti pluriradiculari *', priceDisplay: '600', currency: 'RON' },
              { id: 'extractie-molar-de-minte-chirurg', label: 'Extractie molar de minte *', priceDisplay: '300', currency: 'RON' },
              { id: 'extractie-molar-de-minte-semiinclus', label: 'Extractie molar de minte semiinclus *', priceDisplay: '400', currency: 'RON' },
              { id: 'extractie-molar-de-minte-inclus', label: 'Extractie molar de minte inclus *', priceDisplay: '500', currency: 'RON' },
              { id: 'extractie-canin-inclus', label: 'Extractie canin inclus *', priceDisplay: '380', currency: 'RON' },
              { id: 'regularizare-de-creasta-osoasa-hemiarcada', label: 'Regularizare de creasta osoasa / hemiarcada', priceDisplay: '300', currency: 'RON' },
              { id: 'extractie-dentara-cu-alveolotomie', label: 'Extractie dentara cu alveolotomie', priceDisplay: '280', currency: 'RON' },
              { id: 'extirpare-tumori-benigne-ale-mucoasei-orale', label: 'Extirpare tumori benigne ale mucoasei orale', priceDisplay: '700', currency: 'RON' },
              { id: 'sinus-lifting-extern', label: 'Sinus lifting extern**', priceDisplay: '4500', currency: 'RON' },
              { id: 'sinus-lifting-intern', label: 'Sinus lifting intern**', priceDisplay: '400-2000', currency: 'RON' },
            ],
          },
        ],
      },
      {
        id: 'implantologie',
        label: 'Implantologie',
        blocks: [
          {
            id: 'lista-principala',
            currencyLabel: 'Euro',
            introLines: [
              'Include : consult, diagnostic, plan de tratament, etape de tratament, costuri estimative',
              'Include : toate manoperele chirurgicale de pozitionare; implant (Megagen - Koreea de sud )',
              'Include : pozitionarea capelor de vindecare, amprentarea, bontul protetic, cimentarea lucrarii protetice .',
            ],
            notes: [
              'Preturile exprimate in Euro vor fi achitate la cursul BNR din ziua efectuarii platii.',
            ],
            items: [
              { id: 'consult-specialist', label: 'Consult specialist', priceDisplay: '30', currency: 'EUR' },
              { id: 'faza-chirurgicala-de-inserare-a-implantului', label: 'Faza chirurgicala de inserare a implantului', priceDisplay: '500', currency: 'EUR' },
              { id: 'faza-protetica', label: 'Faza protetica PROMOTIE!', priceDisplay: '200', currency: 'EUR' },
              { id: 'element-de-agregare', label: 'Element de agregare', priceDisplay: '50-100', currency: 'EUR' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'belciugatele',
    label: 'Belciugatele',
    categories: [
      {
        id: 'tarife',
        label: 'Tarife',
        blocks: [
          {
            id: 'consultatii',
            currencyLabel: 'Ron',
            introLines: [
              'Include : evaluarea starii de sanatate dentara, investigatii de specialitate, elaborarea planului de tratament, evaluarea estimativa a costurilor',
            ],
            items: [
              { id: 'consultatie-primara', label: 'Consultaţie primară', priceDisplay: '150', currency: 'RON' },
              { id: 'consultatie-cu-model-de-studiu', label: 'Consultatie ( cu model de studiu )', priceDisplay: '200', currency: 'RON' },
            ],
          },
          {
            id: 'tratamente',
            label: 'Tratamente',
            currencyLabel: 'Ron',
            items: [
              { id: 'anestezie', label: 'Anestezie ( include anestezia de contact )', priceDisplay: '30', currency: 'RON' },
              { id: 'indepartare-obturatie-coroana', label: 'Indepartare obturatie coroana', priceDisplay: '40', currency: 'RON' },
              { id: 'pansament-stimulativ', label: 'Pansament stimulativ', priceDisplay: '220', currency: 'RON' },
              { id: 'coafaj-indirect-direct', label: 'Coafaj indirect / direct', priceDisplay: '50', currency: 'RON' },
              { id: 'obturatie-provizorie', label: 'Obturatie provizorie', priceDisplay: '220', currency: 'RON' },
              { id: 'pansament-calmant', label: 'Pansament calmant', priceDisplay: '220', currency: 'RON' },
              { id: 'extirpare-devitala-fara-arsenic', label: 'Extirpare devitala ( fara arsenic )', priceDisplay: '220', currency: 'RON' },
              { id: 'extirpare-vitala-monoradiculara', label: 'Extirpare vitala monoradiculara', priceDisplay: '220', currency: 'RON' },
              { id: 'extirpare-vitala-pluriradiculara', label: 'Extirpare vitala pluriradiculara', priceDisplay: '220', currency: 'RON' },
              { id: 'obturatie-canal-monoradiculara', label: 'Obturatie canal monoradiculara', priceDisplay: '200', currency: 'RON' },
              { id: 'obturatie-canal-pluriradiculara', label: 'Obturatie canal pluriradiculara', priceDisplay: '220', currency: 'RON' },
              { id: 'dezobturare-canal-per-canal', label: 'Dezobturare canal per canal', priceDisplay: '60', currency: 'RON' },
              { id: 'obturatie-daycal-tratament-gangrena', label: 'Obturație (Daycal) tratament gangrena', priceDisplay: '250', currency: 'RON' },
              { id: 'sigilare', label: 'Sigilare', priceDisplay: '150', currency: 'RON' },
              { id: 'obturatie-dinti-temporari', label: 'Obturatie dinti temporari', priceDisplay: '180', currency: 'RON' },
              { id: 'obturatie-compozit-include-baza', label: 'Obturatie compozit (include baza)', priceDisplay: '280', currency: 'RON' },
            ],
          },
          {
            id: 'manopere-generale',
            currencyLabel: 'Ron',
            notes: [
              '* Nu include anestezia locala',
              '** Pentru lucrarile ce nu au fost executate in cabinetul nostru si pentru care nu se acorda garantie',
            ],
            items: [
              { id: 'extractie-dinti-temporari-parodontotic', label: 'Extractie dinti temporari / parodontotic *', priceDisplay: '180', currency: 'RON' },
              { id: 'extractie-dinti-monoradiculari-rest-monoradicular', label: 'Extractie dinti monoradiculari / rest monoradicular *', priceDisplay: '220', currency: 'RON' },
              { id: 'extractie-dinti-pluriradiculari-rest-pluriradicular', label: 'Extractie dinti pluriradiculari / rest pluriradicular *', priceDisplay: '240', currency: 'RON' },
              { id: 'extractie-molar-de-minte', label: 'Extractie molar de minte *', priceDisplay: '320', currency: 'RON' },
              { id: 'ablatie-coroana', label: 'Ablatie coroana', priceDisplay: '60', currency: 'RON' },
              { id: 'cimentare-adhesor-dinte', label: 'Cimentare Adhesor / dinte **', priceDisplay: '60', currency: 'RON' },
              { id: 'cimentare-glass-dinte', label: 'Cimentare Glass / dinte **', priceDisplay: '80', currency: 'RON' },
              { id: 'cimentare-provizorie-repin-dinte', label: 'Cimentare provizorie Repin / dinte **', priceDisplay: '30', currency: 'RON' },
              { id: 'refacere-coronara-cu-surub-intradentar', label: 'Refacere coronara cu surub intradentar', priceDisplay: '400', currency: 'RON' },
              { id: 'incizie-abces', label: 'Incizie abces', priceDisplay: '200', currency: 'RON' },
              { id: 'gingivectomie-excizie-polip-gingival', label: 'Gingivectomie / excizie polip gingival', priceDisplay: '200', currency: 'RON' },
              { id: 'sutura', label: 'Sutura', priceDisplay: '200', currency: 'RON' },
              { id: 'tratament-alveolita-postextractionala', label: 'Tratament alveolita postextractionala', priceDisplay: '250', currency: 'RON' },
              { id: 'tratament-antiinflamator-gingival-dinte-antibiotic', label: 'Tratament antiinflamator gingival / dinte ( antibiotic )', priceDisplay: '100', currency: 'RON' },
              { id: 'tratament-desensibilizare-include-gutiere', label: 'Tratament desensibilizare ( include gutiere )', priceDisplay: '450', currency: 'RON' },
              { id: 'decapusonare-molar-de-minte', label: 'Decapusonare “ molar de minte “', priceDisplay: '200', currency: 'RON' },
            ],
          },
        ],
        notes: [
          'Unele interventii apar si in categoria „Chirurgie oro-maxilo-faciala”. Acolo sunt listate manoperele realizate de medicul chirurg, pentru situatiile mai complicate.',
        ],
      },
      {
        id: 'estetica-dentara',
        label: 'Estetică dentară',
        blocks: [
          {
            id: 'lista-principala',
            items: [
              { id: 'tratament-de-albire-in-cabinet', label: 'Tratament de albire a dintilor ( in cabinet )', priceDisplay: '1000', currency: 'RON' },
              { id: 'tratament-de-albire-la-domociliu', label: 'Tratament de albire a dintilor ( la domociliu )', priceDisplay: '800', currency: 'RON' },
              { id: 'detartraj-plus-periaj-profesional-dinte', label: 'Detartraj + periaj profesional / dinte', priceDisplay: '50', currency: 'RON' },
              { id: 'detartraj-plus-periaj-professional-arcada', label: 'Detartraj + periaj professional / arcada', priceDisplay: '150', currency: 'RON' },
              { id: 'detartraj-plus-prophyjet-arcada', label: 'Detartraj + Prophyjet / arcada', priceDisplay: '150', currency: 'RON' },
              { id: 'prophyjet-arcada', label: 'Prophyjet / arcada', priceDisplay: '100', currency: 'RON' },
              { id: 'tatuaj-dentar', label: 'Tatuaj dentar', priceDisplay: '250', currency: 'RON' },
            ],
          },
        ],
      },
      {
        id: 'protetica',
        label: 'Protetica',
        blocks: [
          {
            id: 'lista-principala',
            currencyLabel: 'Ron',
            items: [
              { id: 'coroana-ceramica-oxid-zirconiu', label: 'Coroana ceramica pe structura de Oxid de Zirconiu', priceDisplay: '900', currency: 'RON' },
              { id: 'coroana-ceramica-au-pt', label: 'Coroana ceramica pe structura de Au-Pt', priceDisplay: '1500', currency: 'RON' },
              { id: 'coroana-ceramica-cr-cb', label: 'Coroana ceramica pe structura Cr-Cb', priceDisplay: '720', currency: 'RON' },
              { id: 'coroana-acrilica-provizorie-in-cabinet', label: 'Coroana acrilica provizorie ( in cabinet)', priceDisplay: '100', currency: 'RON' },
              { id: 'dispozitiv-corono-radicular-cr-cb', label: 'Dispozitiv corono-radicular Cr-Cb', priceDisplay: '300', currency: 'RON' },
              { id: 'coroana-acrilica-provizorie-in-laborator', label: 'Coroana acrilica provizorie ( in laborator)', priceDisplay: '200', currency: 'RON' },
              { id: 'proteza-acrilica', label: 'Proteza acrilica', priceDisplay: '1600', currency: 'RON' },
              { id: 'mentinator-de-spatiu-kemmeny', label: 'Mentinator de spatiu ( Kemmeny )', priceDisplay: '450', currency: 'RON' },
              { id: 'proteza-elastica', label: 'Proteza elastica', priceDisplay: '2600', currency: 'RON' },
              { id: 'proteza-scheletata', label: 'Proteza scheletata', priceDisplay: '2000', currency: 'RON' },
              { id: 'sistem-special-capsa-culisa', label: 'Sistem special ( capsa, culisa )', priceDisplay: '300', currency: 'RON' },
              { id: 'sistem-de-ancorare-complex', label: 'Sistem de ancorare complex', priceDisplay: '400', currency: 'RON' },
              { id: 'microproteza-new-ancorvis', label: 'Microproteza ( New Ancorvis )', priceDisplay: '600', currency: 'RON' },
              { id: 'inlocuire-sistem-special-capsa-culisa-buc', label: 'Inlocuire sistem special ( capsa , culisa ) / buc.', priceDisplay: '100', currency: 'RON' },
              { id: 'gutiera-albire-arcada', label: 'Gutiera albire ( arcada )', priceDisplay: '150', currency: 'RON' },
              { id: 'gutiera-bruxism', label: 'Gutiera bruxism', priceDisplay: '250', currency: 'RON' },
              { id: 'rebazare-proteza', label: 'Rebazare proteza', priceDisplay: '250', currency: 'RON' },
              { id: 'amprenta-pentru-model-de-studiu-ambele-arcade', label: 'Amprenta pentru model de studiu ( ambele arcade )', priceDisplay: '150', currency: 'RON' },
              { id: 'reparatie-proteza-acrilica', label: 'Reparatie proteza acrilica', priceDisplay: '200', currency: 'RON' },
              { id: 'inlocuire-dinte-lipsa-din-proteza', label: 'Inlocuire dinte lipsa din proteza', priceDisplay: '150', currency: 'RON' },
              { id: 'inlocuire-croset', label: 'Inlocuire croset', priceDisplay: '100', currency: 'RON' },
            ],
          },
        ],
      },
      {
        id: 'chirurgie-oro-maxilo-faciala',
        label: 'Chirurgie oro-maxilo-faciala',
        blocks: [
          {
            id: 'lista-principala',
            currencyLabel: 'Ron',
            introLines: [
              'Include : consult, diagnostic, plan de tratament, etape de tratament, costuri estimative',
            ],
            notes: [
              '* manoperele includ si anestezia locala',
              '** manopera include flaconul de Bio-os plus membrana',
            ],
            items: [
              { id: 'consultatie-specialist', label: 'Consultatie specialist', priceDisplay: '150', currency: 'RON' },
              { id: 'rezectie-apicala-dinti-monoradiculari', label: 'Rezectie apicala dinti monoradiculari *', priceDisplay: '500', currency: 'RON' },
              { id: 'rezectie-apicala-dinti-pluriradiculari', label: 'Rezectie apicala dinti pluriradiculari *', priceDisplay: '600', currency: 'RON' },
              { id: 'extractie-molar-de-minte-chirurg', label: 'Extractie molar de minte *', priceDisplay: '300', currency: 'RON' },
              { id: 'extractie-molar-de-minte-semiinclus', label: 'Extractie molar de minte semiinclus *', priceDisplay: '400', currency: 'RON' },
              { id: 'extractie-molar-de-minte-inclus', label: 'Extractie molar de minte inclus *', priceDisplay: '500', currency: 'RON' },
              { id: 'extractie-canin-inclus', label: 'Extractie canin inclus *', priceDisplay: '380', currency: 'RON' },
              { id: 'regularizare-de-creasta-osoasa-hemiarcada', label: 'Regularizare de creasta osoasa / hemiarcada', priceDisplay: '300', currency: 'RON' },
              { id: 'extractie-dentara-cu-alveolotomie', label: 'Extractie dentara cu alveolotomie', priceDisplay: '280', currency: 'RON' },
              { id: 'extirpare-tumori-benigne-ale-mucoasei-orale', label: 'Extirpare tumori benigne ale mucoasei orale', priceDisplay: '700', currency: 'RON' },
              { id: 'sinus-lifting-intern', label: 'Sinus lifting intern**', priceDisplay: '4500', currency: 'RON' },
              { id: 'sinus-lifting-extern', label: 'Sinus lifting extern**', priceDisplay: '400-2000', currency: 'RON' },
            ],
          },
        ],
      },
      {
        id: 'implantologie',
        label: 'Implantologie',
        blocks: [
          {
            id: 'lista-principala',
            currencyLabel: 'Euro',
            introLines: [
              'Include : consult, diagnostic, plan de tratament, etape de tratament, costuri estimative',
              'Include : toate manoperele chirurgicale de pozitionare; implant (Megagen - Koreea de sud )',
              'Include : pozitionarea capelor de vindecare, amprentarea, bontul protetic, cimentarea lucrarii protetice .',
            ],
            notes: [
              'Preturile exprimate in Euro vor fi achitate la cursul BNR din ziua efectuarii platii.',
            ],
            items: [
              { id: 'consult-specialist', label: 'Consult specialist', priceDisplay: '150', currency: 'EUR' },
              { id: 'faza-chirurgicala-de-inserare-a-implantului', label: 'Faza chirurgicala de inserare a implantului', priceDisplay: '450', currency: 'EUR' },
              { id: 'faza-protetica', label: 'Faza protetica PROMOTIE!', priceDisplay: '200', currency: 'EUR' },
              { id: 'element-de-agregare', label: 'Element de agregare', priceDisplay: '50-100', currency: 'EUR' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'valea-calugareasca',
    label: 'Valea Călugărească',
    categories: [
      {
        id: 'tarife',
        label: 'TARIFE',
        blocks: [
          {
            id: 'consultatii',
            currencyLabel: 'RON',
            introLines: [
              '*Include : evaluarea starii de sanatate dentara, investigatii de specialitate, elaborarea planului de tratament, evaluarea estimativa a costurilor',
            ],
            items: [
              { id: 'consultatie-primara', label: 'Consultatie primară', priceDisplay: '150', currency: 'RON' },
              { id: 'consultatie-cu-model-de-studiu', label: 'Consultatie ( cu model de studiu )*', priceDisplay: '200', currency: 'RON' },
              { id: 'radiografie-digitala-panoramica', label: 'Radiografie digitala panoramica', priceDisplay: '100', currency: 'RON' },
            ],
          },
          {
            id: 'lista-principala',
            items: [
              { id: 'anestezie', label: 'Anestezie( include anestezia de contact )', priceDisplay: '40', currency: 'RON' },
              { id: 'indepartare-obturatie-coroana', label: 'Indepartare obturatie coroana', priceDisplay: '50', currency: 'RON' },
              { id: 'pansament-stimulativ', label: 'Pansament stimulativ', priceDisplay: '250', currency: 'RON' },
              { id: 'obturatie-provizorie', label: 'Obturatie provizorie', priceDisplay: '250', currency: 'RON' },
              { id: 'extirpare-devitala-fara-arsenic', label: 'Extirpare devitala (fara arsenic)', priceDisplay: '250', currency: 'RON' },
              { id: 'extirpare-vitala-monoradiculara', label: 'Extirpare vitala monoradiculara', priceDisplay: '230', currency: 'RON' },
              { id: 'extirpare-vitala-pluriradiculara', label: 'Extirpare vitala pluriradiculara', priceDisplay: '250', currency: 'RON' },
              { id: 'obturatie-canal-monoradiculara', label: 'Obturatie canal monoradiculara', priceDisplay: '230', currency: 'RON' },
              { id: 'obturatie-canal-pluriradiculara', label: 'Obturatie canal pluriradiculara', priceDisplay: '250', currency: 'RON' },
              { id: 'drenaj-endo', label: 'Drenaj endo', priceDisplay: '150', currency: 'RON' },
              { id: 'dezobturare-canal-per-canal', label: 'Dezobturare canal per canal', priceDisplay: '80', currency: 'RON' },
              { id: 'obturatie-cu-calciu-tratament-gangrene', label: 'Obturatie cu calciu tratament gangrene', priceDisplay: '300', currency: 'RON' },
              { id: 'sigilare', label: 'Sigilare', priceDisplay: '200', currency: 'RON' },
              { id: 'obturatie-dinti-temporari', label: 'Obturatie dinti temporari', priceDisplay: '220', currency: 'RON' },
              { id: 'obturatie-compozit-include-baza', label: 'Obturatie compozit (include baza)', priceDisplay: '320', currency: 'RON' },
              { id: 'imobilizare-dentara-cu-banda-fibra-de-sticla', label: 'Imobilizare dentara cu banda fibra de sticla', priceDisplay: '480', currency: 'RON' },
            ],
          },
          {
            id: 'manopere-generale',
            currencyLabel: 'RON',
            notes: [
              '*Nu include anestezia locala',
              '** Pentru lucrarile ce nu au fost executate in cabinetul nostru si pentru care nu se acorda garantie',
            ],
            items: [
              { id: 'extractie-dinti-temporari-parodontotic', label: 'Extractie dinti temporari / parodontotic*', priceDisplay: '220', currency: 'RON' },
              { id: 'extractie-dinti-monoradiculari-rest-monoradicular', label: 'Extractie dinti monoradiculari / rest monoradicular*', priceDisplay: '250', currency: 'RON' },
              { id: 'extractie-dinti-pluriradiculari-rest-pluriradicular', label: 'Extractie dinti pluriradiculari / rest pluriradicular*', priceDisplay: '270', currency: 'RON' },
              { id: 'extractie-molar-de-minte', label: 'Extractie molar de minte*', priceDisplay: '320', currency: 'RON' },
              { id: 'ablatie-coroana', label: 'Ablatie coroana', priceDisplay: '80', currency: 'RON' },
              { id: 'cimentare-glass-dinte', label: 'Cimentare Glass / dinte **', priceDisplay: '80', currency: 'RON' },
              { id: 'cimentare-provizorie-dinte', label: 'Cimentare provizorie / dinte **', priceDisplay: '30', currency: 'RON' },
              { id: 'incizie-abces', label: 'Incizie abces', priceDisplay: '200', currency: 'RON' },
              { id: 'gingivectomie-excizie-polip-gingival', label: 'Gingivectomie / excizie polip gingival', priceDisplay: '200', currency: 'RON' },
              { id: 'sutura-extensa', label: 'Sutura extensa', priceDisplay: '200', currency: 'RON' },
              { id: 'tratament-alveolita-postextractionala', label: 'Tratament alveolita postextractionala', priceDisplay: '250', currency: 'RON' },
              { id: 'tratament-antiinflamator-gingival-dinte-antibiotic', label: 'Tratament antiinflamator gingival / dinte ( antibiotic )', priceDisplay: '100', currency: 'RON' },
              { id: 'tratament-desensibilizare-include-gutiere', label: 'Tratament desensibilizare ( include gutiere )', priceDisplay: '450', currency: 'RON' },
              { id: 'decapusonare-molar-de-minte', label: 'Decapusonare molar de minte', priceDisplay: '230', currency: 'RON' },
            ],
          },
        ],
        notes: [
          'Unele interventii apar si in categoria „Chirurgie oro-maxilo-faciala”. Acolo sunt listate manoperele realizate de medicul chirurg, pentru situatiile mai complicate.',
        ],
      },
      {
        id: 'estetica-dentara',
        label: 'Estetica dentara',
        blocks: [
          {
            id: 'lista-principala',
            items: [
              { id: 'tratament-de-albire-in-cabinet', label: 'Tratament de albire a dintilor ( in cabinet )', priceDisplay: '1100', currency: 'RON' },
              { id: 'tratament-de-albire-la-domiciliu', label: 'Tratament de albire a dintilor ( la domiciliu )', priceDisplay: '800', currency: 'RON' },
              { id: 'detartraj-plus-periaj-profesional-dinte', label: 'Detartraj + periaj profesional / dinte', priceDisplay: '20', currency: 'RON' },
              { id: 'detartraj-plus-periaj-profesional-arcada', label: 'Detartraj + periaj professional / arcada', priceDisplay: '150', currency: 'RON' },
              { id: 'detartraj-plus-prophyjet-arcada', label: 'Detartraj + Prophyjet / arcada', priceDisplay: '200', currency: 'RON' },
              { id: 'prophyjet-arcada', label: 'Prophyjet / arcada', priceDisplay: '100', currency: 'RON' },
              { id: 'tatuaj-dentar', label: 'Tatuaj dentar', priceDisplay: '250', currency: 'RON' },
              { id: 'pachet-detartraj-plus-periaj-plus-prophyjet-ambele-arcade', label: 'Pachet detartraj + Periaj + Prophyjet (ambele arcade)', priceDisplay: '400', currency: 'RON' },
            ],
          },
        ],
      },
      {
        id: 'protetica',
        label: 'Protetica',
        blocks: [
          {
            id: 'lista-principala',
            currencyLabel: 'RON',
            items: [
              { id: 'coroana-ceramica-oxid-zirconiu', label: 'Coroana ceramica pe structura de Oxid de Zirconiu', priceDisplay: '1100', currency: 'RON' },
              { id: 'coroana-zirconiu-integral', label: 'Coroana zirconiu integral', priceDisplay: '900', currency: 'RON' },
              { id: 'coroana-ceramica-cr-cb', label: 'Coroana ceramica pe structura Cr-Cb', priceDisplay: '800', currency: 'RON' },
              { id: 'coroana-acrilica-provizorie-in-cabinet', label: 'Coroana acrilica provizorie ( in cabinet)', priceDisplay: '100', currency: 'RON' },
              { id: 'dispozitiv-corono-radicular-cr-cb', label: 'Dispozitiv corono-radicular Cr-Cb', priceDisplay: '300', currency: 'RON' },
              { id: 'pivot-de-sticla-cu-refacere-bont-protetic', label: 'Pivot de sticla cu refacere bont protetic', priceDisplay: '350', currency: 'RON' },
              { id: 'coroana-acrilica-provizorie-in-laborator', label: 'Coroana acrilica provizorie ( in laborator)', priceDisplay: '200', currency: 'RON' },
              { id: 'proteza-acrilica', label: 'Proteza acrilica', priceDisplay: '1800', currency: 'RON' },
              { id: 'proteza-elastica', label: 'Proteza elastica', priceDisplay: '2600', currency: 'RON' },
              { id: 'mentinator-de-spatiu-kemmeny', label: 'Mentinator de spatiu (Kemmeny)', priceDisplay: '450', currency: 'RON' },
              { id: 'proteza-scheletata', label: 'Proteza scheletata', priceDisplay: '2000', currency: 'RON' },
              { id: 'sistem-special-capsa-culisa', label: 'Sistem special ( capsa, culisa )', priceDisplay: '300', currency: 'RON' },
              { id: 'sistem-de-ancorare-complex', label: 'Sistem de ancorare complex', priceDisplay: '400', currency: 'RON' },
              { id: 'microproteza-new-ancorvis', label: 'Microproteza ( New Ancorvis )', priceDisplay: '600', currency: 'RON' },
              { id: 'inlocuire-sistem-special-capsa-culisa-buc', label: 'Inlocuire sistem special ( capsa , culisa ) / buc.', priceDisplay: '100', currency: 'RON' },
              { id: 'gutiera-albire-arcada', label: 'Gutiera albire (arcada)', priceDisplay: '150', currency: 'RON' },
              { id: 'gutiera-bruxism', label: 'Gutiera bruxism', priceDisplay: '250', currency: 'RON' },
              { id: 'rebazare-proteza', label: 'Rebazare proteza', priceDisplay: '250', currency: 'RON' },
              { id: 'amprenta-pentru-model-de-studiu-ambele-arcade', label: 'Amprenta pentru model de studiu (ambele arcade)', priceDisplay: '100', currency: 'RON' },
              { id: 'reparatie-proteza-acrilica', label: 'Reparatie proteza acrilica', priceDisplay: '150', currency: 'RON' },
              { id: 'inlocuire-dinte-lipsa-din-proteza', label: 'Inlocuire dinte lipsa din proteza', priceDisplay: '150', currency: 'RON' },
              { id: 'inlocuire-croset', label: 'Inlocuire croset', priceDisplay: '100', currency: 'RON' },
            ],
          },
        ],
      },
      {
        id: 'chirurgie-oro-maxilo-faciala',
        label: 'Chirurgie oro-maxilo-faciala',
        blocks: [
          {
            id: 'lista-principala',
            currencyLabel: 'RON',
            introLines: [
              'Include: consult, diagnostic, plan de tratament, etape de tratament, costuri estimative',
            ],
            notes: [
              '*manoperele includ si anestezia locala',
              '** manopera include flaconul de Bio-os plus membrana',
            ],
            items: [
              { id: 'consultatie-specialist', label: 'Consultatie specialist', priceDisplay: '150', currency: 'RON' },
              { id: 'rezectie-apicala-dinti-monoradiculari', label: 'Rezectie apicala dinti monoradiculari *', priceDisplay: '500', currency: 'RON' },
              { id: 'rezectie-apicala-dinti-pluriradiculari', label: 'Rezectie apicala dinti pluriradiculari *', priceDisplay: '600', currency: 'RON' },
              { id: 'extractie-molar-de-minte-chirurg', label: 'Extractie molar de minte *', priceDisplay: '360', currency: 'RON' },
              { id: 'extractie-molar-de-minte-semiinclus', label: 'Extractie molar de minte semiinclus *', priceDisplay: '400', currency: 'RON' },
              { id: 'extractie-molar-de-minte-inclus', label: 'Extractie molar de minte inclus *', priceDisplay: '500', currency: 'RON' },
              { id: 'extractie-canin-inclus', label: 'Extractie canin inclus *', priceDisplay: '380', currency: 'RON' },
              { id: 'regularizare-de-creasta-osoasa-hemiarcada', label: 'Regularizare de creasta osoasa / hemiarcada', priceDisplay: '300', currency: 'RON' },
              { id: 'extractie-dentara-cu-alveolotomie', label: 'Extractie dentara cu alveolotomie', priceDisplay: '280', currency: 'RON' },
              { id: 'extirpare-tumori-benigne-ale-mucoasei-orale', label: 'Extirpare tumori benigne ale mucoasei orale', priceDisplay: '700', currency: 'RON' },
              { id: 'sinus-lifting-intern', label: 'Sinus lifting intern**', priceDisplay: '4500-5000', currency: 'RON' },
              { id: 'chistectomie', label: 'Chistectomie', priceDisplay: '1000', currency: 'RON' },
            ],
          },
        ],
      },
      {
        id: 'endodontie',
        label: 'Endodontie',
        blocks: [
          {
            id: 'lista-principala',
            currencyLabel: 'RON',
            items: [
              { id: 'tratament-monoradicular-microscop', label: 'Tratament monoradicular microscop', priceDisplay: '500', currency: 'RON' },
              { id: 'tratament-pluriradicular-microscop', label: 'Tratament pluriradicular microscop', priceDisplay: '650', currency: 'RON' },
              { id: 'tratament-molar-de-minte-microscop', label: 'Tratament molar de minte microscop', priceDisplay: '700', currency: 'RON' },
              { id: 'retratament-monoradicular-microscop', label: 'Retratament monoradicular microscop', priceDisplay: '650', currency: 'RON' },
              { id: 'retratament-pluriradicular-microscop', label: 'Retratament pluriradicular microscop', priceDisplay: '750', currency: 'RON' },
              { id: 'aplicare-mta-perforatie-microscop', label: 'Aplicare MTA perforatie microscop', priceDisplay: '150', currency: 'RON' },
              { id: 'indepartare-ac-pivot-metalic-dentarus', label: 'Indepartare ac, pivot metallic, dentarus', priceDisplay: '200', currency: 'RON' },
              { id: 'pansament-hidroxid-de-ca-per-sedinta', label: 'Pansament hidroxid de Ca per sedinta', priceDisplay: '200', currency: 'RON' },
              { id: 'obturatie-fotopolimerizabila-dinte-devital', label: 'Obturatie fotopolimerizabila dinte devital', priceDisplay: '300', currency: 'RON' },
              { id: 'obturatie-pivot-fibra-de-sticla', label: 'Obturatie pivot fibra de sticla', priceDisplay: '350', currency: 'RON' },
              { id: 'gingivectomie-preprotetica-microscop', label: 'Gingivectomie preprotetica microscop', priceDisplay: '150', currency: 'RON' },
            ],
          },
        ],
      },
      {
        id: 'pedodontie',
        label: 'Pedodontie',
        blocks: [
          {
            id: 'lista-principala',
            currencyLabel: 'RON',
            items: [
              { id: 'urgenta', label: 'Urgenta', priceDisplay: '150', currency: 'RON' },
              { id: 'igienizare', label: 'Igienizare', priceDisplay: '150', currency: 'RON' },
              { id: 'drenaj-endo', label: 'Drenaj endo', priceDisplay: '150', currency: 'RON' },
              { id: 'fluorizare-topica', label: 'Fluorizare topica', priceDisplay: '150', currency: 'RON' },
              { id: 'sigilare-dinte-temporar', label: 'Sigilare dinte temporar', priceDisplay: '100', currency: 'RON' },
              { id: 'sigilare-dinte-permanent', label: 'Sigilare dinte permanent', priceDisplay: '200', currency: 'RON' },
              { id: 'tratament-endo-dinti-temporari', label: 'Tratament endo dinti temporari', priceDisplay: '200', currency: 'RON' },
              { id: 'obturatie-cis', label: 'Obturatie CIS', priceDisplay: '200', currency: 'RON' },
              { id: 'obturatie-irm', label: 'Obturatie IRM', priceDisplay: '150', currency: 'RON' },
              { id: 'obturatie-compozit-foto', label: 'Obturatie compozit foto', priceDisplay: '250', currency: 'RON' },
              { id: 'extractie-dinte-temporar-cu-anestezie-topica', label: 'Extractie dinte temporar cu anestezie topica', priceDisplay: '100', currency: 'RON' },
              { id: 'extractie-dinte-temporar-cu-anestezie-prin-infiltratie', label: 'Extractie dinte temporar cu anestezie prin infiltratie', priceDisplay: '150', currency: 'RON' },
            ],
          },
        ],
      },
      {
        id: 'ortodontie',
        label: 'Ortodontie',
        blocks: [
          {
            id: 'lista-principala',
            items: [
              { id: 'consultatie-ortodontica-de-specialitate', label: 'Consultatie ortodontică de specialitate (amprente pentru modele de studiu)', priceDisplay: '300', currency: 'RON' },
              { id: 'plan-de-tratament', label: 'Plan de tratament', priceDisplay: '200', currency: 'RON' },
              { id: 'aparat-ortodontic-fix-metallic-arcada', label: 'Aparat ortodontic fix metallic / arcada', priceDisplay: '2000', currency: 'RON' },
              { id: 'aparat-ortodontic-ceramic-safir-arcada', label: 'Aparat ortodontic ceramic (safir) / arcada', priceDisplay: '3000', currency: 'RON' },
              { id: 'disjunctor', label: 'Disjunctor', priceDisplay: '1500', currency: 'RON' },
              { id: 'aparat-nance', label: 'Aparat Nance', priceDisplay: '1000', currency: 'RON' },
              { id: 'headgear', label: 'Headgear', priceDisplay: '800', currency: 'RON' },
              { id: 'barbita-cu-capelina', label: 'Barbita cu capelina', priceDisplay: '600', currency: 'RON' },
              { id: 'masca-faciala', label: 'Masca faciala', priceDisplay: '1000', currency: 'RON' },
              { id: 'aparat-mio-functional', label: 'Aparat mio-functional', priceDisplay: '1000', currency: 'RON' },
              { id: 'gutiera-de-contentie-retinere-plus-indepartare-aparat-dentar-arcada', label: 'Gutiera de contentie/retinere+indepartare aparat dentar (arcada)', priceDisplay: '350', currency: 'RON' },
              { id: 'control-aparat-fix', label: 'Control aparat fix', priceDisplay: '200', currency: 'RON' },
              { id: 'control-aparat-mobil', label: 'Control aparat mobil', priceDisplay: '100', currency: 'RON' },
              { id: 'mini-implant-ortodontic', label: 'Mini implant ortodontic', priceDisplay: '400', currency: 'RON' },
              { id: 'fotografie-caz', label: 'Fotografie caz', priceDisplay: '150', currency: 'RON' },
            ],
          },
        ],
      },
      {
        id: 'implantologie',
        label: 'Implantologie',
        blocks: [
          {
            id: 'servicii-euro',
            currencyLabel: 'EUR',
            introLines: [
              'Include : toate manoperele chirurgicale de pozitionare; implant Dentium',
              'Include : pozitionarea capelor de vindecare, amprentarea, bontul protetic, cimentarea lucrarii protetice .',
            ],
            notes: [
              'Preturile exprimate in Euro vor fi achitate la cursul BNR din ziua efectuarii platii.',
            ],
            items: [
              { id: 'faza-chirurgicala-de-inserare-a-implantului', label: 'Faza chirurgicala de inserare a implantului', priceDisplay: '450', currency: 'EUR' },
              { id: 'faza-protetica-coroana', label: 'Faza protetica (coroana) PROMOTIE!', priceDisplay: '200', currency: 'EUR' },
              { id: 'element-de-agregare', label: 'Element de agregare', priceDisplay: '50-100', currency: 'EUR' },
            ],
          },
          {
            id: 'pachete-ron',
            currencyLabel: 'RON',
            items: [
              { id: '4-implanturi-plus-lucrare-provizorie', label: '4 implanturi + lucrare provizorie', priceDisplay: '12.000', currency: 'RON' },
              { id: '6-implanturi-plus-lucrare-provizorie', label: '6 implanturi + lucrare provizorie', priceDisplay: '15.000', currency: 'RON' },
              { id: 'proteza-pe-4-implanturi-include-bonturile', label: 'Proteza pe 4 implanturi (include bonturile)', priceDisplay: '12.500', currency: 'RON' },
              { id: 'proteza-pe-6-implanturi-include-bonturile', label: 'Proteza pe 6 implanturi (include bonturile)', priceDisplay: '14.000', currency: 'RON' },
              { id: 'proteza-cu-capse-pe-implanturi', label: 'Proteza cu capse pe implanturi', priceDisplay: '6.000', currency: 'RON' },
            ],
          },
        ],
      },
    ],
  },
];

export const tariffIssues = [
  {
    type: 'missing_source_rows',
    clinic: 'București',
    category: 'Protetica',
    details:
      'Din pozele primite lipseste o portiune din lista dintre „Mentinator de spatiu ( Kemmeny )” si „Sistem de ancorare complex”, deci sectiunea Bucuresti / Protetica nu este completa in sursa disponibila.',
  },
  {
    type: 'medical_context_note',
    clinic: 'Toate',
    category: 'Tarife / Chirurgie oro-maxilo-faciala',
    details:
      'Servicii cu nume apropiat sau identic pot aparea atat in categoria generala „Tarife”, cat si in „Chirurgie oro-maxilo-faciala”. Diferenta este intentionata: in a doua categorie sunt listate manoperele realizate de medicul chirurg, pentru cazurile mai complicate.',
  },
  {
    type: 'cross_source_conflict',
    clinic: 'Belciugatele / București / Valea Călugărească',
    category: 'Chirurgie oro-maxilo-faciala',
    service: 'Sinus lifting intern / extern',
    details:
      'Belciugatele si Bucuresti au etichetele / preturile inversate intre intern si extern, iar Valea Calugareasca listeaza doar „Sinus lifting intern**”. Compararea directa nu este sigura fara confirmare medicala.',
  },
] as const;
