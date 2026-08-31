import { useEffect, useState } from 'react'
import { fetchJson } from '../../shared/api/httpClient'
import { peopleResponseSchema } from './people.schema'
import type { Person } from './people.types'

const PEOPLE_ENDPOINT = 'https://swapi.py4e.com/api/people'

type PeopleState =
  | { status: 'loading' }
  | { status: 'success'; people: Person[] }
  | { status: 'error'; message: string }

export function usePeople(): PeopleState {
  const [state, setState] = useState<PeopleState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    fetchJson(PEOPLE_ENDPOINT, controller.signal)
      .then((data) => {
        const { results } = peopleResponseSchema.parse(data)
        setState({ status: 'success', people: results })
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
  }, [])

  return state
}
