import type { ReactNode } from 'react'
import Image from 'next/image'
import { CalendarDays, Clock3 } from 'lucide-react'

import type { ArticleEntry } from '@/content/articles'
import { formatArticleDate } from '@/lib/articles'

type Props = {
  article: ArticleEntry
  children: ReactNode
}

export default function ArticleProseShell({ article, children }: Props) {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6">
        <div className="rounded-[32px] border border-dental-blueDark/60 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
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

          <h1 className="mt-5 font-rounded text-4xl font-bold tracking-tight text-dental-heading md:text-5xl">
            {article.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-dental-text md:text-lg">
            {article.excerpt}
          </p>

          {article.cover ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[28px] bg-dental-blue">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-3xl px-6">
        <div className="rounded-[32px] border border-dental-blueDark/60 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
          {children}
        </div>
      </section>
    </>
  )
}
