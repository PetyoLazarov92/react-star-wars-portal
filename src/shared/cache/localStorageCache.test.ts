import { beforeEach, describe, expect, it } from 'vitest'
import { z } from 'zod'
import { getCached, getStale, setCached } from './localStorageCache'

const dataSchema = z.object({ value: z.string() })
const KEY = 'test:cache-key'
const TTL_MS = 5 * 60 * 1000

beforeEach(() => {
  localStorage.clear()
})

describe('setCached / getCached', () => {
  it('returns null for a missing key', () => {
    expect(getCached(KEY, dataSchema, TTL_MS)).toBeNull()
  })

  it('returns the written data while within the TTL', () => {
    setCached(KEY, { value: 'fresh' })
    expect(getCached(KEY, dataSchema, TTL_MS)).toEqual({ value: 'fresh' })
  })

  it('returns null once the entry is past the TTL', () => {
    setCached(KEY, { value: 'stale' })
    const entry = JSON.parse(localStorage.getItem(KEY) ?? '{}') as { fetchedAt: number }
    entry.fetchedAt = Date.now() - (TTL_MS + 1)
    localStorage.setItem(KEY, JSON.stringify(entry))

    expect(getCached(KEY, dataSchema, TTL_MS)).toBeNull()
  })

  it('returns null for corrupted (non-JSON) stored data', () => {
    localStorage.setItem(KEY, 'not valid json')
    expect(getCached(KEY, dataSchema, TTL_MS)).toBeNull()
  })

  it('returns null when the stored data fails schema validation', () => {
    localStorage.setItem(KEY, JSON.stringify({ data: { value: 42 }, fetchedAt: Date.now() }))
    expect(getCached(KEY, dataSchema, TTL_MS)).toBeNull()
  })
})

describe('getStale', () => {
  it('returns null for a missing key', () => {
    expect(getStale(KEY, dataSchema)).toBeNull()
  })

  it('returns data even past the TTL, unlike getCached', () => {
    setCached(KEY, { value: 'expired but usable' })
    const entry = JSON.parse(localStorage.getItem(KEY) ?? '{}') as { fetchedAt: number }
    entry.fetchedAt = Date.now() - (TTL_MS + 1)
    localStorage.setItem(KEY, JSON.stringify(entry))

    expect(getCached(KEY, dataSchema, TTL_MS)).toBeNull()
    expect(getStale(KEY, dataSchema)).toEqual({ value: 'expired but usable' })
  })

  it('returns null when the stored data fails schema validation', () => {
    localStorage.setItem(KEY, JSON.stringify({ data: { value: 42 }, fetchedAt: Date.now() }))
    expect(getStale(KEY, dataSchema)).toBeNull()
  })
})
