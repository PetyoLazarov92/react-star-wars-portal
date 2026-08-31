const buttonClassName =
  'min-h-11 rounded border border-slate-300 px-4 py-2.5 font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-100'

interface PaginationProps {
  page: number
  hasNext: boolean
  hasPrevious: boolean
  onPrevious: () => void
  onNext: () => void
}

function Pagination({ page, hasNext, hasPrevious, onPrevious, onNext }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className="flex items-center gap-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={buttonClassName}
      >
        Previous
      </button>
      <span aria-current="page" className="text-slate-700 dark:text-slate-300">
        Page {page}
      </span>
      <button type="button" onClick={onNext} disabled={!hasNext} className={buttonClassName}>
        Next
      </button>
    </nav>
  )
}

export default Pagination
