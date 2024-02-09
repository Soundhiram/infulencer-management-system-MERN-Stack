import { Navigate } from 'react-router-dom';
import { AppLayout } from '../layout';
import { RoutingConstraints } from './constraints';

interface PrivateRouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
  const isAuthenticate = !!localStorage.getItem('token');

  if (!isAuthenticate) {
    return <Navigate to={RoutingConstraints.INDEX} />;
  }
  return <AppLayout />;
};

export { PrivateRoute };
