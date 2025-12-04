// /context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider mounting...');
    const t = localStorage.getItem('token');
    console.log('Token from localStorage:', t ? 'Exists' : 'None');
    
    if (t) {
      try {
        const decoded = jwtDecode(t);
        console.log('Decoded token:', decoded);
        setToken(t);
        setUser({ email: decoded.email });
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  function loginWithToken(t) {
    console.log('loginWithToken called with:', t.substring(0, 50) + '...');
    localStorage.setItem('token', t);
    setToken(t);
    try {
      const decoded = jwtDecode(t);
      console.log('Login decoded:', decoded);
      setUser({ email: decoded.email });
    } catch {
      setUser(null);
    }
  }

  function logout() {
    console.log('Logout called');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  console.log('AuthProvider render - user:', user, 'loading:', loading);

  return (
    <AuthContext.Provider value={{ user, token, loginWithToken, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
