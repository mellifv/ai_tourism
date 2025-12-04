// /context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

// Helper to decode base64 (handles both JWT and simple base64)
function decodeToken(t) {
  try {
    // Try to parse as JWT first (header.payload.signature)
    const parts = t.split('.');
    
    if (parts.length === 3) {
      // It's a JWT, decode the payload (middle part)
      const payload = parts[1];
      // Add padding if needed
      const padded = payload + '='.repeat((4 - payload.length % 4) % 4);
      const decodedStr = atob(padded);
      return JSON.parse(decodedStr);
    } else {
      // It's simple base64, decode directly
      const decodedStr = atob(t);
      return JSON.parse(decodedStr);
    }
  } catch (err) {
    console.error('Token decode error:', err);
    throw new Error('Invalid token format');
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      try {
        const decoded = decodeToken(t);
        setToken(t);
        setUser({ email: decoded.email });
      } catch (err) {
        console.error('Invalid token, removing:', err);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  function loginWithToken(t) {
    localStorage.setItem('token', t);
    setToken(t);
    try {
      const decoded = decodeToken(t);
      setUser({ email: decoded.email });
    } catch (err) {
      console.error('Failed to decode token:', err);
      setUser(null);
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loginWithToken, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
