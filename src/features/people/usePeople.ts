import { useEffect, useState } from 'react'
import { fetchJson } from '../../shared/api/httpClient'
import { getCached, getStale, setCached } from '../../shared/cache/localStorageCache'
import { peopleResponseSchema } from './people.schema'
import type { Person, PeopleResponse } from './people.types'

const PEOPLE_ENDPOINT = 'https://swapi.py4e.com/api/people'

// SWAPI data changes rarely; five minutes keeps paging back and forth snappy without serving
// data that's gone very stale.
const CACHE_TTL_MS = 5 * 60 * 1000

interface PeopleData {
  people: Person[]
  hasNext: boolean
  hasPrevious: boolean
}

export type PeopleState =
  | { status: 'loading' }
  | ({ status: 'success' } & PeopleData)
  | { status: 'error'; message: string; stale?: PeopleData }

function cacheKey(page: number): string {
  return `swapi:people:page:${page}`
}

function toPeopleData(response: PeopleResponse): PeopleData {
  return {
    people: response.results,
    hasNext: response.next !== null,
    hasPrevious: response.previous !== null,
  }
}

function readCache(page: number): PeopleState | null {
  const cached = getCached(cacheKey(page), peopleResponseSchema, CACHE_TTL_MS)
  return cached ? { status: 'success', ...toPeopleData(cached) } : null
}

// A cache entry that's past its TTL is still worth showing when a fresh fetch fails: better to
// display data that might be slightly out of date than to show nothing at all.
function readStale(page: number): PeopleData | undefined {
  const stale = getStale(cacheKey(page), peopleResponseSchema)
  return stale ? toPeopleData(stale) : undefined
}

export function usePeople(page: number): PeopleState {
  const [requestedPage, setRequestedPage] = useState(page)
  const [state, setState] = useState<PeopleState>(() => readCache(page) ?? { status: 'loading' })

  if (page !== requestedPage) {
    setRequestedPage(page)
    setState(readCache(page) ?? { status: 'loading' })
  }

  useEffect(() => {
    if (readCache(page)) {
      return
    }

    const controller = new AbortController()

    const url = new URL(PEOPLE_ENDPOINT)
    url.searchParams.set('page', String(page))

    fetchJson(url.toString(), controller.signal)
      .then((data) => {
        const parsed = peopleResponseSchema.parse(data)
        setCached(cacheKey(page), parsed)
        setState({ status: 'success', ...toPeopleData(parsed) })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
        setState({
          status: 'error',
          message: 'Unable to load Star Wars characters right now. Please try again later.',
          stale: readStale(page),
        })
      })

    return () => controller.abort()
  }, [page])

  return state
}
