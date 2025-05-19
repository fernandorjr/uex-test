import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { ERoutes } from '@/tokens/routes';
import { AppLoader } from '@/components/common';

const PrivateRoute = () => {
  const { user, checking } = useAuth();

  if (checking) return <AppLoader />;

  if (!user.id) {
    return <Navigate to={ERoutes.LOGIN} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;