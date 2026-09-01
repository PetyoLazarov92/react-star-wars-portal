import { afterEach, describe, expect, it } from 'vitest'
import { clearSession, getSession, setSession } from './session'

describe('session', () => {
  afterEach(() => {
    sessionStorage.clear()
  })

  it('returns null when nothing is stored', () => {
    expect(getSession()).toBeNull()
  })

  it('round-trips a valid session', () => {
    setSession({ username: 'validUser' })
    expect(getSession()).toEqual({ username: 'validUser' })
  })

  it('clears a stored session', () => {
    setSession({ username: 'validUser' })
    clearSession()
    expect(getSession()).toBeNull()
  })

  it('treats corrupted (non-JSON) stored data as a miss', () => {
    sessionStorage.setItem('session', 'not json')
    expect(getSession()).toBeNull()
  })

  it('treats a stored username that fails the character allowlist as a miss', () => {
    sessionStorage.setItem('session', JSON.stringify({ username: '<script>' }))
    expect(getSession()).toBeNull()
  })

  it('treats a stored value missing the username field as a miss', () => {
    sessionStorage.setItem('session', JSON.stringify({ notUsername: 'validUser' }))
    expect(getSession()).toBeNull()
  })
})
