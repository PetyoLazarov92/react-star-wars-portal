import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { setSession } from '../features/auth/session'
import SessionProvider from '../features/auth/SessionProvider'
import ProtectedRoute from './ProtectedRoute'

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<div>Login page</div>} />
          <Route
            path="/table"
            element={
              <ProtectedRoute>
                <div>Table page</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </SessionProvider>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  afterEach(() => {
    sessionStorage.clear()
  })

  it('redirects to / when there is no session', () => {
    renderAt('/table')

    expect(screen.getByText('Login page')).toBeInTheDocument()
    expect(screen.queryByText('Table page')).not.toBeInTheDocument()
  })

  it('renders the protected content when a session exists', () => {
    setSession({ username: 'validUser' })
    renderAt('/table')

    expect(screen.getByText('Table page')).toBeInTheDocument()
  })
})
