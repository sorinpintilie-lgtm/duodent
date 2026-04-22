declare module '*.mdx' {
  import type { ComponentType } from 'react'

  const MDXComponent: ComponentType<Record<string, unknown>>
  export default MDXComponent

  export const article: {
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
}