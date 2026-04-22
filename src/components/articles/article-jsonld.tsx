import type { ArticleEntry } from '@/content/articles'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { getArticleHref } from '@/lib/articles'

export default function ArticleJsonLd({ article }: { article: ArticleEntry }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: absoluteUrl(getArticleHref(article.slug)),
    headline: article.title,
    description: article.seoDescription ?? article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    image: article.cover ? [absoluteUrl(article.cover)] : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
