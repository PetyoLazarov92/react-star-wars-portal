import { INTERACTIVE_CLASS_NAME } from '../../shared/focusRing'

interface UnitOption<T extends string> {
  value: T
  label: string
}

interface UnitToggleProps<T extends string> {
  label: string
  value: T
  options: UnitOption<T>[]
  onChange: (value: T) => void
}

// The same small segmented-control pattern as shared/components/ThemeToggle.tsx, parameterized so
// the table's height and mass selectors (its two uses) don't each hand-roll the same markup.
function UnitToggle<T extends string>({ label, value, options, onChange }: UnitToggleProps<T>) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <div
        role="group"
        aria-label={label}
        className="flex items-center gap-0.5 rounded border border-slate-300 p-0.5 dark:border-slate-600"
      >
        {options.map((option) => {
          const isActive = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.value)}
              className={`min-h-10 rounded px-3 text-sm font-medium ${INTERACTIVE_CLASS_NAME} ${
                isActive
                  ? 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default UnitToggle
