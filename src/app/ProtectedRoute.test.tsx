import { render, screen } from '@testing-library/react'
import { StrictMode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { setSession } from '../features/auth/session'
import SessionProvider from '../features/auth/SessionProvider'
import ToastProvider from '../shared/toast/ToastProvider'
import ProtectedRoute from './ProtectedRoute'

function renderAt(path: string, { strict = false }: { strict?: boolean } = {}) {
  const tree = (
    <MemoryRouter initialEntries={[path]}>
      <SessionProvider>
        <ToastProvider>
          <Routes>
            <Route path="/login" element={<div>Login page</div>} />
            <Route
              path="/table"
              element={
                <ProtectedRoute>
                  <div>Table page</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </ToastProvider>
      </SessionProvider>
    </MemoryRouter>
  )
  render(strict ? <StrictMode>{tree}</StrictMode> : tree)
}

describe('ProtectedRoute', () => {
  afterEach(() => {
    sessionStorage.clear()
  })

  it('redirects to /login when there is no session', () => {
    renderAt('/table')

    expect(screen.getByText('Login page')).toBeInTheDocument()
    expect(screen.queryByText('Table page')).not.toBeInTheDocument()
  })

  it('shows a toast explaining the redirect when there is no session', () => {
    renderAt('/table')

    expect(screen.getByText(/please log in/i)).toBeInTheDocument()
  })

  it('renders the protected content when a session exists', () => {
    setSession({ username: 'validUser' })
    renderAt('/table')

    expect(screen.getByText('Table page')).toBeInTheDocument()
  })

  it('does not show the login toast when a session exists', () => {
    setSession({ username: 'validUser' })
    renderAt('/table')

    expect(screen.queryByText(/please log in/i)).not.toBeInTheDocument()
  })

  it('shows exactly one toast under StrictMode double-invoked effects', () => {
    renderAt('/table', { strict: true })

    expect(screen.getAllByText(/please log in/i)).toHaveLength(1)
  })
})
