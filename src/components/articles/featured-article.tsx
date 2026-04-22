import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock3, Sparkles } from 'lucide-react'

import type { ArticleEntry } from '@/content/articles'
import { formatArticleDate, getArticleHref } from '@/lib/articles'

export default function FeaturedArticle({ article }: { article: ArticleEntry }) {
  const href = getArticleHref(article.slug)

  return (
    <section className="overflow-hidden rounded-[32px] border border-dental-blueDark/60 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative min-h-[280px] bg-gradient-to-br from-dental-blue via-white to-dental-blue/60">
          {article.cover ? (
            <Image
              src={article.cover}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          ) : (
            <div className="flex h-full items-end p-6 md:p-8">
              <div className="max-w-md rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-sm backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-full bg-dental-blue px-3 py-1 text-sm font-semibold text-dental-heading">
                  <Sparkles size={14} className="text-dental-mintDark" />
                  Articol recomandat
                </div>
                <p className="mt-4 font-rounded text-2xl font-bold text-dental-heading">
                  Materiale utile Duo Dent
                </p>
                <p className="mt-3 text-sm leading-7 text-dental-text">
                  O secțiune construită pentru claritate, orientare și navigare ușoară.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
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

          <h2 className="mt-5 font-rounded text-3xl font-bold tracking-tight text-dental-heading">
            {article.title}
          </h2>

          <p className="mt-4 text-base leading-8 text-dental-text">{article.excerpt}</p>

          <Link
            href={href}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-dental-mint px-5 py-3 font-semibold text-white transition hover:bg-dental-mintDark"
          >
            Citește articolul
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
