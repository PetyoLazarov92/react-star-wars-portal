import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from '../features/auth/useSession'
import { useToast } from '../shared/toast/useToast'
import { ROUTES } from './routes'

interface RedirectIfAuthenticatedProps {
  children: ReactNode
}

// The mirror image of ProtectedRoute: a visitor who already has a demo session gains nothing from
// landing on the login form, so this sends them to the home page instead. Deliberately checks
// session only once, via a lazy useState initializer, rather than reading it fresh on every
// render: LoginForm calls login() (flipping the session) and then navigate(ROUTES.table) in the
// same handler, and those two navigations don't land in the same commit, so re-checking session on
// every render raced that transition and redirected a freshly logged-in user home instead of to
// /table. Capturing "was there already a session when this route was entered" once sidesteps the
// race and matches the actual intent: catch a direct visit to /login while already signed in, not
// react to signing in from the very form this component wraps.
function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
  const { session } = useSession()
  const { showToast } = useToast()
  const [wasAuthenticatedOnEntry] = useState(() => session !== null)
  const hasShownToastRef = useRef(false)

  useEffect(() => {
    if (wasAuthenticatedOnEntry && !hasShownToastRef.current) {
      hasShownToastRef.current = true
      showToast("You're already logged in.", 'info')
    }
  }, [wasAuthenticatedOnEntry, showToast])

  if (wasAuthenticatedOnEntry) {
    return <Navigate to={ROUTES.home} replace />
  }

  return children
}

export default RedirectIfAuthenticated
