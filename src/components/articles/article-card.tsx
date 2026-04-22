import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'

import type { ArticleEntry } from '@/content/articles'
import { formatArticleDate, getArticleHref } from '@/lib/articles'

export default function ArticleCard({ article }: { article: ArticleEntry }) {
  const href = getArticleHref(article.slug)

  return (
    <article className="group rounded-[28px] border border-dental-blueDark/60 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={href} className="block">
        <div className="relative mb-5 overflow-hidden rounded-3xl">
          {article.cover ? (
            <div className="relative aspect-[16/10] bg-dental-blue">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="flex aspect-[16/10] items-end rounded-3xl bg-gradient-to-br from-dental-blue via-white to-dental-blue/60 p-5">
              <div className="max-w-[80%] rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-dental-mintDark">
                  Duo Dent
                </span>
                <p className="mt-2 font-rounded text-lg font-bold text-dental-heading">
                  Materiale utile
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-dental-blue px-3 py-1 font-semibold text-dental-heading">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1 text-dental-text/80">
            <CalendarDays size={14} />
            {formatArticleDate(article.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1 text-dental-text/80">
            <Clock3 size={14} />
            {article.readingTime} min
          </span>
        </div>

        <h2 className="mt-4 font-rounded text-2xl font-bold tracking-tight text-dental-heading">
          {article.title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-dental-text">{article.excerpt}</p>

        <div className="mt-5 inline-flex items-center gap-2 font-semibold text-dental-mint transition group-hover:text-dental-mintDark">
          Citește articolul
          <ArrowRight size={16} />
        </div>
      </Link>
    </article>
  )
}
