import type { MetadataRoute } from 'next'

import { getAllArticles, getArticleHref } from '@/lib/articles'
import { absoluteUrl } from '@/lib/site'
import { services } from './servicii/servicii.data'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/despre-noi', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/echipa-noastra', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/servicii', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/pedodontie', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/tarife', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/materiale-utile', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/drepturi', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/termeni-si-conditii', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/politica-de-cookies', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/politica-de-confidentialitate', priority: 0.3, changeFrequency: 'yearly' as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    priority,
    changeFrequency,
  }))

  const articlePages = getAllArticles().map((article) => ({
    url: absoluteUrl(getArticleHref(article.slug)),
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const servicePages = services.map((service) => ({
    url: absoluteUrl(`/servicii/${service.categoryId}/${service.slug}`),
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...articlePages, ...servicePages]
}
