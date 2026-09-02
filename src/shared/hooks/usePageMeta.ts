import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const SITE_NAME = 'Star Wars Portal'

const OG_IMAGE_PATH = '/og-image.png'
const OG_IMAGE_WIDTH = '1200'
const OG_IMAGE_HEIGHT = '630'

interface PageMetaOptions {
  // Page-specific portion of the title, rendered as "<title> | Star Wars Portal". Omit on the
  // home page, where the title is just the site name with nothing to disambiguate.
  title?: string
  description: string
}

function upsertMetaTag(attribute: 'name' | 'property', key: string, content: string): void {
  const selector = `meta[${attribute}="${key}"]`
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

// Sets the document title and the description/Open Graph/Twitter Card meta tags for the page
// currently mounting this hook. There's no server in this app to render per-route HTML, so these
// tags are written to the DOM on the client: they drive the browser tab title correctly and are
// picked up by anything that executes JavaScript before reading the page, but a link-unfurling bot
// that only fetches the raw index.html sees the static defaults baked into index.html instead,
// the same for every route. Every page shares the same Open Graph image (public/og-image.png), a
// branded 1200x630 image built from the site's own header wordmark, since this app's scope doesn't
// call for a different preview image per page.
export function usePageMeta({ title, description }: PageMetaOptions): void {
  const location = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle

    const imageUrl = `${window.location.origin}${OG_IMAGE_PATH}`
    const pageUrl = `${window.location.origin}${location.pathname}${location.search}`

    upsertMetaTag('name', 'description', description)

    upsertMetaTag('property', 'og:type', 'website')
    upsertMetaTag('property', 'og:site_name', SITE_NAME)
    upsertMetaTag('property', 'og:title', fullTitle)
    upsertMetaTag('property', 'og:description', description)
    upsertMetaTag('property', 'og:url', pageUrl)
    upsertMetaTag('property', 'og:image', imageUrl)
    upsertMetaTag('property', 'og:image:width', OG_IMAGE_WIDTH)
    upsertMetaTag('property', 'og:image:height', OG_IMAGE_HEIGHT)
    upsertMetaTag('property', 'og:image:alt', SITE_NAME)

    upsertMetaTag('name', 'twitter:card', 'summary_large_image')
    upsertMetaTag('name', 'twitter:title', fullTitle)
    upsertMetaTag('name', 'twitter:description', description)
    upsertMetaTag('name', 'twitter:image', imageUrl)
  }, [title, description, location.pathname, location.search])
}
