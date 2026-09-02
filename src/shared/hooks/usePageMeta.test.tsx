import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { SITE_NAME, usePageMeta } from './usePageMeta'

function getMetaContent(attribute: 'name' | 'property', key: string): string | null {
  return document.head.querySelector(`meta[${attribute}="${key}"]`)?.getAttribute('content') ?? null
}

function TestPage({ title, description }: { title?: string; description: string }) {
  usePageMeta({ title, description })
  return <div>Test page content</div>
}

function renderAt(path: string, element: ReactElement) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="*" element={element} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('usePageMeta', () => {
  it('sets the document title to just the site name when no page title is given', () => {
    renderAt('/', <TestPage description="Home description" />)

    expect(document.title).toBe(SITE_NAME)
  })

  it('sets the document title to "<title> | <site name>" when a page title is given', () => {
    renderAt('/login', <TestPage title="Login" description="Login description" />)

    expect(document.title).toBe(`Login | ${SITE_NAME}`)
  })

  it('sets the description and Open Graph/Twitter meta tags', () => {
    renderAt('/about', <TestPage title="About" description="About description" />)

    expect(getMetaContent('name', 'description')).toBe('About description')
    expect(getMetaContent('property', 'og:title')).toBe(`About | ${SITE_NAME}`)
    expect(getMetaContent('property', 'og:description')).toBe('About description')
    expect(getMetaContent('property', 'og:image')).toMatch(/\/og-image\.png$/)
    expect(getMetaContent('name', 'twitter:card')).toBe('summary_large_image')
    expect(getMetaContent('name', 'twitter:image')).toMatch(/\/og-image\.png$/)
  })

  it('reuses the same meta tag elements across pages instead of creating duplicates', () => {
    renderAt('/about', <TestPage title="About" description="About description" />)
    const countAfterFirstPage = document.head.querySelectorAll('meta[name="description"]').length

    renderAt('/terms', <TestPage title="Terms" description="Terms description" />)
    const countAfterSecondPage = document.head.querySelectorAll('meta[name="description"]').length

    expect(countAfterFirstPage).toBe(1)
    expect(countAfterSecondPage).toBe(1)
    expect(getMetaContent('name', 'description')).toBe('Terms description')
  })

  it('reflects the current path and query string in og:url', () => {
    renderAt('/table?page=2', <TestPage title="Star Wars People" description="Table description" />)

    expect(getMetaContent('property', 'og:url')).toMatch(/\/table\?page=2$/)
  })
})
