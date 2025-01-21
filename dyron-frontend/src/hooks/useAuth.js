import { useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/auth';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, setUser } = context;

  const login = useCallback(async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.user);
    return response;
  }, [setUser]);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, [setUser]);

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    role: user?.role
  };
}; 