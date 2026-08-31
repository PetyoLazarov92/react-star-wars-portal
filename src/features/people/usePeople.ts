import { useEffect, useState } from 'react'
import { fetchJson } from '../../shared/api/httpClient'
import { peopleResponseSchema } from './people.schema'
import type { Person } from './people.types'

const PEOPLE_ENDPOINT = 'https://swapi.py4e.com/api/people'

export type PeopleState =
  | { status: 'loading' }
  | { status: 'success'; people: Person[]; hasNext: boolean; hasPrevious: boolean }
  | { status: 'error'; message: string }

export function usePeople(page: number): PeopleState {
  const [requestedPage, setRequestedPage] = useState(page)
  const [state, setState] = useState<PeopleState>({ status: 'loading' })

  if (page !== requestedPage) {
    setRequestedPage(page)
    setState({ status: 'loading' })
  }

  useEffect(() => {
    const controller = new AbortController()

    const url = new URL(PEOPLE_ENDPOINT)
    url.searchParams.set('page', String(page))

    fetchJson(url.toString(), controller.signal)
      .then((data) => {
        const parsed = peopleResponseSchema.parse(data)
        setState({
          status: 'success',
          people: parsed.results,
          hasNext: parsed.next !== null,
          hasPrevious: parsed.previous !== null,
        })
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
