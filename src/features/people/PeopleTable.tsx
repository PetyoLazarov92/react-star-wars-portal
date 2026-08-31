import type { Person } from './people.types'
import type { PeopleState } from './usePeople'

const headers = ['Name', 'Mass', 'Height', 'Hair color', 'Skin color']

interface PeopleTableProps {
  state: PeopleState
}

function PeopleDataTable({ people }: { people: Person[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max border-collapse text-left">
        <caption className="sr-only">Star Wars people</caption>
        <thead>
          <tr className="border-b border-slate-300">
            {headers.map((header) => (
              <th key={header} scope="col" className="px-3 py-2 font-medium text-slate-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.name} className="border-b border-slate-200">
              <td className="px-3 py-2 text-slate-900">{person.name}</td>
              <td className="px-3 py-2 text-slate-900">{person.mass}</td>
              <td className="px-3 py-2 text-slate-900">{person.height}</td>
              <td className="px-3 py-2 text-slate-900">{person.hair_color}</td>
              <td className="px-3 py-2 text-slate-900">{person.skin_color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PeopleTable({ state }: PeopleTableProps) {
  if (state.status === 'loading') {
    return (
      <p role="status" className="text-slate-600">
        Loading Star Wars characters...
      </p>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="flex w-full flex-col items-center gap-4">
        <p role="alert" className="text-red-600">
          {state.message}
        </p>
        {state.stale ? (
          <>
            <p className="text-sm text-slate-600">
              Showing previously loaded data, which may be out of date.
            </p>
            <PeopleDataTable people={state.stale.people} />
          </>
        ) : null}
      </div>
    )
  }

  return <PeopleDataTable people={state.people} />
}

export default PeopleTable
