import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'

import type { ArticleEntry } from '@/content/articles'

type Props = {
  article?: ArticleEntry
}

export default function ArticleCTA({ article }: Props) {
  const href = article?.serviceHref || '/servicii'
  const label = article?.serviceLabel || 'Vezi serviciile Duo Dent'

  return (
    <section className="rounded-[32px] border border-dental-blueDark/60 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
      <div className="flex flex-col items-center text-center">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-dental-blue px-3 py-1 text-sm font-semibold text-dental-heading">
            <CalendarDays size={14} />
            Pasul următor
          </span>

          <h2 className="mt-4 font-rounded text-3xl font-bold tracking-tight text-dental-heading">
            Dacă ai nevoie de o evaluare, cel mai util este un consult
          </h2>

          <p className="mt-3 text-base leading-8 text-dental-text">
            Articolele te pot ajuta să înțelegi mai bine un subiect, dar recomandarea
            potrivită se stabilește întotdeauna în contextul unei evaluări reale.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-dental-mint px-5 py-3 font-semibold text-white transition hover:bg-dental-mintDark"
          >
            {label}
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/servicii"
            className="inline-flex items-center justify-center rounded-full border border-dental-blueDark px-5 py-3 font-semibold text-dental-heading transition hover:bg-dental-blue"
          >
            Vezi serviciile
          </Link>
        </div>
      </div>
    </section>
  )
}
