import { AppLoader } from '@/components/common';
import { useAuth } from '@/hooks';
import { ERoutes } from '@/tokens/routes';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { user, checking } = useAuth();

  if (checking) return <AppLoader />;

  if (user) {
    return <Navigate to={ERoutes.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;