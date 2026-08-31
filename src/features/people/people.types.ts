import type { z } from 'zod'
import type { peopleResponseSchema, personSchema } from './people.schema'

export type Person = z.infer<typeof personSchema>
export type PeopleResponse = z.infer<typeof peopleResponseSchema>
