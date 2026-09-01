import { Link } from 'react-router-dom'
import { ROUTES } from './routes'

const footerLinkClassName =
  'underline-offset-2 hover:underline hover:text-slate-900 dark:hover:text-white'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 px-4 py-6 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400 sm:px-6">
      <nav
        aria-label="Footer"
        className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
      >
        <Link to={ROUTES.about} className={footerLinkClassName}>
          About
        </Link>
        <Link to={ROUTES.privacy} className={footerLinkClassName}>
          Privacy Policy
        </Link>
        <Link to={ROUTES.terms} className={footerLinkClassName}>
          Terms and Conditions
        </Link>
      </nav>
      <p>&copy; {year} Star Wars Portal. All rights reserved.</p>
    </footer>
  )
}

export default Footer
