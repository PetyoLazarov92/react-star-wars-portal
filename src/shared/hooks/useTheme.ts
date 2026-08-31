import { useEffect, useState } from 'react'
import { z } from 'zod'

export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme'
const themeSchema = z.enum(['light', 'dark'])

function getStoredTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (raw === null) {
      return null
    }
    const result = themeSchema.safeParse(raw)
    return result.success ? result.data : null
  } catch {
    return null
  }
}

function getPreferredTheme(): Theme {
  const stored = getStoredTheme()
  if (stored) {
    return stored
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

interface UseThemeResult {
  theme: Theme
  toggleTheme: () => void
}

// Reads the initial theme once (a stored preference, falling back to the OS setting) and applies
// it as a side effect on every change: toggling the `dark` class the CSS `dark:` variant matches
// against, and persisting the choice so it survives a reload. No context/provider: this is the
// only place in the app that needs to change the theme, everywhere else just uses `dark:` classes.
export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Best-effort: a full or disabled store shouldn't break theming for the current session.
    }
  }, [theme])

  const toggleTheme = (): void => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
