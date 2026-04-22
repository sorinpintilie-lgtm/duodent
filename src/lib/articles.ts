import { articleEntries, type ArticleEntry } from '@/content/articles'

export function getAllArticles(): ArticleEntry[] {
  return [...articleEntries].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getFeaturedArticle(): ArticleEntry | null {
  const articles = getAllArticles()
  return articles.find((article) => article.featured) ?? articles[0] ?? null
}

export function getArticleBySlug(slug: string): ArticleEntry | undefined {
  return articleEntries.find((article) => article.slug === slug)
}

export function getArticleHref(slug: string): string {
  return `/materiale-utile/${slug}`
}

export function getRelatedArticles(
  slug: string,
  category: string,
  limit = 3
): ArticleEntry[] {
  return getAllArticles()
    .filter((article) => article.slug !== slug && article.category === category)
    .slice(0, limit)
}

export function getAdjacentArticles(slug: string): {
  newer: ArticleEntry | null
  older: ArticleEntry | null
} {
  const articles = getAllArticles()
  const index = articles.findIndex((article) => article.slug === slug)

  if (index === -1) {
    return { newer: null, older: null }
  }

  return {
    newer: index > 0 ? articles[index - 1] : null,
    older: index < articles.length - 1 ? articles[index + 1] : null,
  }
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}
