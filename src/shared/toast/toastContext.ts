import { createContext } from 'react'

export type ToastVariant = 'info' | 'success' | 'error'

export interface ToastMessage {
  id: string
  message: string
  variant: ToastVariant
}

export interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
