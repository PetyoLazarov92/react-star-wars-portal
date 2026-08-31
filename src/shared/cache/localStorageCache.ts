import { z } from 'zod'

interface CacheEntry<T> {
  data: T
  fetchedAt: number
}

function cacheEntrySchema<T>(dataSchema: z.ZodType<T>) {
  return z.object({ data: dataSchema, fetchedAt: z.number() })
}

function readEntry<T>(key: string, dataSchema: z.ZodType<T>): CacheEntry<T> | null {
  const raw = localStorage.getItem(key)
  if (raw === null) {
    return null
  }

  let parsedJson: unknown
  try {
    parsedJson = JSON.parse(raw)
  } catch {
    return null
  }

  const result = cacheEntrySchema(dataSchema).safeParse(parsedJson)
  return result.success ? result.data : null
}

export function getCached<T>(key: string, dataSchema: z.ZodType<T>, ttlMs: number): T | null {
  const entry = readEntry(key, dataSchema)
  if (!entry) {
    return null
  }

  if (Date.now() - entry.fetchedAt > ttlMs) {
    return null
  }

  return entry.data
}

// Ignores the TTL: for showing an already-expired entry as a fallback when a fresh fetch fails,
// rather than as a normal cache hit.
export function getStale<T>(key: string, dataSchema: z.ZodType<T>): T | null {
  return readEntry(key, dataSchema)?.data ?? null
}

export function setCached<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = { data, fetchedAt: Date.now() }
  try {
    localStorage.setItem(key, JSON.stringify(entry))
  } catch {
    // Best-effort: storage may be full, disabled, or unavailable (e.g. private browsing).
  }
}
