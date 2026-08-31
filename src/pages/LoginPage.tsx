import LoginForm from '../features/auth/LoginForm'

function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white p-6 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
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
