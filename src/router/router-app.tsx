import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ERoutes } from '../tokens/routes'
import { LoginPage, RecoveryPasswordPage, RegisterPage } from '@/pages/auth'
import { AuthLayout } from '@/components/layout'


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
      </Routes>
    </Router>
  )
}

export default RouterApp