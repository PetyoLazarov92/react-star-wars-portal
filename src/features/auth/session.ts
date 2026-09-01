import { z } from 'zod'
import { usernameSchema } from './loginSchema'

const SESSION_STORAGE_KEY = 'session'

// sessionStorage, not localStorage: this demo session shouldn't outlive the browser tab, since
// that better matches what it actually is (a display convenience for this visit, not a persistent
// account). Reusing usernameSchema means a tampered sessionStorage entry (it can be edited by the
// user or another script on the same origin, same as any other storage) is held to the same
// length and character-allowlist rules as a fresh login submission, not just a "some string"
// check.
const sessionSchema = z.object({ username: usernameSchema })

export type Session = z.infer<typeof sessionSchema>

export function getSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (raw === null) {
      return null
    }
    const result = sessionSchema.safeParse(JSON.parse(raw))
    return result.success ? result.data : null
  } catch {
    return null
  }
}

export function setSession(session: Session): void {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Best-effort: a full or disabled store shouldn't break the session for the current tab.
  }
}

export function clearSession(): void {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
  } catch {
    // Best-effort, same as above.
  }
}
