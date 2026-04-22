import type { ArticleEntry } from '@/content/articles'
import ArticleCard from './article-card'

export default function RelatedArticles({
  articles,
}: {
  articles: ArticleEntry[]
}) {
  if (!articles.length) return null

  return (
    <section>
      <div className="mb-6">
        <h2 className="font-rounded text-3xl font-bold tracking-tight text-dental-heading">
          Articole similare
        </h2>
        <p className="mt-2 text-base leading-8 text-dental-text">
          Poți continua lectura cu alte materiale din aceeași zonă.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
