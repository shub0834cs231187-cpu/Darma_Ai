import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../services/store';

export default function PrivateRoute() {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
