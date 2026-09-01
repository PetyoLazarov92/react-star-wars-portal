import { useCallback, useState, type ReactNode } from 'react'
import { ToastContext, type ToastMessage, type ToastVariant } from './toastContext'

const TOAST_DURATION_MS = 5000

const VARIANT_CLASS_NAME: Record<ToastVariant, string> = {
  info: 'border-sky-300 bg-sky-50 text-sky-900 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100',
  success:
    'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100',
  error:
    'border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
}

interface ToastItemProps {
  toast: ToastMessage
  onDismiss: (id: string) => void
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  return (
    <div
      role={toast.variant === 'error' ? 'alert' : 'status'}
      className={`pointer-events-auto flex w-full max-w-sm items-center gap-2 rounded-lg border p-2 shadow-lg sm:w-auto ${VARIANT_CLASS_NAME[toast.variant]}`}
    >
      <p className="flex-1 px-1 text-sm">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded text-lg leading-none opacity-60 hover:opacity-100"
      >
        &times;
      </button>
    </div>
  )
}

interface ToastProviderProps {
  children: ReactNode
}

// Held in Context for the same reason as the demo session: showToast() is called from components
// (e.g. app/ProtectedRoute.tsx) that aren't ancestors of the one visible toast stack rendered here.
function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const dismissToast = useCallback((id: string): void => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'info'): void => {
      const id = crypto.randomUUID()
      setToasts((current) => [...current, { id, message, variant }])
      setTimeout(() => dismissToast(id), TOAST_DURATION_MS)
    },
    [dismissToast],
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
