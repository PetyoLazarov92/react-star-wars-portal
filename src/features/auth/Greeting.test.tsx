import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Greeting from './Greeting'

describe('Greeting', () => {
  it('renders a hostile username as inert text, never as markup', () => {
    const hostile = '<img src=x onerror="window.__pwned = true">'
    render(<Greeting username={hostile} />)

    expect(screen.getByText(`Hi, ${hostile}!`)).toBeInTheDocument()
    expect(document.querySelector('img')).toBeNull()
    expect((window as unknown as { __pwned?: boolean }).__pwned).toBeUndefined()
  })
})
