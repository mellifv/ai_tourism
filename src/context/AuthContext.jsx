// /context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

// Decode simple base64 tokens (not JWT)
function decodeBase64Token(token) {
  try {
    // If it looks like JWT (has dots), take the middle part
    if (token.includes('.')) {
      const parts = token.split('.');
      // If it has 3 parts like JWT
      if (parts.length === 3) {
        token = parts[1]; // Take payload part
      }
    }
    
    // Decode base64 with proper padding
    const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    const jsonString = atob(padded);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Token decode failed:', error);
    throw error;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('token');
    console.log('Auth init - token exists:', !!t);
    
    if (t) {
      try {
        const decoded = decodeBase64Token(t);
        console.log('Token decoded successfully:', decoded);
        setToken(t);
        setUser({ email: decoded.email });
      } catch (err) {
        console.error('Failed to decode token:', err);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  function loginWithToken(t) {
    console.log('loginWithToken called, token length:', t?.length);
    localStorage.setItem('token', t);
    setToken(t);
    
    try {
      const decoded = decodeBase64Token(t);
      console.log('Token decoded on login:', decoded);
      setUser({ email: decoded.email });
    } catch (err) {
      console.error('Failed to decode token in login:', err);
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
  return useContext(AuthContext);
}
