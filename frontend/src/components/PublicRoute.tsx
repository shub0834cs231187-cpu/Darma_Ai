import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../services/store';

export default function PublicRoute() {
  const { token, user } = useAuthStore();

  // A stale token without a saved user must not block the sign-in screens.
  if (token && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
