import { Link } from 'react-router-dom'
import { ROUTES } from '../app/routes'
import { INTERACTIVE_CLASS_NAME } from '../shared/focusRing'
import { usePageMeta } from '../shared/hooks/usePageMeta'

function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found',
    description: "The page you're looking for doesn't exist. Head back to the home page.",
  })

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-slate-600 dark:text-slate-400">
        <Link
          to={ROUTES.home}
          className={`rounded underline underline-offset-2 hover:text-slate-900 dark:hover:text-white ${INTERACTIVE_CLASS_NAME}`}
        >
          Go back to the home page
        </Link>
      </p>
    </main>
  )
}

export default NotFoundPage
