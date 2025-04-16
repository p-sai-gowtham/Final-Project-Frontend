import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, removeToken, saveToken } from './auth';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (accessToken) => {
    saveToken(accessToken);
    const decoded = jwtDecode(accessToken);
    setUser({ username: decoded.username || decoded.user_id });
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.username || decoded.user_id });
      } catch {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
