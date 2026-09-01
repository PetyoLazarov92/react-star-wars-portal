import { createContext } from 'react'
import type { Session } from './session'

export interface SessionContextValue {
  session: Session | null
  login: (username: string) => void
  logout: () => void
}

export const SessionContext = createContext<SessionContextValue | null>(null)
