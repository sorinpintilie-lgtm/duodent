import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-12 font-rounded text-3xl font-bold tracking-tight text-dental-heading">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-rounded text-2xl font-bold tracking-tight text-dental-heading">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mt-5 text-base leading-8 text-dental-text">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="mt-5 list-disc space-y-3 pl-6 text-base leading-8 text-dental-text">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-3 pl-6 text-base leading-8 text-dental-text">
        {children}
      </ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    a: ({ href = '#', children }) => (
      <Link
        href={href}
        className="font-semibold text-dental-mint underline decoration-dental-mint/40 underline-offset-4 transition hover:text-dental-mintDark"
      >
        {children}
      </Link>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-dental-heading">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 rounded-3xl border border-dental-blueDark/60 bg-dental-blue/50 px-6 py-5 text-dental-heading">
        {children}
      </blockquote>
    ),
    ...components,
  }
}
