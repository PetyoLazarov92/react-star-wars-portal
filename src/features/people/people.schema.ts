import { z } from 'zod'

// Only the five fields the UI needs; Zod drops every other SWAPI field on parse.
export const personSchema = z.object({
  name: z.string(),
  mass: z.string(),
  height: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
})

export const peopleResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(personSchema),
})
