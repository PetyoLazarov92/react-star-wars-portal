import { useState, type ReactNode } from 'react'
import { clearSession, getSession, setSession, type Session } from './session'
import { SessionContext } from './sessionContext'

interface SessionProviderProps {
  children: ReactNode
}

// Held in Context, unlike useTheme: the demo session has more than one independent reader that
// isn't an ancestor of the writer (the header's greeting/nav, and the protected-route guard), and
// exactly one place (here) needs to change it, so a small Provider is the least-abstraction fit,
// not a new state library.
function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSessionState] = useState<Session | null>(() => getSession())

  const login = (username: string): void => {
    const next: Session = { username }
    setSession(next)
    setSessionState(next)
  }

  const logout = (): void => {
    clearSession()
    setSessionState(null)
  }

  return (
    <SessionContext.Provider value={{ session, login, logout }}>{children}</SessionContext.Provider>
  )
}

export default SessionProvider
