import PeopleTable from '../features/people/PeopleTable'

function TablePage() {
  return (
    <main className="flex min-h-svh flex-col items-center gap-6 bg-white p-6 text-slate-900">
      <h1 className="text-2xl font-semibold">Star Wars People</h1>
      <PeopleTable />
    </main>
  )
}

export default TablePage
