import { NavLink } from 'react-router-dom'
import Greeting from '../features/auth/Greeting'
import { useSession } from '../features/auth/useSession'
import ThemeToggle from '../shared/components/ThemeToggle'
import { INTERACTIVE_CLASS_NAME } from '../shared/focusRing'
import { ROUTES } from './routes'

const navItemClassName = `flex min-h-11 items-center gap-1.5 rounded px-2 font-medium text-slate-700 hover:text-slate-900 aria-[current=page]:text-slate-900 dark:text-slate-300 dark:hover:text-white dark:aria-[current=page]:text-white sm:px-3 ${INTERACTIVE_CLASS_NAME}`

// The official Star Wars wordmark (from svgrepo.com), used as the site's brand mark in place of a
// plain text title. Its background rect (originally solid white) is dropped and the logo path is
// given fill="currentColor" instead of a hardcoded color, so it inherits the surrounding text
// color (see the NavLink below, which sets none of its own and so picks up body's
// text-slate-900/dark:text-slate-100) and switches with the theme automatically, same as every
// other icon in this file. The viewBox is cropped to the path's actual bounding box (measured via
// getBBox: x 5.669-187.088, y 55.922-136.834 of the original 0 0 192.756 192.756 square, plus a
// little breathing room) rather than the source file's square canvas, which left the wordmark
// filling less than half its height; without the crop, sizing the svg by height leaves it looking
// tiny with a lot of empty space above and below.
function BrandLogo() {
  return (
    <svg aria-hidden="true" viewBox="2.669 52.922 187.419 86.912" className="h-7 w-auto sm:h-8">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.669 81.215v12.65h37.003c4.301 0 9.796-3.977 9.796-10.556 0-2.646 1.012-4.372-2.098-7.872l-4.733-5.608c-2.712-2.53.324-2.53 2.602-2.53h15.623v26.566h12.39V67.299h16.699V55.922H38.877c-6.579 0-9.796 6.317-9.615 9.606.182 3.289.787 7.427 6.254 12.398 4.987 4.533-2.469 3.289-3.218 3.289H5.669zM120.348 55.922H100.36L89.155 93.866h12.47l2.023-5.313h13.156l1.953 5.313h12.215l-10.624-37.944zm-13.916 23.522l4.301-13.916 4.049 13.916h-8.35zM170.443 81.215c-4.807 0-4.807-1.771-4.807-1.771 4.119 0 7.771-6.001 7.771-12.145s-6-11.377-10.809-11.377h-26.891v37.944h13.664v-12.65s5.818 6.831 8.854 9.614c3.037 2.783 3.289 3.036 7.41 3.036h21.449v-12.65c.002-.001-11.834-.001-16.641-.001zm-12.398-8.855h-8.672v-6.832h8.672c3.976 0 4.664 6.832 0 6.832zM5.669 98.672h13.979l3.542 12.652 3.289-12.652h14.675l3.795 12.652 3.796-12.652h12.144l-11.133 37.953H38.624l-4.878-17.965-5.496 17.965H16.865L5.669 98.672zM89.578 98.891H69.59l-11.204 37.943h12.469l2.024-5.312h13.157l1.953 5.312h12.216L89.578 98.891zm-13.915 23.521l4.301-13.916 4.048 13.916h-8.349zM170.695 110.059c-2.275 0-4.756.266-2.043 2.795l4.734 5.609c3.109 3.5 3.059 4.959 3.059 7.607 0 6.578-6.508 10.555-10.809 10.555l-29.896.201c-4.119 0-4.371-.252-7.408-3.035-3.035-2.783-8.855-9.615-8.855-9.615v12.65h-13.662V98.883h26.891c4.807 0 10.809 5.234 10.809 11.377 0 6.145-3.652 12.145-7.773 12.145 0 0 1.812 1.822 4.848 1.822 3.037 0 14.727.012 14.727.012.748 0 8.203 1.244 3.217-3.289-5.467-4.971-6.072-9.107-6.254-12.396s2.662-9.881 9.238-9.881h25.57v11.387h-16.393v-.001zm-42.545 5.261h-8.674v-6.832h8.674c3.977 0 4.664 6.832 0 6.832z"
      />
    </svg>
  )
}

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

function LoginIcon() {
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
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
      />
    </svg>
  )
}

function Header() {
  const { session, logout } = useSession()

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 px-4 py-2 sm:px-6">
        <NavLink
          to={ROUTES.home}
          end
          aria-label="Star Wars Portal"
          className={`shrink-0 rounded ${INTERACTIVE_CLASS_NAME}`}
        >
          <BrandLogo />
        </NavLink>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {session ? (
            <>
              <NavLink to={ROUTES.table} className={navItemClassName}>
                <PeopleIcon />
                <span className="hidden sm:inline">People</span>
              </NavLink>
              <span
                aria-hidden="true"
                className="h-6 w-px shrink-0 bg-slate-200 dark:bg-slate-700"
              />
              <Greeting username={session.username} />
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
              <LoginIcon />
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
