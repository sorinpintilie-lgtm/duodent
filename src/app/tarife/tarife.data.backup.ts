export type Currency = 'RON' | 'EUR';

export type TariffItem = {
  id: string;
  label: string;
  sourceLabel: string;
  priceDisplay: string;
  currency: Currency;
};

export type TariffCategory = {
  id: string;
  label: string;
  items: TariffItem[];
};

export type ClinicTariffs = {
  id: 'bucuresti' | 'belciugatele' | 'valea-calugareasca';
  label: string;
  categories: TariffCategory[];
};

export const tariffData: ClinicTariffs[] = [
  {
    id: "bucuresti",
    label: "București",
    categories: [
      {
        id: "consultatii",
        label: "Consultații",
        items: [
          {
            id: "consultatie-primara",
            label: "Consultație primară",
            sourceLabel: "Consultatie primară",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "consultatie-cu-model-de-studiu",
            label: "Consultație cu model de studiu",
            sourceLabel: "Consultatie (cu model de studiu)",
            priceDisplay: "200",
            currency: "RON"
          }
        ]
      },
      {
        id: "tratamente",
        label: "Tratamente",
        items: [
          {
            id: "anestezie",
            label: "Anestezie",
            sourceLabel: "Anestezie (include anestezia de contact)",
            priceDisplay: "40",
            currency: "RON"
          },
          {
            id: "indepartare-obturatie-coroana",
            label: "Îndepărtare obturație coroană",
            sourceLabel: "Indepartare obturatie coroana",
            priceDisplay: "50",
            currency: "RON"
          },
          {
            id: "pansament-stimulativ",
            label: "Pansament stimulativ",
            sourceLabel: "Pansament stimulativ",
            priceDisplay: "280",
            currency: "RON"
          },
          {
            id: "coafaj-direct-indirect",
            label: "Coafaj direct / indirect",
            sourceLabel: "Coafaj indirect / direct",
            priceDisplay: "50",
            currency: "RON"
          },
          {
            id: "obturatie-provizorie",
            label: "Obturație provizorie",
            sourceLabel: "Obturatie provizorie",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "pansament-calmant",
            label: "Pansament calmant",
            sourceLabel: "Pansament calmant",
            priceDisplay: "280",
            currency: "RON"
          },
          {
            id: "extirpare-devitala-fara-arsenic",
            label: "Extirpare devitală (fără arsenic)",
            sourceLabel: "Extirpare devitala (fara arsenic)",
            priceDisplay: "280",
            currency: "RON"
          },
          {
            id: "extirpare-vitala-monoradiculara",
            label: "Extirpare vitală monoradiculară",
            sourceLabel: "Extirpare vitala monoradiculara",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "extirpare-vitala-pluriradiculara",
            label: "Extirpare vitală pluriradiculară",
            sourceLabel: "Extirpare vitala pluriradiculara",
            priceDisplay: "280",
            currency: "RON"
          },
          {
            id: "obturatie-canal-monoradiculara",
            label: "Obturație canal monoradiculară",
            sourceLabel: "Obturatie canal monoradiculara",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "obturatie-canal-pluriradiculara",
            label: "Obturație canal pluriradiculară",
            sourceLabel: "Obturatie canal pluriradiculara",
            priceDisplay: "280",
            currency: "RON"
          },
          {
            id: "dezobturare-canal-per-canal",
            label: "Dezobturare canal per canal",
            sourceLabel: "Dezobturare canal per canal",
            priceDisplay: "80",
            currency: "RON"
          },
          {
            id: "obturatie-daycal-tratament-gangrena",
            label: "Obturație Daycal tratament gangrenă",
            sourceLabel: "Obturatie (Daycal) tratament gangrena",
            priceDisplay: "350",
            currency: "RON"
          },
          {
            id: "sigilare",
            label: "Sigilare",
            sourceLabel: "Sigilare",
            priceDisplay: "230",
            currency: "RON"
          },
          {
            id: "obturatie-dinti-temporari",
            label: "Obturație dinți temporari",
            sourceLabel: "Obturatie dinti temporari",
            priceDisplay: "240",
            currency: "RON"
          },
          {
            id: "obturatie-compozit-include-baza",
            label: "Obturație compozit (include baza)",
            sourceLabel: "Obturatie compozit (include baza)",
            priceDisplay: "350",
            currency: "RON"
          }
        ]
      },
      {
        id: "chirurgie-oro-maxilo-faciala",
        label: "Chirurgie oro-maxilo-facială",
        items: [
          {
            id: "extractie-dinti-temporari-parodontotici",
            label: "Extracție dinți temporari / parodontotici",
            sourceLabel: "Extractie dinti temporari / parodontotici *",
            priceDisplay: "230",
            currency: "RON"
          },
          {
            id: "extractie-dinti-monoradiculari-rest-monoradicular",
            label: "Extracție dinți monoradiculari / rest monoradicular",
            sourceLabel: "Extractie dinti monoradiculari / rest monoradicular *",
            priceDisplay: "270",
            currency: "RON"
          },
          {
            id: "extractie-dinti-pluriradiculari-rest-pluriradicular",
            label: "Extracție dinți pluriradiculari / rest pluriradicular",
            sourceLabel: "Extractie dinti pluriradiculari / rest pluriradicular *",
            priceDisplay: "290",
            currency: "RON"
          },
          {
            id: "extractie-molar-de-minte",
            label: "Extracție molar de minte",
            sourceLabel: "Extractie molar de minte *",
            priceDisplay: "340",
            currency: "RON"
          },
          {
            id: "ablatie-coroana",
            label: "Ablație coroană",
            sourceLabel: "Ablatie coroana",
            priceDisplay: "80",
            currency: "RON"
          },
          {
            id: "cimentare-glass-dinte",
            label: "Cimentare Glass / dinte",
            sourceLabel: "Cimentare Glass / dinte **",
            priceDisplay: "80",
            currency: "RON"
          },
          {
            id: "cimentare-provizorie-repin-dinte",
            label: "Cimentare provizorie Repin / dinte",
            sourceLabel: "Cimentare provizorie Repin / dinte **",
            priceDisplay: "30",
            currency: "RON"
          },
          {
            id: "refacere-coronara-cu-surub-intradentar",
            label: "Refacere coronară cu șurub intradentar",
            sourceLabel: "Refacere coronara cu surub intradentar",
            priceDisplay: "450",
            currency: "RON"
          },
          {
            id: "incizie-abces",
            label: "Incizie abces",
            sourceLabel: "Incizie abces",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "gingivectomie-excizie-polip-gingival",
            label: "Gingivectomie / excizie polip gingival",
            sourceLabel: "Gingivectomie / excizie polip gingival",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "sutura",
            label: "Sutură",
            sourceLabel: "Sutura",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "tratament-alveolita-postextractionala",
            label: "Tratament alveolită postextracțională",
            sourceLabel: "Tratament alveolita postextractionala",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "tratament-antiinflamator-gingival-dinte-antibiotic",
            label: "Tratament antiinflamator gingival / dinte (antibiotic)",
            sourceLabel: "Tratament antiinflamator gingival / dinti (antibiotic)",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "tratament-desensibilizare-include-gutiere",
            label: "Tratament desensibilizare (include gutiere)",
            sourceLabel: "Tratament desensibilizare (include gutiere)",
            priceDisplay: "450",
            currency: "RON"
          },
          {
            id: "decapusonare-molar-de-minte",
            label: "Decapusonare molar de minte",
            sourceLabel: "Decapusonare \"molar de minte\"",
            priceDisplay: "240",
            currency: "RON"
          },
          {
            id: "consultatie-specialist-chirurgie",
            label: "Consultație specialist chirurgie",
            sourceLabel: "Consultatie specialist",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "rezectie-apicala-dinti-monoradiculari",
            label: "Rezecție apicală dinți monoradiculari",
            sourceLabel: "Rezecție apicala dinti monoradiculari *",
            priceDisplay: "500",
            currency: "RON"
          },
          {
            id: "rezectie-apicala-dinti-pluriradiculari",
            label: "Rezecție apicală dinți pluriradiculari",
            sourceLabel: "Rezecție apicala dinti pluriradiculari *",
            priceDisplay: "600",
            currency: "RON"
          },
          {
            id: "extractie-molar-de-minte-semiinclus",
            label: "Extracție molar de minte semiinclus",
            sourceLabel: "Extractie molar de minte semiinclus *",
            priceDisplay: "400",
            currency: "RON"
          },
          {
            id: "extractie-molar-de-minte-inclus",
            label: "Extracție molar de minte inclus",
            sourceLabel: "Extractie molar de minte inclus *",
            priceDisplay: "500",
            currency: "RON"
          },
          {
            id: "extractie-canin-inclus",
            label: "Extracție canin inclus",
            sourceLabel: "Extractie canin inclus *",
            priceDisplay: "380",
            currency: "RON"
          },
          {
            id: "regularizare-creasta-osoasa-hemiarcada",
            label: "Regularizare creastă osoasă / hemiarcadă",
            sourceLabel: "Regularizare de creasta osoasa / hemiarcada",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "extractie-dentara-cu-alveolotomie",
            label: "Extracție dentară cu alveolotomie",
            sourceLabel: "Extractie dentara cu alveolotomie",
            priceDisplay: "280",
            currency: "RON"
          },
          {
            id: "extirpare-tumori-benigne-ale-mucoasei-orale",
            label: "Extirpare tumori benigne ale mucoasei orale",
            sourceLabel: "Extirpare tumori benigne ale mucoasei orale",
            priceDisplay: "700",
            currency: "RON"
          },
          {
            id: "sinus-lifting-extern",
            label: "Sinus lifting extern",
            sourceLabel: "Sinus lifting extern**",
            priceDisplay: "4500",
            currency: "RON"
          },
          {
            id: "sinus-lifting-intern",
            label: "Sinus lifting intern",
            sourceLabel: "Sinus lifting intern**",
            priceDisplay: "400-2000",
            currency: "RON"
          }
        ]
      },
      {
        id: "estetica-dentara",
        label: "Estetică dentară",
        items: [
          {
            id: "tratament-de-albire-a-dintilor-in-cabinet",
            label: "Tratament de albire a dinților (în cabinet)",
            sourceLabel: "Tratament de albire a dintilor (in cabinet)",
            priceDisplay: "1100",
            currency: "RON"
          },
          {
            id: "tratament-de-albire-a-dintilor-la-domiciliu",
            label: "Tratament de albire a dinților (la domiciliu)",
            sourceLabel: "Tratament de albire a dintilor (la domiciliu)",
            priceDisplay: "800",
            currency: "RON"
          },
          {
            id: "detartraj-plus-periaj-profesional-dinte",
            label: "Detartraj + periaj profesional / dinte",
            sourceLabel: "Detartraj + periaj profesional / dinte",
            priceDisplay: "20",
            currency: "RON"
          },
          {
            id: "detartraj-plus-periaj-profesional-arcada",
            label: "Detartraj + periaj profesional / arcadă",
            sourceLabel: "Detartraj + periaj profesional / arcada",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "detartraj-plus-prophyjet-arcada",
            label: "Detartraj + Prophyjet / arcadă",
            sourceLabel: "Detartraj + Prophyjet / arcada",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "prophyjet-arcada",
            label: "Prophyjet / arcadă",
            sourceLabel: "Prophyjet / arcada",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "tatuaj-dentar",
            label: "Tatuaj dentar",
            sourceLabel: "Tatuaj dentar",
            priceDisplay: "250",
            currency: "RON"
          }
        ]
      },
      {
        id: "protetica",
        label: "Protetică",
        items: [
          {
            id: "coroana-ceramica-pe-structura-de-oxid-de-zirconiu",
            label: "Coroană ceramică pe structură de oxid de zirconiu",
            sourceLabel: "Coroana ceramica pe structura de Oxid de Zirconiu",
            priceDisplay: "1000",
            currency: "RON"
          },
          {
            id: "coroana-ceramica-pe-structura-de-au-pt",
            label: "Coroană ceramică pe structură de Au-Pt",
            sourceLabel: "Coroana ceramica pe structura de Au-Pt",
            priceDisplay: "1500",
            currency: "RON"
          },
          {
            id: "coroana-ceramica-pe-structura-cr-cb",
            label: "Coroană ceramică pe structură Cr-Cb",
            sourceLabel: "Coroana ceramica pe structura Cr-Cb",
            priceDisplay: "850",
            currency: "RON"
          },
          {
            id: "coroana-acrilica-provizorie-in-cabinet",
            label: "Coroană acrilică provizorie (în cabinet)",
            sourceLabel: "Coroana acrilica provizorie (in cabinet)",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "dispozitiv-corono-radicular-cr-cb",
            label: "Dispozitiv corono-radicular Cr-Cb",
            sourceLabel: "Dispozitiv corono-radicular Cr-Cb",
            priceDisplay: "350",
            currency: "RON"
          },
          {
            id: "coroana-acrilica-provizorie-in-laborator",
            label: "Coroană acrilică provizorie (în laborator)",
            sourceLabel: "Coroana acrilica provizorie (in laborator)",
            priceDisplay: "220",
            currency: "RON"
          },
          {
            id: "proteza-acrilica",
            label: "Proteză acrilică",
            sourceLabel: "Proteza acrilica",
            priceDisplay: "2000",
            currency: "RON"
          },
          {
            id: "mentinator-de-spatiu-kemmeny",
            label: "Menținător de spațiu (Kemmeny)",
            sourceLabel: "Mentinator de spatiu (Kemmeny)",
            priceDisplay: "550",
            currency: "RON"
          },
          {
            id: "sistem-de-ancorare-complex",
            label: "Sistem de ancorare complex",
            sourceLabel: "Sistem de ancorare complex",
            priceDisplay: "400",
            currency: "RON"
          },
          {
            id: "microproteza-new-ancorvis",
            label: "Microproteză (New Ancorvis)",
            sourceLabel: "Microproteza (New Ancorvis)",
            priceDisplay: "650",
            currency: "RON"
          },
          {
            id: "inlocuire-sistem-special-capsa-culisa-buc",
            label: "Înlocuire sistem special (capsă, culisă) / buc.",
            sourceLabel: "Inlocuire sistem special (capsa, culisa) / buc.",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "gutiera-albire-arcada",
            label: "Gutieră albire (arcadă)",
            sourceLabel: "Gutiera albire (arcada)",
            priceDisplay: "170",
            currency: "RON"
          },
          {
            id: "gutiera-bruxism",
            label: "Gutieră bruxism",
            sourceLabel: "Gutiera bruxism",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "rebazare-proteza",
            label: "Rebazare proteză",
            sourceLabel: "Rebazare proteza",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "amprenta-pentru-model-de-studiu-ambele-arcade",
            label: "Amprentă pentru model de studiu (ambele arcade)",
            sourceLabel: "Amprenta pentru model de studiu (ambele arcade)",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "reparatie-proteza-acrilica",
            label: "Reparație proteză acrilică",
            sourceLabel: "Reparatie proteza acrilica",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "inlocuire-dinte-lipsa-din-proteza",
            label: "Înlocuire dinte lipsă din proteză",
            sourceLabel: "Inlocuire dinte lipsa din proteza",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "inlocuire-croset",
            label: "Înlocuire croșet",
            sourceLabel: "Inlocuire croset",
            priceDisplay: "100",
            currency: "RON"
          }
        ]
      },
      {
        id: "implantologie",
        label: "Implantologie",
        items: [
          {
            id: "consultatie-specialist-implantologie",
            label: "Consultație specialist implantologie",
            sourceLabel: "Consult specialist",
            priceDisplay: "30",
            currency: "EUR"
          },
          {
            id: "faza-chirurgicala-de-inserare-a-implantului",
            label: "Faza chirurgicală de inserare a implantului",
            sourceLabel: "Faza chirurgicala de inserare a implantului",
            priceDisplay: "500",
            currency: "EUR"
          },
          {
            id: "faza-protetica",
            label: "Faza protetică",
            sourceLabel: "Faza protetica",
            priceDisplay: "200",
            currency: "EUR"
          },
          {
            id: "element-de-agregare",
            label: "Element de agregare",
            sourceLabel: "Element de agregare",
            priceDisplay: "50-100",
            currency: "EUR"
          }
        ]
      }
    ]
  },
  {
    id: "belciugatele",
    label: "Belciugatele",
    categories: [
      {
        id: "consultatii",
        label: "Consultații",
        items: [
          {
            id: "consultatie-primara",
            label: "Consultație primară",
            sourceLabel: "Consultaţie primară",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "consultatie-cu-model-de-studiu",
            label: "Consultație cu model de studiu",
            sourceLabel: "Consultatie (cu model de studiu)",
            priceDisplay: "200",
            currency: "RON"
          }
        ]
      },
      {
        id: "tratamente",
        label: "Tratamente",
        items: [
          {
            id: "anestezie",
            label: "Anestezie",
            sourceLabel: "Anestezie (include anestezia de contact)",
            priceDisplay: "30",
            currency: "RON"
          },
          {
            id: "indepartare-obturatie-coroana",
            label: "Îndepărtare obturație coroană",
            sourceLabel: "Indepartare obturatie coroana",
            priceDisplay: "40",
            currency: "RON"
          },
          {
            id: "pansament-stimulativ",
            label: "Pansament stimulativ",
            sourceLabel: "Pansament stimulativ",
            priceDisplay: "220",
            currency: "RON"
          },
          {
            id: "coafaj-direct-indirect",
            label: "Coafaj direct / indirect",
            sourceLabel: "Coafaj indirect / direct",
            priceDisplay: "50",
            currency: "RON"
          },
          {
            id: "obturatie-provizorie",
            label: "Obturație provizorie",
            sourceLabel: "Obturatie provizorie",
            priceDisplay: "220",
            currency: "RON"
          },
          {
            id: "pansament-calmant",
            label: "Pansament calmant",
            sourceLabel: "Pansament calmant",
            priceDisplay: "220",
            currency: "RON"
          },
          {
            id: "extirpare-devitala-fara-arsenic",
            label: "Extirpare devitală (fără arsenic)",
            sourceLabel: "Extirpare devitala (fara arsenic)",
            priceDisplay: "220",
            currency: "RON"
          },
          {
            id: "extirpare-vitala-monoradiculara",
            label: "Extirpare vitală monoradiculară",
            sourceLabel: "Extirpare vitala monoradiculara",
            priceDisplay: "220",
            currency: "RON"
          },
          {
            id: "extirpare-vitala-pluriradiculara",
            label: "Extirpare vitală pluriradiculară",
            sourceLabel: "Extirpare vitala pluriradiculara",
            priceDisplay: "220",
            currency: "RON"
          },
          {
            id: "obturatie-canal-monoradiculara",
            label: "Obturație canal monoradiculară",
            sourceLabel: "Obturatie canal monoradiculara",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "obturatie-canal-pluriradiculara",
            label: "Obturație canal pluriradiculară",
            sourceLabel: "Obturatie canal pluriradiculara",
            priceDisplay: "220",
            currency: "RON"
          },
          {
            id: "dezobturare-canal-per-canal",
            label: "Dezobturare canal per canal",
            sourceLabel: "Dezobturare canal per canal",
            priceDisplay: "60",
            currency: "RON"
          },
          {
            id: "obturatie-daycal-tratament-gangrena",
            label: "Obturație Daycal tratament gangrenă",
            sourceLabel: "Obturație (Daycal) tratament gangrena",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "sigilare",
            label: "Sigilare",
            sourceLabel: "Sigilare",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "obturatie-dinti-temporari",
            label: "Obturație dinți temporari",
            sourceLabel: "Obturatie dinti temporari",
            priceDisplay: "180",
            currency: "RON"
          },
          {
            id: "obturatie-compozit-include-baza",
            label: "Obturație compozit (include baza)",
            sourceLabel: "Obturatie compozit (include baza)",
            priceDisplay: "280",
            currency: "RON"
          }
        ]
      },
      {
        id: "chirurgie-oro-maxilo-faciala",
        label: "Chirurgie oro-maxilo-facială",
        items: [
          {
            id: "extractie-dinti-temporari-parodontotici",
            label: "Extracție dinți temporari / parodontotici",
            sourceLabel: "Extractie dinti temporari / parodontotic *",
            priceDisplay: "180",
            currency: "RON"
          },
          {
            id: "extractie-dinti-monoradiculari-rest-monoradicular",
            label: "Extracție dinți monoradiculari / rest monoradicular",
            sourceLabel: "Extractie dinti monoradiculari / rest monoradicular *",
            priceDisplay: "220",
            currency: "RON"
          },
          {
            id: "extractie-dinti-pluriradiculari-rest-pluriradicular",
            label: "Extracție dinți pluriradiculari / rest pluriradicular",
            sourceLabel: "Extractie dinti pluriradiculari / rest pluriradicular *",
            priceDisplay: "240",
            currency: "RON"
          },
          {
            id: "extractie-molar-de-minte",
            label: "Extracție molar de minte",
            sourceLabel: "Extractie molar de minte *",
            priceDisplay: "320",
            currency: "RON"
          },
          {
            id: "ablatie-coroana",
            label: "Ablație coroană",
            sourceLabel: "Ablatie coroana",
            priceDisplay: "60",
            currency: "RON"
          },
          {
            id: "cimentare-adhesor-dinte",
            label: "Cimentare Adhesor / dinte",
            sourceLabel: "Cimentare Adhesor / dinte **",
            priceDisplay: "60",
            currency: "RON"
          },
          {
            id: "cimentare-glass-dinte",
            label: "Cimentare Glass / dinte",
            sourceLabel: "Cimentare Glass / dinte **",
            priceDisplay: "80",
            currency: "RON"
          },
          {
            id: "cimentare-provizorie-repin-dinte",
            label: "Cimentare provizorie Repin / dinte",
            sourceLabel: "Cimentare provizorie Repin / dinte **",
            priceDisplay: "30",
            currency: "RON"
          },
          {
            id: "refacere-coronara-cu-surub-intradentar",
            label: "Refacere coronară cu șurub intradentar",
            sourceLabel: "Refacere coronara cu surub intradentar",
            priceDisplay: "400",
            currency: "RON"
          },
          {
            id: "incizie-abces",
            label: "Incizie abces",
            sourceLabel: "Incizie abces",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "gingivectomie-excizie-polip-gingival",
            label: "Gingivectomie / excizie polip gingival",
            sourceLabel: "Gingivectomie / excizie polip gingival",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "sutura",
            label: "Sutură",
            sourceLabel: "Sutura",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "tratament-alveolita-postextractionala",
            label: "Tratament alveolită postextracțională",
            sourceLabel: "Tratament alveolita postextractionala",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "tratament-antiinflamator-gingival-dinte-antibiotic",
            label: "Tratament antiinflamator gingival / dinte (antibiotic)",
            sourceLabel: "Tratament antiinflamator gingival / dinte (antibiotic)",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "tratament-desensibilizare-include-gutiere",
            label: "Tratament desensibilizare (include gutiere)",
            sourceLabel: "Tratament desensibilizare (include gutiere)",
            priceDisplay: "450",
            currency: "RON"
          },
          {
            id: "decapusonare-molar-de-minte",
            label: "Decapusonare molar de minte",
            sourceLabel: "Decapusonare “molar de minte”",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "consultatie-specialist-chirurgie",
            label: "Consultație specialist chirurgie",
            sourceLabel: "Consultatie specialist",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "rezectie-apicala-dinti-monoradiculari",
            label: "Rezecție apicală dinți monoradiculari",
            sourceLabel: "Rezectie apicala dinti monoradiculari *",
            priceDisplay: "500",
            currency: "RON"
          },
          {
            id: "rezectie-apicala-dinti-pluriradiculari",
            label: "Rezecție apicală dinți pluriradiculari",
            sourceLabel: "Rezectie apicala dinti pluriradiculari *",
            priceDisplay: "600",
            currency: "RON"
          },
          {
            id: "extractie-molar-de-minte-semiinclus",
            label: "Extracție molar de minte semiinclus",
            sourceLabel: "Extractie molar de minte semiinclus *",
            priceDisplay: "400",
            currency: "RON"
          },
          {
            id: "extractie-molar-de-minte-inclus",
            label: "Extracție molar de minte inclus",
            sourceLabel: "Extractie molar de minte inclus *",
            priceDisplay: "500",
            currency: "RON"
          },
          {
            id: "extractie-canin-inclus",
            label: "Extracție canin inclus",
            sourceLabel: "Extractie canin inclus *",
            priceDisplay: "380",
            currency: "RON"
          },
          {
            id: "regularizare-creasta-osoasa-hemiarcada",
            label: "Regularizare creastă osoasă / hemiarcadă",
            sourceLabel: "Regularizare de creasta osoasa / hemiarcada",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "extractie-dentara-cu-alveolotomie",
            label: "Extracție dentară cu alveolotomie",
            sourceLabel: "Extractie dentara cu alveolotomie",
            priceDisplay: "280",
            currency: "RON"
          },
          {
            id: "extirpare-tumori-benigne-ale-mucoasei-orale",
            label: "Extirpare tumori benigne ale mucoasei orale",
            sourceLabel: "Extirpare tumori benigne ale mucoasei orale",
            priceDisplay: "700",
            currency: "RON"
          },
          {
            id: "sinus-lifting-intern",
            label: "Sinus lifting intern",
            sourceLabel: "Sinus lifting intern**",
            priceDisplay: "4500",
            currency: "RON"
          },
          {
            id: "sinus-lifting-extern",
            label: "Sinus lifting extern",
            sourceLabel: "Sinus lifting extern**",
            priceDisplay: "400-2000",
            currency: "RON"
          }
        ]
      },
      {
        id: "estetica-dentara",
        label: "Estetică dentară",
        items: [
          {
            id: "tratament-de-albire-a-dintilor-in-cabinet",
            label: "Tratament de albire a dinților (în cabinet)",
            sourceLabel: "Tratament de albire a dintilor (in cabinet)",
            priceDisplay: "1000",
            currency: "RON"
          },
          {
            id: "tratament-de-albire-a-dintilor-la-domiciliu",
            label: "Tratament de albire a dinților (la domiciliu)",
            sourceLabel: "Tratament de albire a dintilor (la domiciliu)",
            priceDisplay: "800",
            currency: "RON"
          },
          {
            id: "detartraj-plus-periaj-profesional-dinte",
            label: "Detartraj + periaj profesional / dinte",
            sourceLabel: "Detartraj + periaj profesional / dinte",
            priceDisplay: "50",
            currency: "RON"
          },
          {
            id: "detartraj-plus-periaj-profesional-arcada",
            label: "Detartraj + periaj profesional / arcadă",
            sourceLabel: "Detartraj + periaj professional / arcada",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "detartraj-plus-prophyjet-arcada",
            label: "Detartraj + Prophyjet / arcadă",
            sourceLabel: "Detartraj + Prophyjet / arcada",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "prophyjet-arcada",
            label: "Prophyjet / arcadă",
            sourceLabel: "Prophyjet / arcada",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "tatuaj-dentar",
            label: "Tatuaj dentar",
            sourceLabel: "Tatuaj dentar",
            priceDisplay: "250",
            currency: "RON"
          }
        ]
      },
      {
        id: "protetica",
        label: "Protetică",
        items: [
          {
            id: "coroana-ceramica-pe-structura-de-oxid-de-zirconiu",
            label: "Coroană ceramică pe structură de oxid de zirconiu",
            sourceLabel: "Coroana ceramica pe structura de Oxid de Zirconiu",
            priceDisplay: "900",
            currency: "RON"
          },
          {
            id: "coroana-ceramica-pe-structura-de-au-pt",
            label: "Coroană ceramică pe structură de Au-Pt",
            sourceLabel: "Coroana ceramica pe structura de Au-Pt",
            priceDisplay: "1500",
            currency: "RON"
          },
          {
            id: "coroana-ceramica-pe-structura-cr-cb",
            label: "Coroană ceramică pe structură Cr-Cb",
            sourceLabel: "Coroana ceramica pe structura Cr-Cb",
            priceDisplay: "720",
            currency: "RON"
          },
          {
            id: "coroana-acrilica-provizorie-in-cabinet",
            label: "Coroană acrilică provizorie (în cabinet)",
            sourceLabel: "Coroana acrilica provizorie (in cabinet)",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "dispozitiv-corono-radicular-cr-cb",
            label: "Dispozitiv corono-radicular Cr-Cb",
            sourceLabel: "Dispozitiv corono-radicular Cr-Cb",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "coroana-acrilica-provizorie-in-laborator",
            label: "Coroană acrilică provizorie (în laborator)",
            sourceLabel: "Coroana acrilica provizorie (in laborator)",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "proteza-acrilica",
            label: "Proteză acrilică",
            sourceLabel: "Proteza acrilica",
            priceDisplay: "1600",
            currency: "RON"
          },
          {
            id: "mentinator-de-spatiu-kemmeny",
            label: "Menținător de spațiu (Kemmeny)",
            sourceLabel: "Mentinator de spatiu (Kemmeny)",
            priceDisplay: "450",
            currency: "RON"
          },
          {
            id: "proteza-elastica",
            label: "Proteză elastică",
            sourceLabel: "Proteza elastica",
            priceDisplay: "2600",
            currency: "RON"
          },
          {
            id: "proteza-scheletata",
            label: "Proteză scheletată",
            sourceLabel: "Proteza scheletata",
            priceDisplay: "2000",
            currency: "RON"
          },
          {
            id: "sistem-special-capsa-culisa",
            label: "Sistem special (capsă, culisă)",
            sourceLabel: "Sistem special (capsa, culisa)",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "sistem-de-ancorare-complex",
            label: "Sistem de ancorare complex",
            sourceLabel: "Sistem de ancorare complex",
            priceDisplay: "400",
            currency: "RON"
          },
          {
            id: "microproteza-new-ancorvis",
            label: "Microproteză (New Ancorvis)",
            sourceLabel: "Microproteza (New Ancorvis)",
            priceDisplay: "600",
            currency: "RON"
          },
          {
            id: "inlocuire-sistem-special-capsa-culisa-buc",
            label: "Înlocuire sistem special (capsă, culisă) / buc.",
            sourceLabel: "Inlocuire sistem special (capsa, culisa) / buc.",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "gutiera-albire-arcada",
            label: "Gutieră albire (arcadă)",
            sourceLabel: "Gutiera albire (arcada)",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "gutiera-bruxism",
            label: "Gutieră bruxism",
            sourceLabel: "Gutiera bruxism",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "rebazare-proteza",
            label: "Rebazare proteză",
            sourceLabel: "Rebazare proteza",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "amprenta-pentru-model-de-studiu-ambele-arcade",
            label: "Amprentă pentru model de studiu (ambele arcade)",
            sourceLabel: "Amprenta pentru model de studiu (ambele arcade)",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "reparatie-proteza-acrilica",
            label: "Reparație proteză acrilică",
            sourceLabel: "Reparatie proteza acrilica",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "inlocuire-dinte-lipsa-din-proteza",
            label: "Înlocuire dinte lipsă din proteză",
            sourceLabel: "Inlocuire dinte lipsa din proteza",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "inlocuire-croset",
            label: "Înlocuire croșet",
            sourceLabel: "Inlocuire croset",
            priceDisplay: "100",
            currency: "RON"
          }
        ]
      },
      {
        id: "implantologie",
        label: "Implantologie",
        items: [
          {
            id: "consultatie-specialist-implantologie",
            label: "Consultație specialist implantologie",
            sourceLabel: "Consult specialist",
            priceDisplay: "150",
            currency: "EUR"
          },
          {
            id: "faza-chirurgicala-de-inserare-a-implantului",
            label: "Faza chirurgicală de inserare a implantului",
            sourceLabel: "Faza chirurgicala de inserare a implantului",
            priceDisplay: "450",
            currency: "EUR"
          },
          {
            id: "faza-protetica",
            label: "Faza protetică",
            sourceLabel: "Faza protetica",
            priceDisplay: "200",
            currency: "EUR"
          },
          {
            id: "element-de-agregare",
            label: "Element de agregare",
            sourceLabel: "Element de agregare",
            priceDisplay: "50-100",
            currency: "EUR"
          }
        ]
      }
    ]
  },
  {
    id: "valea-calugareasca",
    label: "Valea Călugărească",
    categories: [
      {
        id: "consultatii",
        label: "Consultații",
        items: [
          {
            id: "consultatie-primara",
            label: "Consultație primară",
            sourceLabel: "Consultație primară",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "consultatie-cu-model-de-studiu",
            label: "Consultație cu model de studiu",
            sourceLabel: "Consultație (cu model de studiu)",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "radiografie-digitala-panoramica",
            label: "Radiografie digitală panoramică",
            sourceLabel: "Radiografie digitală panoramică",
            priceDisplay: "100",
            currency: "RON"
          }
        ]
      },
      {
        id: "tratamente",
        label: "Tratamente",
        items: [
          {
            id: "anestezie",
            label: "Anestezie",
            sourceLabel: "Anestezie (include anestezia de contact)",
            priceDisplay: "40",
            currency: "RON"
          },
          {
            id: "indepartare-obturatie-coroana",
            label: "Îndepărtare obturație coroană",
            sourceLabel: "Indepartare obturatie coroana",
            priceDisplay: "50",
            currency: "RON"
          },
          {
            id: "pansament-stimulativ",
            label: "Pansament stimulativ",
            sourceLabel: "Pansament stimulativ",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "obturatie-provizorie",
            label: "Obturație provizorie",
            sourceLabel: "Obturatie provizorie",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "extirpare-devitala-fara-arsenic",
            label: "Extirpare devitală (fără arsenic)",
            sourceLabel: "Extirpare devitala (fara arsenic)",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "extirpare-vitala-monoradiculara",
            label: "Extirpare vitală monoradiculară",
            sourceLabel: "Extirpare vitala monoradiculara",
            priceDisplay: "230",
            currency: "RON"
          },
          {
            id: "extirpare-vitala-pluriradiculara",
            label: "Extirpare vitală pluriradiculară",
            sourceLabel: "Extirpare vitala pluriradiculara",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "obturatie-canal-monoradiculara",
            label: "Obturație canal monoradiculară",
            sourceLabel: "Obturatie canal monoradiculara",
            priceDisplay: "230",
            currency: "RON"
          },
          {
            id: "obturatie-canal-pluriradiculara",
            label: "Obturație canal pluriradiculară",
            sourceLabel: "Obturatie canal pluriradiculara",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "drenaj-endo",
            label: "Drenaj endo",
            sourceLabel: "Drenaj endo",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "dezobturare-canal-per-canal",
            label: "Dezobturare canal per canal",
            sourceLabel: "Dezobturare canal per canal",
            priceDisplay: "80",
            currency: "RON"
          },
          {
            id: "obturatie-cu-calciu-tratament-gangrena",
            label: "Obturație cu calciu tratament gangrenă",
            sourceLabel: "Obturație cu calciu tratament gangrene",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "sigilare",
            label: "Sigilare",
            sourceLabel: "Sigilare",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "obturatie-dinti-temporari",
            label: "Obturație dinți temporari",
            sourceLabel: "Obturatie dinti temporari",
            priceDisplay: "220",
            currency: "RON"
          },
          {
            id: "obturatie-compozit-include-baza",
            label: "Obturație compozit (include baza)",
            sourceLabel: "Obturatie compozit (include baza)",
            priceDisplay: "320",
            currency: "RON"
          },
          {
            id: "imobilizare-dentara-cu-banda-fibra-de-sticla",
            label: "Imobilizare dentară cu bandă fibră de sticlă",
            sourceLabel: "Imobilizare dentara cu banda fibra de sticla",
            priceDisplay: "480",
            currency: "RON"
          }
        ]
      },
      {
        id: "chirurgie-oro-maxilo-faciala",
        label: "Chirurgie oro-maxilo-facială",
        items: [
          {
            id: "extractie-dinti-temporari-parodontotici",
            label: "Extracție dinți temporari / parodontotici",
            sourceLabel: "Extractie dinti temporari / parodontotici*",
            priceDisplay: "220",
            currency: "RON"
          },
          {
            id: "extractie-dinti-monoradiculari-rest-monoradicular",
            label: "Extracție dinți monoradiculari / rest monoradicular",
            sourceLabel: "Extractie dinti monoradiculari / rest monoradicular*",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "extractie-dinti-pluriradiculari-rest-pluriradicular",
            label: "Extracție dinți pluriradiculari / rest pluriradicular",
            sourceLabel: "Extractie dinti pluriradiculari / rest pluriradicular*",
            priceDisplay: "270",
            currency: "RON"
          },
          {
            id: "extractie-molar-de-minte",
            label: "Extracție molar de minte",
            sourceLabel: "Extractie molar de minte*",
            priceDisplay: "320",
            currency: "RON"
          },
          {
            id: "ablatie-coroana",
            label: "Ablație coroană",
            sourceLabel: "Ablatie coroana",
            priceDisplay: "80",
            currency: "RON"
          },
          {
            id: "cimentare-glass-dinte",
            label: "Cimentare Glass / dinte",
            sourceLabel: "Cimentare Glass / dinte**",
            priceDisplay: "80",
            currency: "RON"
          },
          {
            id: "cimentare-provizorie-repin-dinte",
            label: "Cimentare provizorie Repin / dinte",
            sourceLabel: "Cimentare provizorie / dinte**",
            priceDisplay: "30",
            currency: "RON"
          },
          {
            id: "incizie-abces",
            label: "Incizie abces",
            sourceLabel: "Incizie abces",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "gingivectomie-excizie-polip-gingival",
            label: "Gingivectomie / excizie polip gingival",
            sourceLabel: "Gingivectomie / excizie polip gingival",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "sutura",
            label: "Sutură",
            sourceLabel: "Sutura extinsa",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "tratament-alveolita-postextractionala",
            label: "Tratament alveolită postextracțională",
            sourceLabel: "Tratament alveolita postextractionala",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "tratament-antiinflamator-gingival-dinte-antibiotic",
            label: "Tratament antiinflamator gingival / dinte (antibiotic)",
            sourceLabel: "Tratament antiinflamator gingival / dinte ( antibiotic )",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "tratament-desensibilizare-include-gutiere",
            label: "Tratament desensibilizare (include gutiere)",
            sourceLabel: "Tratament desensibilizare ( include gutiere )",
            priceDisplay: "450",
            currency: "RON"
          },
          {
            id: "decapusonare-molar-de-minte",
            label: "Decapusonare molar de minte",
            sourceLabel: "Decapusonare molar de minte",
            priceDisplay: "230",
            currency: "RON"
          },
          {
            id: "consultatie-specialist-chirurgie",
            label: "Consultație specialist chirurgie",
            sourceLabel: "Consultatie specialist",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "rezectie-apicala-dinti-monoradiculari",
            label: "Rezecție apicală dinți monoradiculari",
            sourceLabel: "Rezectie apicala dinti monoradiculari*",
            priceDisplay: "500",
            currency: "RON"
          },
          {
            id: "rezectie-apicala-dinti-pluriradiculari",
            label: "Rezecție apicală dinți pluriradiculari",
            sourceLabel: "Rezectie apicala dinti pluriradiculari*",
            priceDisplay: "600",
            currency: "RON"
          },
          {
            id: "extractie-molar-de-minte-semiinclus",
            label: "Extracție molar de minte semiinclus",
            sourceLabel: "Extractie molar de minte semiinclus*",
            priceDisplay: "400",
            currency: "RON"
          },
          {
            id: "extractie-molar-de-minte-inclus",
            label: "Extracție molar de minte inclus",
            sourceLabel: "Extractie molar de minte inclus*",
            priceDisplay: "500",
            currency: "RON"
          },
          {
            id: "extractie-canin-inclus",
            label: "Extracție canin inclus",
            sourceLabel: "Extractie canin inclus*",
            priceDisplay: "380",
            currency: "RON"
          },
          {
            id: "regularizare-creasta-osoasa-hemiarcada",
            label: "Regularizare creastă osoasă / hemiarcadă",
            sourceLabel: "Regularizare de creasta osoasa / hemiarcada",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "extractie-dentara-cu-alveolotomie",
            label: "Extracție dentară cu alveolotomie",
            sourceLabel: "Extractie dentara cu alveolotomie",
            priceDisplay: "280",
            currency: "RON"
          },
          {
            id: "extirpare-tumori-benigne-ale-mucoasei-orale",
            label: "Extirpare tumori benigne ale mucoasei orale",
            sourceLabel: "Extirpare tumori benigne ale mucoasei orale",
            priceDisplay: "700",
            currency: "RON"
          },
          {
            id: "sinus-lifting-intern",
            label: "Sinus lifting intern",
            sourceLabel: "Sinus lifting intern**",
            priceDisplay: "4500-5000",
            currency: "RON"
          },
          {
            id: "chistectomie",
            label: "Chistectomie",
            sourceLabel: "Chistectomie",
            priceDisplay: "1000",
            currency: "RON"
          }
        ]
      },
      {
        id: "estetica-dentara",
        label: "Estetică dentară",
        items: [
          {
            id: "tratament-de-albire-a-dintilor-in-cabinet",
            label: "Tratament de albire a dinților (în cabinet)",
            sourceLabel: "Tratament de albire a dintilor (in cabinet)",
            priceDisplay: "1100",
            currency: "RON"
          },
          {
            id: "tratament-de-albire-a-dintilor-la-domiciliu",
            label: "Tratament de albire a dinților (la domiciliu)",
            sourceLabel: "Tratament de albire a dintilor (la domiciliu)",
            priceDisplay: "800",
            currency: "RON"
          },
          {
            id: "detartraj-plus-periaj-profesional-dinte",
            label: "Detartraj + periaj profesional / dinte",
            sourceLabel: "Detartraj + periaj profesional / dinte",
            priceDisplay: "20",
            currency: "RON"
          },
          {
            id: "detartraj-plus-periaj-profesional-arcada",
            label: "Detartraj + periaj profesional / arcadă",
            sourceLabel: "Detartraj + periaj professional / arcada",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "detartraj-plus-prophyjet-arcada",
            label: "Detartraj + Prophyjet / arcadă",
            sourceLabel: "Detartraj + Prophyjet / arcada",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "prophyjet-arcada",
            label: "Prophyjet / arcadă",
            sourceLabel: "Prophyjet / arcada",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "tatuaj-dentar",
            label: "Tatuaj dentar",
            sourceLabel: "Tatuaj dentar",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "pachet-detartraj-plus-periaj-plus-prophyjet-ambele-arcade",
            label: "Pachet detartraj + periaj + Prophyjet (ambele arcade)",
            sourceLabel: "Pachet detartraj + Periaj + Prophyjet (ambele arcade)",
            priceDisplay: "400",
            currency: "RON"
          }
        ]
      },
      {
        id: "protetica",
        label: "Protetică",
        items: [
          {
            id: "coroana-ceramica-pe-structura-de-oxid-de-zirconiu",
            label: "Coroană ceramică pe structură de oxid de zirconiu",
            sourceLabel: "Coroana ceramica pe structura de Oxid de Zirconiu",
            priceDisplay: "1100",
            currency: "RON"
          },
          {
            id: "coroana-zirconiu-integral",
            label: "Coroană zirconiu integral",
            sourceLabel: "Coroana zirconiu integral",
            priceDisplay: "900",
            currency: "RON"
          },
          {
            id: "coroana-ceramica-pe-structura-cr-cb",
            label: "Coroană ceramică pe structură Cr-Cb",
            sourceLabel: "Coroana ceramica pe structura Cr-Cb",
            priceDisplay: "800",
            currency: "RON"
          },
          {
            id: "coroana-acrilica-provizorie-in-cabinet",
            label: "Coroană acrilică provizorie (în cabinet)",
            sourceLabel: "Coroana acrilica provizorie (in cabinet)",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "dispozitiv-corono-radicular-cr-cb",
            label: "Dispozitiv corono-radicular Cr-Cb",
            sourceLabel: "Dispozitiv corono-radicular Cr-Cb",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "pivot-de-sticla-cu-refacere-bont-protetic",
            label: "Pivot de sticlă cu refacere bont protetic",
            sourceLabel: "Pivot de sticla cu refacere bont protetic",
            priceDisplay: "350",
            currency: "RON"
          },
          {
            id: "coroana-acrilica-provizorie-in-laborator",
            label: "Coroană acrilică provizorie (în laborator)",
            sourceLabel: "Coroana acrilica provizorie (in laborator)",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "proteza-acrilica",
            label: "Proteză acrilică",
            sourceLabel: "Proteza acrilica",
            priceDisplay: "1800",
            currency: "RON"
          },
          {
            id: "proteza-elastica",
            label: "Proteză elastică",
            sourceLabel: "Proteza elastica",
            priceDisplay: "2600",
            currency: "RON"
          },
          {
            id: "mentinator-de-spatiu-kemmeny",
            label: "Menținător de spațiu (Kemmeny)",
            sourceLabel: "Mentinator de spatiu (Kemmeny)",
            priceDisplay: "450",
            currency: "RON"
          },
          {
            id: "proteza-scheletata",
            label: "Proteză scheletată",
            sourceLabel: "Proteza scheletata",
            priceDisplay: "2000",
            currency: "RON"
          },
          {
            id: "sistem-special-capsa-culisa",
            label: "Sistem special (capsă, culisă)",
            sourceLabel: "Sistem special (capsa, culisa)",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "sistem-de-ancorare-complex",
            label: "Sistem de ancorare complex",
            sourceLabel: "Sistem de ancorare complex",
            priceDisplay: "400",
            currency: "RON"
          },
          {
            id: "microproteza-new-ancorvis",
            label: "Microproteză (New Ancorvis)",
            sourceLabel: "Microproteza (New Ancorvis)",
            priceDisplay: "600",
            currency: "RON"
          },
          {
            id: "inlocuire-sistem-special-capsa-culisa-buc",
            label: "Înlocuire sistem special (capsă, culisă) / buc.",
            sourceLabel: "Inlocuire sistem special (capsa, culisa) / buc.",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "gutiera-albire-arcada",
            label: "Gutieră albire (arcadă)",
            sourceLabel: "Gutiera albire (arcada)",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "gutiera-bruxism",
            label: "Gutieră bruxism",
            sourceLabel: "Gutiera bruxism",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "rebazare-proteza",
            label: "Rebazare proteză",
            sourceLabel: "Rebazare proteza",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "amprenta-pentru-model-de-studiu-ambele-arcade",
            label: "Amprentă pentru model de studiu (ambele arcade)",
            sourceLabel: "Amprenta pentru model de studiu (ambele arcade)",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "reparatie-proteza-acrilica",
            label: "Reparație proteză acrilică",
            sourceLabel: "Reparatie proteza acrilica",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "inlocuire-dinte-lipsa-din-proteza",
            label: "Înlocuire dinte lipsă din proteză",
            sourceLabel: "Inlocuire dinte lipsa din proteza",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "inlocuire-croset",
            label: "Înlocuire croșet",
            sourceLabel: "Inlocuire croset",
            priceDisplay: "100",
            currency: "RON"
          }
        ]
      },
      {
        id: "endodontie",
        label: "Endodonție",
        items: [
          {
            id: "tratament-monoradicular-microscop",
            label: "Tratament monoradicular microscop",
            sourceLabel: "Tratament monoradicular microscop",
            priceDisplay: "500",
            currency: "RON"
          },
          {
            id: "tratament-pluriradicular-microscop",
            label: "Tratament pluriradicular microscop",
            sourceLabel: "Tratament pluriradicular microscop",
            priceDisplay: "650",
            currency: "RON"
          },
          {
            id: "tratament-molar-de-minte-microscop",
            label: "Tratament molar de minte microscop",
            sourceLabel: "Tratament molar de minte microscop",
            priceDisplay: "700",
            currency: "RON"
          },
          {
            id: "retratament-monoradicular-microscop",
            label: "Retratament monoradicular microscop",
            sourceLabel: "Retratament monoradicular microscop",
            priceDisplay: "650",
            currency: "RON"
          },
          {
            id: "retratament-pluriradicular-microscop",
            label: "Retratament pluriradicular microscop",
            sourceLabel: "Retratament pluriradicular microscop",
            priceDisplay: "750",
            currency: "RON"
          },
          {
            id: "aplicare-mta-perforatie-microscop",
            label: "Aplicare MTA perforație microscop",
            sourceLabel: "Aplicare MTA perforatie microscop",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "indepartare-ac-pivot-metalic-dentarus",
            label: "Îndepărtare ac / pivot metalic / dentarus",
            sourceLabel: "Indepartare ac, pivot metalic, dentarus",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "pansament-hidroxid-de-ca-per-sedinta",
            label: "Pansament hidroxid de Ca per ședință",
            sourceLabel: "Pansament hidroxid de Ca per sedinta",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "obturatie-fotopolimerizabila-dinte-devital",
            label: "Obturație fotopolimerizabilă dinte devital",
            sourceLabel: "Obturatie fotopolimerizabila dinte devital",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "obturatie-pivot-fibra-de-sticla",
            label: "Obturație pivot fibră de sticlă",
            sourceLabel: "Obturatie pivot fibra de sticla",
            priceDisplay: "350",
            currency: "RON"
          },
          {
            id: "gingivectomie-preprotetica-microscop",
            label: "Gingivectomie preprotetică microscop",
            sourceLabel: "Gingivectomie preprotetica microscop",
            priceDisplay: "150",
            currency: "RON"
          }
        ]
      },
      {
        id: "pedodontie",
        label: "Pedodonție",
        items: [
          {
            id: "urgenta",
            label: "Urgență",
            sourceLabel: "Urgenta",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "igienizare",
            label: "Igienizare",
            sourceLabel: "Igienizare",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "drenaj-endo",
            label: "Drenaj endo",
            sourceLabel: "Drenaj endo",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "fluorizare-topica",
            label: "Fluorizare topică",
            sourceLabel: "Fluorizare topica",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "sigilare-dinte-temporar",
            label: "Sigilare dinte temporar",
            sourceLabel: "Sigilare dinte temporar",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "sigilare-dinte-permanent",
            label: "Sigilare dinte permanent",
            sourceLabel: "Sigilare dinte permanent",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "tratament-endo-dinti-temporari",
            label: "Tratament endo dinți temporari",
            sourceLabel: "Tratament endo dinti temporari",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "obturatie-cis",
            label: "Obturație CIS",
            sourceLabel: "Obturatie CIS",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "obturatie-irm",
            label: "Obturație IRM",
            sourceLabel: "Obturatie IRM",
            priceDisplay: "150",
            currency: "RON"
          },
          {
            id: "obturatie-compozit-foto",
            label: "Obturație compozit foto",
            sourceLabel: "Obturatie compozit foto",
            priceDisplay: "250",
            currency: "RON"
          },
          {
            id: "extractie-dinte-temporar-cu-anestezie-topica",
            label: "Extracție dinte temporar cu anestezie topică",
            sourceLabel: "Extractie dinte temporar cu anestezie topica",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "extractie-dinte-temporar-cu-anestezie-prin-infiltratie",
            label: "Extracție dinte temporar cu anestezie prin infiltrație",
            sourceLabel: "Extractie dinte temporar cu anestezie prin infiltratie",
            priceDisplay: "150",
            currency: "RON"
          }
        ]
      },
      {
        id: "ortodontie",
        label: "Ortodonție",
        items: [
          {
            id: "consultatie-ortodontica-de-specialitate-amprente-pentru-modele-de-studiu",
            label: "Consultație ortodontică de specialitate (amprente pentru modele de studiu)",
            sourceLabel: "Consultatie ortodontică de specialitate (amprente pentru modele de studiu)",
            priceDisplay: "300",
            currency: "RON"
          },
          {
            id: "plan-de-tratament",
            label: "Plan de tratament",
            sourceLabel: "Plan de tratament",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "aparat-ortodontic-fix-metalic-arcada",
            label: "Aparat ortodontic fix metalic / arcadă",
            sourceLabel: "Aparat ortodontic fix metallic / arcada",
            priceDisplay: "2000",
            currency: "RON"
          },
          {
            id: "aparat-ortodontic-ceramic-safir-arcada",
            label: "Aparat ortodontic ceramic (safir) / arcadă",
            sourceLabel: "Aparat ortodontic ceramic (safir) / arcada",
            priceDisplay: "3000",
            currency: "RON"
          },
          {
            id: "disjunctor",
            label: "Disjunctor",
            sourceLabel: "Disjunctor",
            priceDisplay: "1500",
            currency: "RON"
          },
          {
            id: "aparat-nance",
            label: "Aparat Nance",
            sourceLabel: "Aparat Nance",
            priceDisplay: "1000",
            currency: "RON"
          },
          {
            id: "headgear",
            label: "Headgear",
            sourceLabel: "Headgear",
            priceDisplay: "800",
            currency: "RON"
          },
          {
            id: "barbita-cu-capelina",
            label: "Bărbiță cu capelină",
            sourceLabel: "Barbita cu capelina",
            priceDisplay: "600",
            currency: "RON"
          },
          {
            id: "masca-faciala",
            label: "Mască facială",
            sourceLabel: "Masca faciala",
            priceDisplay: "1000",
            currency: "RON"
          },
          {
            id: "aparat-mio-functional",
            label: "Aparat mio-funcțional",
            sourceLabel: "Aparat mio-functional",
            priceDisplay: "1000",
            currency: "RON"
          },
          {
            id: "gutiera-de-contentie-retinere-plus-indepartare-aparat-dentar-arcada",
            label: "Gutieră de contenție/reținere + îndepărtare aparat dentar (arcadă)",
            sourceLabel: "Gutiera de contentie/retinere+indepartare aparat dentar (arcada)",
            priceDisplay: "350",
            currency: "RON"
          },
          {
            id: "control-aparat-fix",
            label: "Control aparat fix",
            sourceLabel: "Control aparat fix",
            priceDisplay: "200",
            currency: "RON"
          },
          {
            id: "control-aparat-mobil",
            label: "Control aparat mobil",
            sourceLabel: "Control aparat mobil",
            priceDisplay: "100",
            currency: "RON"
          },
          {
            id: "mini-implant-ortodontic",
            label: "Mini implant ortodontic",
            sourceLabel: "Mini implant ortodontic",
            priceDisplay: "400",
            currency: "RON"
          },
          {
            id: "fotografie-caz",
            label: "Fotografie caz",
            sourceLabel: "Fotografie caz",
            priceDisplay: "150",
            currency: "RON"
          }
        ]
      },
      {
        id: "implantologie",
        label: "Implantologie",
        items: [
          {
            id: "faza-chirurgicala-de-inserare-a-implantului",
            label: "Faza chirurgicală de inserare a implantului",
            sourceLabel: "Faza chirurgicala de inserare a implantului",
            priceDisplay: "450",
            currency: "EUR"
          },
          {
            id: "faza-protetica-coroana",
            label: "Faza protetică (coroană)",
            sourceLabel: "Faza protetica (coroana)",
            priceDisplay: "200",
            currency: "EUR"
          },
          {
            id: "element-de-agregare",
            label: "Element de agregare",
            sourceLabel: "Element de agregare",
            priceDisplay: "50-100",
            currency: "EUR"
          },
          {
            id: "4-implanturi-plus-lucrare-provizorie",
            label: "4 implanturi + lucrare provizorie",
            sourceLabel: "4 implanturi + lucrare provizorie",
            priceDisplay: "12000",
            currency: "RON"
          },
          {
            id: "6-implanturi-plus-lucrare-provizorie",
            label: "6 implanturi + lucrare provizorie",
            sourceLabel: "6 implanturi + lucrare provizorie",
            priceDisplay: "15000",
            currency: "RON"
          },
          {
            id: "proteza-pe-4-implanturi-include-bonturile",
            label: "Proteză pe 4 implanturi (include bonturile)",
            sourceLabel: "Proteza pe 4 implanturi (include bonturile)",
            priceDisplay: "12500",
            currency: "RON"
          },
          {
            id: "proteza-pe-6-implanturi-include-bonturile",
            label: "Proteză pe 6 implanturi (include bonturile)",
            sourceLabel: "Proteza pe 6 implanturi (include bonturile)",
            priceDisplay: "14000",
            currency: "RON"
          },
          {
            id: "proteza-cu-capse-pe-implanturi",
            label: "Proteză cu capse pe implanturi",
            sourceLabel: "Proteza cu capse pe implanturi",
            priceDisplay: "6000",
            currency: "RON"
          }
        ]
      }
    ]
  }
] as const;

