import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('farhan_portfolio_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('farhan_portfolio_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (token) {
        try {
          const res = await apiService.getMe();
          setUser(res.user);
          localStorage.setItem('farhan_portfolio_user', JSON.stringify(res.user));
        } catch {
          // Token invalid or expired
          logout();
        }
      }
      setLoading(false);
    }
    checkAuth();
  }, [token]);

  const login = async (username, password) => {
    const data = await apiService.login(username, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('farhan_portfolio_token', data.token);
    localStorage.setItem('farhan_portfolio_user', JSON.stringify(data.user));
    return data;
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch {
      // ignore
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('farhan_portfolio_token');
    localStorage.removeItem('farhan_portfolio_user');
  };

  const isAuthenticated = !!token && !!user;
  const isStaff = user?.is_staff || user?.is_superuser;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isStaff, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
