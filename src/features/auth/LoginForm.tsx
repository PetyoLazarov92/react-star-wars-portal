import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../app/routes'
import { loginSchema, type LoginFormValues } from './loginSchema'

const inputClassName =
  'min-h-11 rounded border border-slate-300 px-3 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400'

function LoginForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = (): void => {
    void navigate(ROUTES.table)
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <div className="flex flex-col gap-1 text-left">
        <label htmlFor="username" className="text-sm font-medium text-slate-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          aria-invalid={errors.username ? true : false}
          aria-describedby={errors.username ? 'username-error' : undefined}
          className={inputClassName}
          {...register('username')}
        />
        {errors.username ? (
          <p id="username-error" role="alert" className="text-sm text-red-600">
            {errors.username.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1 text-left">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={errors.password ? true : false}
          aria-describedby={errors.password ? 'password-error' : undefined}
          className={inputClassName}
          {...register('password')}
        />
        {errors.password ? (
          <p id="password-error" role="alert" className="text-sm text-red-600">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="min-h-11 rounded bg-slate-900 px-4 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Log in
      </button>
    </form>
  )
}

export default LoginForm
