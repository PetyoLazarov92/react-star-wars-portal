import { describe, expect, it } from 'vitest'
import { parsePage } from './pageParam'

describe('parsePage', () => {
  it('defaults to 1 when there is no page param', () => {
    expect(parsePage(null)).toBe(1)
  })

  it('parses a valid positive integer', () => {
    expect(parsePage('2')).toBe(2)
  })

  it.each(['0', '-1', 'abc', '1.5', ''])('falls back to 1 for an invalid value %j', (raw) => {
    expect(parsePage(raw)).toBe(1)
  })
})
