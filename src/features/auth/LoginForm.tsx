import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../app/routes'
import { INTERACTIVE_CLASS_NAME } from '../../shared/focusRing'
import { loginSchema, type LoginFormValues } from './loginSchema'
import { useSession } from './useSession'

const inputClassName =
  'min-h-11 rounded border border-slate-300 px-3 py-2.5 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-400'

function EyeIcon() {
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
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  )
}

function EyeSlashIcon() {
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
        d="M3 3l18 18M10.58 10.59a2 2 0 0 0 2.83 2.83M9.36 5.37A9.47 9.47 0 0 1 12 4.5c4.64 0 8.57 3.01 9.96 7.18a1.01 1.01 0 0 1 0 .64 10.7 10.7 0 0 1-1.75 3.2M6.23 6.23A10.45 10.45 0 0 0 2.04 11.68a1.01 1.01 0 0 0 0 .64c1.39 4.17 5.32 7.18 9.96 7.18.9 0 1.76-.11 2.58-.31"
      />
    </svg>
  )
}

function LoginForm() {
  const navigate = useNavigate()
  const { login } = useSession()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = (data: LoginFormValues): void => {
    login(data.username)
    void navigate(ROUTES.table)
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <div className="flex flex-col gap-1 text-left">
        <label
          htmlFor="username"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
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
          <p id="username-error" role="alert" className="text-sm text-red-600 dark:text-red-400">
            {errors.username.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1 text-left">
        <label
          htmlFor="password"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            aria-invalid={errors.password ? true : false}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={`${inputClassName} w-full pr-11`}
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className={`absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white ${INTERACTIVE_CLASS_NAME}`}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password ? (
          <p id="password-error" role="alert" className="text-sm text-red-600 dark:text-red-400">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`min-h-11 rounded bg-slate-900 px-4 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 ${INTERACTIVE_CLASS_NAME}`}
      >
        Log in
      </button>
    </form>
  )
}

export default LoginForm
