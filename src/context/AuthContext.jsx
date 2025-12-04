// /context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      try {
        const decoded = jwtDecode(t);
        // you could check exp here if you want
        setToken(t);
        setUser({ email: decoded.email });
      } catch (err) {
        // invalid token
        localStorage.removeItem('token');
      }
    }
  }, []);

  function saveToken(t) {
    localStorage.setItem('token', t);
    setToken(t);
    try {
      const decoded = jwtDecode(t);
      setUser({ email: decoded.email });
    } catch {
      setUser(null);
    }
  }

  function loginWithToken(t) {
    saveToken(t);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
