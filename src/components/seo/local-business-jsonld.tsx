export default function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Duo Dent",
    url: "https://duodent.ro",
    areaServed: ["București", "Belciugatele", "Valea Călugărească"],
    medicalSpecialty: "Dentistry",
    telephone: ["0731 326 536", "021 673 6730", "0769 410 728", "0711 042 920"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bd. Camil Ressu nr. 52, Bl. C16, Sc. B, Ap. 12",
      addressLocality: "București",
      addressRegion: "Sector 3",
      addressCountry: "RO",
    },
    openingHours: ["Mo,We 11:00-20:00", "Tu,Th,Fr 09:00-16:00"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}