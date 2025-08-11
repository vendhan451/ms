'use client';
import React from 'react';
import { useAuth } from '../../lib/hooks';
import { useRouter } from 'next/navigation';
import AppHeader from '../../components/layout/AppHeader';
import AppSidebar from '../../components/layout/AppSidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {/* AppHeader */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <AppHeader />
      </div>
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: '#fff', boxShadow: '2px 0 8px #f0f1f2' }}>
          <AppSidebar />
        </div>
        {/* Main Content */}
        <main style={{ flex: 1, padding: '32px 24px', background: '#f0f2f5' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
