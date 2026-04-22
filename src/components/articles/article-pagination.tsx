import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import type { ArticleEntry } from '@/content/articles'
import { getArticleHref } from '@/lib/articles'

type Props = {
  newer: ArticleEntry | null
  older: ArticleEntry | null
}

export default function ArticlePagination({ newer, older }: Props) {
  if (!newer && !older) return null

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div>
        {newer ? (
          <Link
            href={getArticleHref(newer.slug)}
            className="group flex h-full rounded-[28px] border border-dental-blueDark/60 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-dental-mint">
                <ArrowLeft size={16} />
                Articol mai nou
              </div>
              <p className="mt-3 font-rounded text-xl font-bold text-dental-heading">
                {newer.title}
              </p>
            </div>
          </Link>
        ) : null}
      </div>

      <div>
        {older ? (
          <Link
            href={getArticleHref(older.slug)}
            className="group flex h-full rounded-[28px] border border-dental-blueDark/60 bg-white p-5 text-right shadow-sm transition hover:shadow-md"
          >
            <div className="ml-auto">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-dental-mint">
                Articol mai vechi
                <ArrowRight size={16} />
              </div>
              <p className="mt-3 font-rounded text-xl font-bold text-dental-heading">
                {older.title}
              </p>
            </div>
          </Link>
        ) : null}
      </div>
    </section>
  )
}