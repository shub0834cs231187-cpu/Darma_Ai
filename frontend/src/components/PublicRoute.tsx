import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../services/store';

export default function PublicRoute() {
  const { token } = useAuthStore();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
