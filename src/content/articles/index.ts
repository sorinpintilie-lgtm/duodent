import type { ComponentType } from 'react'

import DetartrajContent, {
  article as detartrajArticle,
} from './ce-este-detartrajul.mdx'
import RadiografieContent, {
  article as radiografieArticle,
} from './cand-se-face-o-radiografie-dentara.mdx'
import SigilareContent, {
  article as sigilareArticle,
} from './sigilarea-dentara-la-copii.mdx'

export type ArticleMeta = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  updatedAt?: string
  readingTime: number
  featured?: boolean
  cover?: string
  seoTitle?: string
  seoDescription?: string
  serviceHref?: string
  serviceLabel?: string
}

export type ArticleEntry = ArticleMeta & {
  Content: ComponentType
}

export const articleEntries: ArticleEntry[] = [
  {
    ...detartrajArticle,
    Content: DetartrajContent,
  },
  {
    ...radiografieArticle,
    Content: RadiografieContent,
  },
  {
    ...sigilareArticle,
    Content: SigilareContent,
  },
]
