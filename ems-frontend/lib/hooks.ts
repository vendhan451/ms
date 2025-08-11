import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  return {
    user: auth.user,
    role: auth.user?.role,
    isAuthenticated: auth.isAuthenticated,
    accessToken: auth.accessToken,
  };
}
