import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ERoutes } from '../tokens/routes';
import { AuthLayout, AppLayout } from '@/components/layout';


import { LoginPage, RegisterPage, RecoveryPasswordPage } from '@/pages/auth';
import { DashboardPage, ProfilePage } from '@/pages/app';
import PublicRoute from './public-route';
import PrivateRoute from './private-route';

const RouterApp = () => {
  return (
    <Router>
      <Routes>
        {/* default redirect */}
        <Route path="*" element={<Navigate to={ERoutes.LOGIN} replace />} />

        {/* rotas públicas */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ERoutes.LOGIN} element={<LoginPage />} />
            <Route path={ERoutes.REGISTER} element={<RegisterPage />} />
            <Route path={ERoutes.RECOVERY_PASSWORD} element={<RecoveryPasswordPage />} />
          </Route>
        </Route>

        {/* rotas privadas */}
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
