import AppRouter from './app/router'
import OfflineModal from './app/OfflineModal'
import ThemeToggle from './shared/components/ThemeToggle'

function App() {
  return (
    <>
      <AppRouter />
      <OfflineModal />
      <ThemeToggle />
    </>
  )
}

export default App
