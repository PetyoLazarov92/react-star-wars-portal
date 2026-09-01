import { describe, expect, it } from 'vitest'
import { loginSchema } from './loginSchema'

describe('loginSchema', () => {
  it.each(['username', 'password'] as const)('rejects %s shorter than 4 characters', (field) => {
    const result = loginSchema.safeParse({
      username: 'validUser',
      password: 'validPass',
      [field]: 'abc',
    })
    expect(result.success).toBe(false)
  })

  it.each(['username', 'password'] as const)('accepts %s at exactly 4 characters', (field) => {
    const result = loginSchema.safeParse({
      username: 'validUser',
      password: 'validPass',
      [field]: 'abcd',
    })
    expect(result.success).toBe(true)
  })

  it.each(['username', 'password'] as const)('accepts %s at exactly 30 characters', (field) => {
    const result = loginSchema.safeParse({
      username: 'validUser',
      password: 'validPass',
      [field]: 'a'.repeat(30),
    })
    expect(result.success).toBe(true)
  })

  it.each(['username', 'password'] as const)('rejects %s longer than 30 characters', (field) => {
    const result = loginSchema.safeParse({
      username: 'validUser',
      password: 'validPass',
      [field]: 'a'.repeat(31),
    })
    expect(result.success).toBe(false)
  })

  it('rejects a missing field', () => {
    const result = loginSchema.safeParse({ username: 'validUser' })
    expect(result.success).toBe(false)
  })

  it.each(['<script>', 'a<b', 'a>b', 'a"b', "a'b", 'a&b', 'a/b', 'a\\b'])(
    'rejects a username containing HTML-special characters (%s)',
    (username) => {
      const result = loginSchema.safeParse({ username, password: 'validPass' })
      expect(result.success).toBe(false)
    },
  )

  it.each(['valid user', 'valid-user', 'valid_user', 'valid.user'])(
    'accepts a username with spaces, hyphens, underscores, or periods (%s)',
    (username) => {
      const result = loginSchema.safeParse({ username, password: 'validPass' })
      expect(result.success).toBe(true)
    },
  )
})
