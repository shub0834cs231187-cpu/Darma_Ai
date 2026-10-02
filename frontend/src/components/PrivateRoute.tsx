import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../services/store';

export default function PrivateRoute() {
  const { token, user } = useAuthStore();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
