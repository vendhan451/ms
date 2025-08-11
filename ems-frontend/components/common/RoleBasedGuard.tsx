import React from 'react';
import { useAuth } from '../../lib/hooks';
import { useRouter } from 'next/navigation';

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleBasedGuard: React.FC<Props> = ({ allowedRoles, children }) => {
  const { role, isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated || (role && !allowedRoles.includes(role))) {
      router.replace('/login');
    }
  }, [role, isAuthenticated, allowedRoles, router]);

  if (!isAuthenticated || (role && !allowedRoles.includes(role))) {
    return null;
  }

  return <>{children}</>;
};

export default RoleBasedGuard;
