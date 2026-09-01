import { useEffect, useRef, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from '../features/auth/useSession'
import { useToast } from '../shared/toast/useToast'
import { ROUTES } from './routes'

interface ProtectedRouteProps {
  children: ReactNode
}

// A navigation guard, not a security boundary: there is no server, and nothing behind /table is
// actually protected (the character data is public). This only redirects a visitor to the
// login-first flow before they've gone through it, per the demo session described in AGENTS.md.
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session } = useSession()
  const { showToast } = useToast()
  const hasShownToastRef = useRef(false)

  // A side effect (triggering a toast on another component's provider), not something safe to do
  // directly in the render body. Guarded by a ref rather than an effect cleanup: this component
  // unmounts for real almost immediately after the redirect below (the matched route changes away
  // from /table), so a cleanup that dismissed the toast on unmount would clear it right after
  // showing it, in production as well as development. The ref only needs to survive React
  // StrictMode's development-only mount/cleanup/remount cycle, which reuses this same instance, so
  // it stops that from creating two stacked toasts for one redirect.
  useEffect(() => {
    if (!session && !hasShownToastRef.current) {
      hasShownToastRef.current = true
      showToast('Please log in to access that page.', 'info')
    }
  }, [session, showToast])

  if (!session) {
    return <Navigate to={ROUTES.login} replace />
  }

  return children
}

export default ProtectedRoute
