import { Route, Routes } from 'react-router-dom'
import AboutPage from '../pages/AboutPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage'
import TablePage from '../pages/TablePage'
import TermsPage from '../pages/TermsPage'
import Layout from './Layout'
import ProtectedRoute from './ProtectedRoute'
import { ROUTES } from './routes'

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route
          path={ROUTES.table}
          element={
            <ProtectedRoute>
              <TablePage />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.privacy} element={<PrivacyPolicyPage />} />
        <Route path={ROUTES.terms} element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
