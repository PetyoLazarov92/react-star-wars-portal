import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

// The app shell: every route renders inside here via <Outlet />, so the header and footer are
// defined once instead of duplicated per page.
function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
