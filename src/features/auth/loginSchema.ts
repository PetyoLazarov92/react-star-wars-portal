import { z } from 'zod'

const USERNAME_MIN = 4
const USERNAME_MAX = 30
const PASSWORD_MIN = 4
const PASSWORD_MAX = 30

// Letters, digits, spaces, hyphens, underscores, and periods only. The username is the one field
// in this app that gets rendered back into the UI (the header greeting), so this allowlist rejects
// HTML-special characters (<, >, quotes, etc.) outright, as defense in depth on top of React's own
// automatic escaping of rendered text.
const USERNAME_PATTERN = /^[A-Za-z0-9 _.-]+$/

export const usernameSchema = z
  .string()
  .min(USERNAME_MIN, `Username must be between ${USERNAME_MIN} and ${USERNAME_MAX} characters.`)
  .max(USERNAME_MAX, `Username must be between ${USERNAME_MIN} and ${USERNAME_MAX} characters.`)
  .regex(
    USERNAME_PATTERN,
    'Username can only contain letters, numbers, spaces, hyphens, underscores, and periods.',
  )

export const loginSchema = z.object({
  username: usernameSchema,
  password: z
    .string()
    .min(PASSWORD_MIN, `Password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters.`)
    .max(PASSWORD_MAX, `Password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters.`),
})

export type LoginFormValues = z.infer<typeof loginSchema>
