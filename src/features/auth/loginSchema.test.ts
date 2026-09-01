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
})
