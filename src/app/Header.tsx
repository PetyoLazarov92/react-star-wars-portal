import { NavLink } from 'react-router-dom'
import ThemeToggle from '../shared/components/ThemeToggle'
import { ROUTES } from './routes'

const navLinkClassName =
  'flex min-h-11 items-center rounded px-3 font-medium text-slate-700 hover:text-slate-900 aria-[current=page]:text-slate-900 dark:text-slate-300 dark:hover:text-white dark:aria-[current=page]:text-white'

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 px-4 py-2 sm:px-6">
        <NavLink to={ROUTES.login} end className="text-lg font-semibold tracking-tight">
          Star Wars Portal
        </NavLink>
        <nav aria-label="Main" className="flex items-center gap-2">
          <NavLink to={ROUTES.login} end className={navLinkClassName}>
            Login
          </NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

export default Header
