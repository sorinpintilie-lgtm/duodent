import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock3, Sparkles } from 'lucide-react'

import type { ArticleEntry } from '@/content/articles'
import { formatArticleDate, getArticleHref } from '@/lib/articles'

const fallbackImages = ['/images/image1.jpg', '/images/image2.jpg', '/images/image3.jpg']

function getFallbackImage(slug: string) {
  const charsTotal = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return fallbackImages[charsTotal % fallbackImages.length]
}

export default function FeaturedArticle({ article }: { article: ArticleEntry }) {
  const href = getArticleHref(article.slug)
  const displayImage = article.cover || getFallbackImage(article.slug)

  return (
    <section className="overflow-hidden rounded-[32px] border border-dental-blueDark/60 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative min-h-[280px] bg-dental-blue">
          <Image
            src={displayImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-dental-mint/15 px-4 py-2 text-sm font-semibold text-dental-mintDark">
            <Sparkles size={16} />
            Articol recomandat
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