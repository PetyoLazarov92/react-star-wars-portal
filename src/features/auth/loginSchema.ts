import { z } from 'zod'

const USERNAME_MIN = 4
const USERNAME_MAX = 30
const PASSWORD_MIN = 4
const PASSWORD_MAX = 30

export const loginSchema = z.object({
  username: z
    .string()
    .min(USERNAME_MIN, `Username must be between ${USERNAME_MIN} and ${USERNAME_MAX} characters.`)
    .max(USERNAME_MAX, `Username must be between ${USERNAME_MIN} and ${USERNAME_MAX} characters.`),
  password: z
    .string()
    .min(PASSWORD_MIN, `Password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters.`)
    .max(PASSWORD_MAX, `Password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters.`),
})

export type LoginFormValues = z.infer<typeof loginSchema>
