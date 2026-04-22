import type { MetadataRoute } from 'next'

import { getAllArticles, getArticleHref } from '@/lib/articles'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '/',
    '/despre-noi',
    '/echipa-noastra',
    '/servicii',
    '/tarife',
    '/materiale-utile',
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }))

  const articlePages = getAllArticles().map((article) => ({
    url: absoluteUrl(getArticleHref(article.slug)),
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
  }))

  return [...staticPages, ...articlePages]
}
