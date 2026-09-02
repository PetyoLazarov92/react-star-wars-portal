function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">
        Star Wars Portal
      </h1>
      <img
        src="/space-exploration.svg"
        alt="An astronaut floating in space next to a planet"
        className="w-full max-w-md"
      />
      <p className="max-w-md text-slate-600 dark:text-slate-400">
        A small demo app for browsing Star Wars characters. Log in with any username and password to
        explore a paginated table of names, heights, mass, and more, pulled from the public SWAPI.
      </p>
    </main>
  )
}

export default HomePage
