import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-dental-text/80">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition hover:text-dental-heading">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-semibold text-dental-heading' : ''}>
                  {item.label}
                </span>
              )}

              {!isLast ? <ChevronRight size={14} /> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
