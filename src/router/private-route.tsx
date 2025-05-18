import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { ERoutes } from '@/tokens/routes';

export const PrivateRoute = () => {
  const { user, checking } = useAuth();

  if (checking) {
    return null;
  }

  if (!user) {
    return <Navigate to={ERoutes.LOGIN} replace />;
  }

  return <Outlet />;
};