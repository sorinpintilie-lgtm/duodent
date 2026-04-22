export const siteConfig = {
  name: 'Duo Dent',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://duodent.ro',
  defaultTitle: 'Duo Dent | Clinică stomatologică',
  defaultDescription:
    'Clinică stomatologică pentru întreaga familie, cu experiență, laborator propriu și tratamente complete.',
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.siteUrl}${normalizedPath}`
}
