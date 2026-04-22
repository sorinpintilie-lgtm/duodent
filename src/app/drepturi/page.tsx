export default function DrepturiPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-rounded text-4xl font-bold text-dental-heading sm:text-5xl">
          Protecția datelor tale
        </h1>
        <p className="mt-2 text-sm text-dental-text/60">Ultima actualizare: 22.04.2026</p>

        <div className="mt-10 space-y-8 text-dental-text/85">
          <section>
            <h2 className="font-rounded text-xl font-bold text-dental-heading">Dacă ne-ai contactat</h2>
            <p className="mt-3">
              Dacă ne-ai contactat prin formularul de pe site sau prin datele de contact publicate, este posibil să prelucrăm anumite date cu caracter personal pentru a răspunde solicitării tale.
            </p>
            <div className="mt-4 rounded-[20px] bg-dental-cream p-5">
              <p className="font-semibold">Operatorul datelor colectate prin site este:</p>
              <p>VISUALSKY SRL</p>
              <p>E-mail: contact@sky.ro</p>
              <p>Telefon: 0720 088 880</p>
            </div>
          </section>

          <section>
            <h2 className="font-rounded text-xl font-bold text-dental-heading">Ce drepturi ai</h2>
            <p className="mt-3">În condițiile prevăzute de lege, ai următoarele drepturi:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>dreptul de acces</li>
              <li>dreptul la rectificare</li>
              <li>dreptul la ștergere</li>
              <li>dreptul la restricționarea prelucrării</li>
              <li>dreptul la opoziție</li>
              <li>dreptul la portabilitatea datelor</li>
              <li>dreptul de a retrage consimțământul</li>
              <li>dreptul de a depune plângere la autoritatea competitivă</li>
            </ul>
          </section>

          <section>
            <h2 className="font-rounded text-xl font-bold text-dental-heading">Cum ne contactezi</h2>
            <p className="mt-3">Pentru orice solicitare privind datele tale personale, ne poți scrie la:</p>
            <p className="mt-2 font-semibold text-dental-mint">contact@sky.ro</p>
            <p className="mt-3">Vom analiza cererea și vom răspunde în termenul prevăzut de legislația aplicabilă.</p>
          </section>
        </div>
      </div>
    </main>
  );
}