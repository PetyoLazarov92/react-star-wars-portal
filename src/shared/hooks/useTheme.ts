import { useEffect, useState } from 'react'
import { z } from 'zod'

export type ThemePreference = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme'
const themePreferenceSchema = z.enum(['light', 'dark', 'system'])
const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)'

function getStoredPreference(): ThemePreference {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (raw === null) {
      return 'system'
    }
    const result = themePreferenceSchema.safeParse(raw)
    return result.success ? result.data : 'system'
  } catch {
    return 'system'
  }
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_MEDIA_QUERY).matches ? 'dark' : 'light'
}

interface UseThemeResult {
  preference: ThemePreference
  resolvedTheme: ResolvedTheme
  setPreference: (preference: ThemePreference) => void
}

// Three-way preference (light/dark/system), distinct from the resolved theme actually applied:
// 'system' means "keep following the OS setting live," not just "read it once at mount," so a
// matchMedia change event updates resolvedTheme immediately without a page reload. No
// context/provider: this is the only place in the app that needs to change the theme, everywhere
// else just uses `dark:` classes.
export function useTheme(): UseThemeResult {
  const [preference, setPreference] = useState<ThemePreference>(() => getStoredPreference())
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme())

  useEffect(() => {
    const media = window.matchMedia(DARK_MEDIA_QUERY)
    const handleChange = (event: MediaQueryListEvent): void => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const resolvedTheme: ResolvedTheme = preference === 'system' ? systemTheme : preference

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, preference)
    } catch {
      // Best-effort: a full or disabled store shouldn't break theming for the current session.
    }
  }, [preference])

  return { preference, resolvedTheme, setPreference }
}
