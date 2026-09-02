import { useSearchParams } from 'react-router-dom'
import Pagination from '../features/people/Pagination'
import { parsePage } from '../features/people/pageParam'
import PeopleTable from '../features/people/PeopleTable'
import { usePeople } from '../features/people/usePeople'
import { usePageMeta } from '../shared/hooks/usePageMeta'

function TablePage() {
  usePageMeta({
    title: 'Star Wars People',
    description:
      'Browse a paginated table of Star Wars characters: name, mass, height, hair color, and skin color, pulled live from the public SWAPI.',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const page = parsePage(searchParams.get('page'))
  const state = usePeople(page)

  const goToPage = (nextPage: number): void => {
    setSearchParams(nextPage === 1 ? {} : { page: String(nextPage) })
  }

  const pageData =
    state.status === 'success' ? state : state.status === 'error' ? (state.stale ?? null) : null

  return (
    <main className="flex flex-1 flex-col items-center gap-6 p-6">
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
