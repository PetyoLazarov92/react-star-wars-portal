import LoginForm from '../features/auth/LoginForm'
import { usePageMeta } from '../shared/hooks/usePageMeta'

function LoginPage() {
  usePageMeta({
    title: 'Login',
    description:
      'Enter a demo username and password to continue to the Star Wars character table. No real account is required, and nothing is sent to a server.',
  })

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Enter a username and password to continue.
        </p>
      </div>
      <LoginForm />
    </main>
  )
}

export default LoginPage
