import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { StrictMode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import LoginForm from '../features/auth/LoginForm'
import { setSession } from '../features/auth/session'
import SessionProvider from '../features/auth/SessionProvider'
import ToastProvider from '../shared/toast/ToastProvider'
import RedirectIfAuthenticated from './RedirectIfAuthenticated'

function renderAt(path: string, { strict = false }: { strict?: boolean } = {}) {
  const tree = (
    <MemoryRouter initialEntries={[path]}>
      <SessionProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<div>Home page</div>} />
            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <div>Login page</div>
                </RedirectIfAuthenticated>
              }
            />
          </Routes>
        </ToastProvider>
      </SessionProvider>
    </MemoryRouter>
  )
  render(strict ? <StrictMode>{tree}</StrictMode> : tree)
}

describe('RedirectIfAuthenticated', () => {
  afterEach(() => {
    sessionStorage.clear()
  })

  it('renders the login page when there is no session', () => {
    renderAt('/login')

    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('redirects to / when a session exists', () => {
    setSession({ username: 'validUser' })
    renderAt('/login')

    expect(screen.getByText('Home page')).toBeInTheDocument()
    expect(screen.queryByText('Login page')).not.toBeInTheDocument()
  })

  it('shows a toast explaining the redirect when a session exists', () => {
    setSession({ username: 'validUser' })
    renderAt('/login')

    expect(screen.getByText(/already logged in/i)).toBeInTheDocument()
  })

  it('does not show the toast when there is no session', () => {
    renderAt('/login')

    expect(screen.queryByText(/already logged in/i)).not.toBeInTheDocument()
  })

  it('shows exactly one toast under StrictMode double-invoked effects', () => {
    setSession({ username: 'validUser' })
    renderAt('/login', { strict: true })

    expect(screen.getAllByText(/already logged in/i)).toHaveLength(1)
  })

  // Regression test: an earlier version re-read `session` on every render instead of capturing it
  // once on entry. LoginForm's submit handler calls login() (flipping the session to non-null)
  // and then navigate(ROUTES.table) in the same handler, and those two navigations don't land in
  // the same commit, so the reactive version caught the momentary session change while still on
  // /login and redirected the freshly logged-in user home instead of letting them reach /table.
  it('lets a fresh login from the wrapped form reach its own destination, not the home page', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <SessionProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<div>Home page</div>} />
              <Route
                path="/login"
                element={
                  <RedirectIfAuthenticated>
                    <LoginForm />
                  </RedirectIfAuthenticated>
                }
              />
              <Route path="/table" element={<div>Table page</div>} />
            </Routes>
          </ToastProvider>
        </SessionProvider>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUser' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'validPass' } })
    await waitFor(() => expect(screen.getByRole('button', { name: /log in/i })).toBeEnabled())

    fireEvent.click(screen.getByRole('button', { name: /log in/i }))

    await waitFor(() => expect(screen.getByText('Table page')).toBeInTheDocument())
    expect(screen.queryByText('Home page')).not.toBeInTheDocument()
  })
})
