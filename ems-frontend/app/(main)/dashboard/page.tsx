'use client';
import React from 'react';
import { useAuth } from '../../../lib/hooks';
import AdminDashboard from '../../../features/dashboard/AdminDashboard';
import EmployeeDashboard from '../../../features/dashboard/EmployeeDashboard';

const DashboardPage: React.FC = () => {
  const { role } = useAuth();
  return role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />;
};

export default DashboardPage;
