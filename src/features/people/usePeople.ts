import { useEffect, useState } from 'react'
import { fetchJson } from '../../shared/api/httpClient'
import { getCached, setCached } from '../../shared/cache/localStorageCache'
import { peopleResponseSchema } from './people.schema'
import type { Person, PeopleResponse } from './people.types'

const PEOPLE_ENDPOINT = 'https://swapi.py4e.com/api/people'

// SWAPI data changes rarely; five minutes keeps paging back and forth snappy without serving
// data that's gone very stale.
const CACHE_TTL_MS = 5 * 60 * 1000

export type PeopleState =
  | { status: 'loading' }
  | { status: 'success'; people: Person[]; hasNext: boolean; hasPrevious: boolean }
  | { status: 'error'; message: string }

function cacheKey(page: number): string {
  return `swapi:people:page:${page}`
}

function toPeopleState(response: PeopleResponse): PeopleState {
  return {
    status: 'success',
    people: response.results,
    hasNext: response.next !== null,
    hasPrevious: response.previous !== null,
  }
}

function readCache(page: number): PeopleState | null {
  const cached = getCached(cacheKey(page), peopleResponseSchema, CACHE_TTL_MS)
  return cached ? toPeopleState(cached) : null
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
        setState(toPeopleState(parsed))
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
        setState({
          status: 'error',
          message: 'Unable to load Star Wars characters right now. Please try again later.',
        })
      })

    return () => controller.abort()
  }, [page])

  return state
}
