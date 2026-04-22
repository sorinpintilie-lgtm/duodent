import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'

import type { ArticleEntry } from '@/content/articles'
import { formatArticleDate, getArticleHref } from '@/lib/articles'

const fallbackImages = ['/images/image1.jpg', '/images/image2.jpg', '/images/image3.jpg']

function getFallbackImage(slug: string) {
  const charsTotal = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return fallbackImages[charsTotal % fallbackImages.length]
}

export default function ArticleCard({ article }: { article: ArticleEntry }) {
  const href = getArticleHref(article.slug)
  const displayImage = article.cover || getFallbackImage(article.slug)

  return (
    <article className="group rounded-[28px] border border-dental-blueDark/60 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={href} className="block">
        <div className="relative mb-5 overflow-hidden rounded-3xl">
          <div className="relative aspect-[16/10] bg-dental-blue">
            <Image
              src={displayImage}
              alt={article.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </div>
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