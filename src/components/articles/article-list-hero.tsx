import { BookOpen, Stethoscope, Sparkles } from 'lucide-react'

export default function ArticleListHero({ count }: { count: number }) {
  return (
    <section className="relative overflow-hidden bg-dental-cream">
      <div className="mx-auto max-w-6xl px-6 pb-6 pt-28 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-dental-blueDark bg-white/80 px-4 py-2 text-sm font-semibold text-dental-heading shadow-sm backdrop-blur">
            <BookOpen size={16} />
            Materiale utile
          </span>

          <h1 className="mt-6 font-rounded text-4xl font-bold tracking-tight text-dental-heading md:text-5xl">
            Informații utile pentru pacienți, explicate clar
          </h1>

          <p className="mt-5 text-base leading-8 text-dental-text md:text-lg">
            O zonă de articole gândită pentru pacienți și construită în continuitate
            cu restul website-ului: clară, calmă, credibilă și ușor de parcurs.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-dental-heading shadow-sm">
              <Stethoscope size={16} className="text-dental-mint" />
              Articole utile pentru pacienți
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-dental-heading shadow-sm">
              <Sparkles size={16} className="text-dental-mint" />
              Actualizat periodic
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-dental-heading shadow-sm">
              <BookOpen size={16} className="text-dental-mint" />
              {count} articole publicate
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}