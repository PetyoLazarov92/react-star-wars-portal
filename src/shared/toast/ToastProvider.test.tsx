import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ToastProvider from './ToastProvider'
import type { ToastVariant } from './toastContext'
import { useToast } from './useToast'

function ShowToastButton({ variant }: { variant?: ToastVariant }) {
  const { showToast } = useToast()
  return (
    <button type="button" onClick={() => showToast('Test message', variant)}>
      Trigger
    </button>
  )
}

function renderWithProvider(variant?: ToastVariant) {
  render(
    <ToastProvider>
      <ShowToastButton variant={variant} />
    </ToastProvider>,
  )
}

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows a toast when showToast is called', () => {
    renderWithProvider()
    fireEvent.click(screen.getByRole('button', { name: 'Trigger' }))

    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('uses role="alert" for an error toast and role="status" otherwise', () => {
    renderWithProvider('error')
    fireEvent.click(screen.getByRole('button', { name: 'Trigger' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Test message')
  })

  it('auto-dismisses a toast after its duration', () => {
    renderWithProvider()
    fireEvent.click(screen.getByRole('button', { name: 'Trigger' }))
    expect(screen.getByText('Test message')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(screen.queryByText('Test message')).not.toBeInTheDocument()
  })

  it('dismisses a toast when its close button is clicked', () => {
    renderWithProvider()
    fireEvent.click(screen.getByRole('button', { name: 'Trigger' }))

    fireEvent.click(screen.getByRole('button', { name: /dismiss notification/i }))

    expect(screen.queryByText('Test message')).not.toBeInTheDocument()
  })
})
