import { AppLayout, AuthLayout } from '@/components/layout'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ERoutes } from '../tokens/routes'

import { DashboardPage, ProfilePage } from '@/pages/app'
import { LoginPage, RecoveryPasswordPage, RegisterPage } from '@/pages/auth'
import PrivateRoute from './private-route'
import PublicRoute from './public-route'

const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to={ERoutes.LOGIN} />} />

        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ERoutes.LOGIN} element={<LoginPage />} />
            <Route path={ERoutes.REGISTER} element={<RegisterPage />} />
            <Route path={ERoutes.RECOVERY_PASSWORD} element={<RecoveryPasswordPage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path={ERoutes.DASHBOARD} element={<DashboardPage />} />
            <Route path={ERoutes.PROFILE} element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default RouterApp
