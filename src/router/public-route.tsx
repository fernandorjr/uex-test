import { useAuth } from '@/hooks';
import { ERoutes } from '@/tokens/routes';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const { user, checking } = useAuth();

  if (checking) {
    return null;
  }

  if (user) {
    return <Navigate to={ERoutes.DASHBOARD} replace />;
  }

  return <Outlet />;
};