import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react'
import { INTERACTIVE_CLASS_NAME } from '../focusRing'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Built on the native <dialog> element rather than a hand-rolled overlay: shown via showModal(),
// it already provides a focus trap, Escape-to-close (the 'cancel' event, which closes the dialog
// and fires 'close' by default), and focus restored to the previously focused element on close.
function Modal({ open, title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // A safety net on top of the native focus trap: with only one focusable descendant (as in the
  // offline modal, just the close button), Tab/Shift+Tab can otherwise move focus out to
  // document.body instead of staying on that element.
  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>): void => {
    if (event.key !== 'Tab') {
      return
    }

    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) {
      return
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      className="m-auto w-[min(24rem,calc(100%-2rem))] rounded-lg border border-slate-300 bg-white p-6 text-slate-900 shadow-xl backdrop:bg-slate-900/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:backdrop:bg-black/60"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id={titleId} className="text-lg font-semibold">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded text-xl leading-none text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white ${INTERACTIVE_CLASS_NAME}`}
        >
          &times;
        </button>
      </div>
      {children}
    </dialog>
  )
}

export default Modal
