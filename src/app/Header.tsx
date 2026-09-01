import { NavLink } from 'react-router-dom'
import Greeting from '../features/auth/Greeting'
import { useSession } from '../features/auth/useSession'
import ThemeToggle from '../shared/components/ThemeToggle'
import { ROUTES } from './routes'

const navItemClassName =
  'flex min-h-11 items-center gap-1.5 rounded px-2 font-medium text-slate-700 hover:text-slate-900 aria-[current=page]:text-slate-900 dark:text-slate-300 dark:hover:text-white dark:aria-[current=page]:text-white sm:px-3'

function PeopleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-5 w-5"
    >
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </svg>
  )
}

function LogOutIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"
      />
    </svg>
  )
}

function Header() {
  const { session, logout } = useSession()

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 px-4 py-2 sm:px-6">
        <NavLink
          to={ROUTES.login}
          end
          className="shrink-0 text-base font-semibold tracking-tight whitespace-nowrap sm:text-lg"
        >
          Star Wars Portal
        </NavLink>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {session ? (
            <>
              <Greeting username={session.username} />
              <NavLink to={ROUTES.table} className={navItemClassName}>
                <PeopleIcon />
                <span className="hidden sm:inline">People</span>
              </NavLink>
              <button
                type="button"
                onClick={logout}
                aria-label="Log out"
                className={navItemClassName}
              >
                <LogOutIcon />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </>
          ) : (
            <NavLink to={ROUTES.login} end className={navItemClassName}>
              Login
            </NavLink>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

export default Header
