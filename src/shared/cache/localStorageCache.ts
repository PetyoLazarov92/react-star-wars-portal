import { z } from 'zod'

interface CacheEntry<T> {
  data: T
  fetchedAt: number
}

function cacheEntrySchema<T>(dataSchema: z.ZodType<T>) {
  return z.object({ data: dataSchema, fetchedAt: z.number() })
}

export function getCached<T>(key: string, dataSchema: z.ZodType<T>, ttlMs: number): T | null {
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
  if (!result.success) {
    return null
  }

  if (Date.now() - result.data.fetchedAt > ttlMs) {
    return null
  }

  return result.data.data
}

export function setCached<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = { data, fetchedAt: Date.now() }
  try {
    localStorage.setItem(key, JSON.stringify(entry))
  } catch {
    // Best-effort: storage may be full, disabled, or unavailable (e.g. private browsing).
  }
}
