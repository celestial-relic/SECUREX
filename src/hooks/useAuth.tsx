import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: AuthUser = {
  id: 'OFF-2026-0124',
  name: 'Inspector Rajiv Sharma',
  designation: 'Inspector',
  department: 'Investigation Division',
  role: 'Investigation Officer',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = sessionStorage.getItem('ncrb_auth');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((userId: string, _password: string) => {
    if (userId.trim().length > 0) {
      setUser(DEMO_USER);
      sessionStorage.setItem('ncrb_auth', JSON.stringify(DEMO_USER));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('ncrb_auth');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
