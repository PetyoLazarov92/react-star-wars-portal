import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from '../features/auth/useSession'
import { ROUTES } from './routes'

interface ProtectedRouteProps {
  children: ReactNode
}

// A navigation guard, not a security boundary: there is no server, and nothing behind /table is
// actually protected (the character data is public). This only redirects a visitor to the
// login-first flow before they've gone through it, per the demo session described in AGENTS.md.
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session } = useSession()

  if (!session) {
    return <Navigate to={ROUTES.login} replace />
  }

  return children
}

export default ProtectedRoute
