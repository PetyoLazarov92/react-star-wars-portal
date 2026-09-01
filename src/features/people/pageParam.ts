import { z } from 'zod'

const pageParamSchema = z.coerce.number().int().positive()

export function parsePage(rawPage: string | null): number {
  if (rawPage === null) {
    return 1
  }
  const result = pageParamSchema.safeParse(rawPage)
  return result.success ? result.data : 1
}
