import { useEffect, useId, useRef, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

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

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      className="m-auto w-[min(24rem,calc(100%-2rem))] rounded-lg border border-slate-300 bg-white p-6 text-slate-900 backdrop:bg-slate-900/50"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id={titleId} className="text-lg font-semibold">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded text-xl leading-none text-slate-500 hover:text-slate-900"
        >
          &times;
        </button>
      </div>
      {children}
    </dialog>
  )
}

export default Modal
