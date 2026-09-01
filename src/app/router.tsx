import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import TablePage from '../pages/TablePage'
import Layout from './Layout'
import { ROUTES } from './routes'

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.table} element={<TablePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
