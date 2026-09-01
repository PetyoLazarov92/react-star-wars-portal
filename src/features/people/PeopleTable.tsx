import { useState } from 'react'
import type { Person } from './people.types'
import UnitToggle from './UnitToggle'
import { formatHeight, formatMass, type HeightUnit, type MassUnit } from './units'
import type { PeopleState } from './usePeople'

const HEIGHT_OPTIONS: { value: HeightUnit; label: string }[] = [
  { value: 'cm', label: 'cm' },
  { value: 'm', label: 'm' },
]

const MASS_OPTIONS: { value: MassUnit; label: string }[] = [
  { value: 'kg', label: 'kg' },
  { value: 'lb', label: 'lb' },
]

interface PeopleTableProps {
  state: PeopleState
}

interface PeopleDataTableProps {
  people: Person[]
  heightUnit: HeightUnit
  massUnit: MassUnit
  onHeightUnitChange: (unit: HeightUnit) => void
  onMassUnitChange: (unit: MassUnit) => void
}

function PeopleDataTable({
  people,
  heightUnit,
  massUnit,
  onHeightUnitChange,
  onMassUnitChange,
}: PeopleDataTableProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <UnitToggle
          label="Height"
          value={heightUnit}
          options={HEIGHT_OPTIONS}
          onChange={onHeightUnitChange}
        />
        <UnitToggle
          label="Mass"
          value={massUnit}
          options={MASS_OPTIONS}
          onChange={onMassUnitChange}
        />
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-left">
          <caption className="sr-only">Star Wars people</caption>
          <thead>
            <tr className="border-b border-slate-300 dark:border-slate-700">
              <th scope="col" className="px-3 py-2 font-medium text-slate-700 dark:text-slate-300">
                Name
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-slate-700 dark:text-slate-300">
                Mass ({massUnit})
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-slate-700 dark:text-slate-300">
                Height ({heightUnit})
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-slate-700 dark:text-slate-300">
                Hair color
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-slate-700 dark:text-slate-300">
                Skin color
              </th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.name} className="border-b border-slate-200 dark:border-slate-800">
                <td className="px-3 py-2 text-slate-900 dark:text-slate-100">{person.name}</td>
                <td className="px-3 py-2 text-slate-900 dark:text-slate-100">
                  {formatMass(person.mass, massUnit)}
                </td>
                <td className="px-3 py-2 text-slate-900 dark:text-slate-100">
                  {formatHeight(person.height, heightUnit)}
                </td>
                <td className="px-3 py-2 text-slate-900 dark:text-slate-100">
                  {person.hair_color}
                </td>
                <td className="px-3 py-2 text-slate-900 dark:text-slate-100">
                  {person.skin_color}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PeopleTable({ state }: PeopleTableProps) {
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm')
  const [massUnit, setMassUnit] = useState<MassUnit>('kg')

  if (state.status === 'loading') {
    return (
      <p role="status" className="text-slate-600 dark:text-slate-400">
        Loading Star Wars characters...
      </p>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="flex w-full flex-col items-center gap-4">
        <p role="alert" className="text-red-600 dark:text-red-400">
          {state.message}
        </p>
        {state.stale ? (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing previously loaded data, which may be out of date.
            </p>
            <PeopleDataTable
              people={state.stale.people}
              heightUnit={heightUnit}
              massUnit={massUnit}
              onHeightUnitChange={setHeightUnit}
              onMassUnitChange={setMassUnit}
            />
          </>
        ) : null}
      </div>
    )
  }

  return (
    <PeopleDataTable
      people={state.people}
      heightUnit={heightUnit}
      massUnit={massUnit}
      onHeightUnitChange={setHeightUnit}
      onMassUnitChange={setMassUnit}
    />
  )
}

export default PeopleTable
