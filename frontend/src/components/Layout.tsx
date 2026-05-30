import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../services/store';

export default function Layout() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-background dark:bg-dark-900 text-dark-900 dark:text-background">
      <Outlet />
    </div>
  );
}
