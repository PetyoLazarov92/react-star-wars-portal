import AppRouter from './app/router'
import OfflineModal from './app/OfflineModal'
import SessionProvider from './features/auth/SessionProvider'

function App() {
  return (
    <SessionProvider>
      <AppRouter />
      <OfflineModal />
    </SessionProvider>
  )
}

export default App
