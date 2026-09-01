import { useSearchParams } from 'react-router-dom'
import Pagination from '../features/people/Pagination'
import { parsePage } from '../features/people/pageParam'
import PeopleTable from '../features/people/PeopleTable'
import { usePeople } from '../features/people/usePeople'

function TablePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parsePage(searchParams.get('page'))
  const state = usePeople(page)

  const goToPage = (nextPage: number): void => {
    setSearchParams(nextPage === 1 ? {} : { page: String(nextPage) })
  }

  const pageData =
    state.status === 'success' ? state : state.status === 'error' ? (state.stale ?? null) : null

  return (
    <main className="flex min-h-svh flex-col items-center gap-6 bg-white p-6 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <h1 className="text-2xl font-semibold">Star Wars People</h1>
      <PeopleTable state={state} />
      {pageData ? (
        <Pagination
          page={page}
          hasNext={pageData.hasNext}
          hasPrevious={pageData.hasPrevious}
          onPrevious={() => goToPage(page - 1)}
          onNext={() => goToPage(page + 1)}
        />
      ) : null}
    </main>
  )
}

export default TablePage