export const tariffIssues = [
  {
    type: "missing_source_rows",
    clinic: "București",
    category: "Protetică",
    details: "Între «Menținător de spațiu (Kemmeny)» și «Sistem de ancorare complex» există un gol între pozele 3 și 4. Din fotografii lipsesc cel puțin câteva rânduri din listă, deci secțiunea nu este completă."
  },
  {
    type: "internal_price_conflict",
    clinic: "Belciugatele",
    category: "Chirurgie oro-maxilo-facială",
    service: "Extracție molar de minte",
    details: "În DOC apare 320 RON în lista de extracții și 300 RON în secțiunea de chirurgie. Necesită confirmare înainte de publicare."
  },
  {
    type: "cross_source_conflict",
    clinic: "Belciugatele / București / Valea Călugărească",
    category: "Chirurgie oro-maxilo-facială",
    service: "Sinus lifting intern / extern",
    details: "Belciugatele și București au etichetele/prețurile inversate între intern și extern, iar Valea Călugărească listează doar «sinus lifting intern». Compararea directă nu este sigură fără confirmare."
  },
  {
    type: "missing_service",
    clinic: "Valea Călugărească",
    category: "Implantologie",
    service: "Consultație specialist implantologie",
    details: "Nu apare în PDF, deși există în București și Belciugatele. Poate fi într-adevăr indisponibilă sau doar neomisa din document."
  },
  {
    type: "normalization_note",
    clinic: "Toate",
    category: "Diverse",
    details: "Unele denumiri sunt apropiate, dar nu perfect identice: «Obturație (Daycal) tratament gangrenă» vs «Obturație cu calciu tratament gangrenă», «Sutură» vs «Sutură extinsă», «Faza protetică» vs «Faza protetică (coroană)». În UI este mai sigur să păstrezi etichetele exacte din sursă și să normalizezi doar pentru comparație internă."
  },
  {
    type: "content_difference",
    clinic: "Valea Călugărească vs București/Belciugatele",
    category: "Implantologie",
    details: "Valea Călugărească menționează implant Dentium și are și pachete pe implanturi în RON; București și Belciugatele menționează implant Megagen și nu listează aceste pachete."
  }
] as const;
