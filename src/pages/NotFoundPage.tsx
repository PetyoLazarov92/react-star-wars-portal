import { Link } from 'react-router-dom'
import { ROUTES } from '../app/routes'

function NotFoundPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-slate-600 dark:text-slate-400">
        <Link to={ROUTES.login} className="underline underline-offset-2">
          Go back to the login page
        </Link>
      </p>
    </main>
  )
}

export default NotFoundPage
