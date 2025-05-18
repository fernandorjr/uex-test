import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ERoutes } from '../tokens/routes'
import { AppLayout, AuthLayout } from '@/components/layout'
import { DashboardPage } from '@/pages/app'
import { LoginPage, RecoveryPasswordPage, RegisterPage } from '@/pages/auth'


const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Navigate to={ERoutes.LOGIN} />} />

        <Route element={<AuthLayout />}>
          <Route path={ERoutes.LOGIN} element={<LoginPage />} />
          <Route path={ERoutes.REGISTER} element={<RegisterPage />} />
          <Route path={ERoutes.RECOVERY_PASSWORD} element={<RecoveryPasswordPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path={ERoutes.DASHBOARD} element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default RouterApp