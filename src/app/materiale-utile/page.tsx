import type { Metadata } from 'next'

import ArticleCTA from '@/components/articles/article-cta'
import ArticleCard from '@/components/articles/article-card'
import ArticleListHero from '@/components/articles/article-list-hero'
import FeaturedArticle from '@/components/articles/featured-article'
import { getAllArticles, getFeaturedArticle } from '@/lib/articles'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Materiale utile | Duo Dent',
  description:
    'Articole și informații utile pentru pacienți, explicate clar și organizate ușor de parcurs.',
  alternates: {
    canonical: absoluteUrl('/materiale-utile'),
  },
  openGraph: {
    title: 'Materiale utile | Duo Dent',
    description:
      'Articole și informații utile pentru pacienți, explicate clar și organizate ușor de parcurs.',
    url: absoluteUrl('/materiale-utile'),
    type: 'website',
  },
}

export default function MaterialeUtilePage() {
  const articles = getAllArticles()
  const featured = getFeaturedArticle()
  const rest = featured
    ? articles.filter((article) => article.slug !== featured.slug)
    : articles

  return (
    <main className="pb-24 pt-0">
      <ArticleListHero count={articles.length} />

      <section className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
           <p className="text-base leading-8 text-dental-text">
             Aici publicăm articole utile, create pentru a explica pe înțelesul
             pacientului subiecte frecvente din stomatologie, într-un format clar și ușor de parcurs.
           </p>
        </div>
      </section>

      {featured ? (
        <section className="mx-auto mt-10 max-w-6xl px-6">
          <FeaturedArticle article={featured} />
        </section>
      ) : null}

      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-6">
        <ArticleCTA />
      </section>
    </main>
  )
}
