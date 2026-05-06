import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ArticleCTA from '@/components/articles/article-cta'
import ArticleJsonLd from '@/components/articles/article-jsonld'
import ArticlePagination from '@/components/articles/article-pagination'
import ArticleProseShell from '@/components/articles/article-prose-shell'
import Breadcrumb from '@/components/articles/breadcrumb'
import RelatedArticles from '@/components/articles/related-articles'
import {
  getAdjacentArticles,
  getAllArticles,
  getArticleBySlug,
  getArticleHref,
  getRelatedArticles,
} from '@/lib/articles'
import { absoluteUrl } from '@/lib/site'

type Props = {
  params: {
    slug: string
  }
}

export const dynamicParams = true

export function generateStaticParams() {
  return [
    { slug: 'ce-este-detartrajul' },
    { slug: 'cand-se-face-o-radiografie-dentara' },
    { slug: 'sigilarea-dentara-la-copii' },
  ]
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Articol inexistent | Duo Dent',
    }
  }

  const canonical = absoluteUrl(getArticleHref(article.slug))
  const title = article.seoTitle ?? `${article.title} | Duo Dent`
  const description = article.seoDescription ?? article.excerpt

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: article.cover ? [absoluteUrl(article.cover)] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: article.cover ? [absoluteUrl(article.cover)] : [],
    },
  }
}

export default function MaterialeUtileArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const related = getRelatedArticles(article.slug, article.category)
  const { newer, older } = getAdjacentArticles(article.slug)

  return (
    <main className="pb-24 pt-8">
      <ArticleJsonLd article={article} />

      <section className="mx-auto max-w-4xl px-6">
        <Breadcrumb
          items={[
            { label: 'Acasă', href: '/' },
            { label: 'Materiale utile', href: '/materiale-utile' },
            { label: article.title },
          ]}
        />
      </section>

      <ArticleProseShell article={article}>
        <article.Content />
      </ArticleProseShell>

      <section className="mx-auto mt-12 max-w-4xl px-6">
        <ArticleCTA article={article} />
      </section>

      <section className="mx-auto mt-8 max-w-4xl px-6">
        <ArticlePagination newer={newer} older={older} />
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-6">
        <RelatedArticles articles={related} />
      </section>
    </main>
  )
}