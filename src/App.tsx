import AppRouter from './app/router'
import OfflineModal from './app/OfflineModal'
import SessionProvider from './features/auth/SessionProvider'
import ToastProvider from './shared/toast/ToastProvider'

function App() {
  return (
    <SessionProvider>
      <ToastProvider>
        <AppRouter />
        <OfflineModal />
      </ToastProvider>
    </SessionProvider>
  )
}

export default App
