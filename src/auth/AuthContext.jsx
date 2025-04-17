import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, removeToken, saveToken } from './auth';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // saves the token in the local storage and loges the user in
  const login = (accessToken) => {
    saveToken(accessToken);
    const decoded = jwtDecode(accessToken);
    setUser({ username: decoded.username || decoded.user_id, is_admin:decoded.is_staff });
  };

  // will remove the token from the local storage and loges out the user
  const logout = () => {
    removeToken();
    setUser(null);

  };

  // when the page is opened then it gets the token from the local storage if present and logges the user in 
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.username || decoded.user_id, is_admin:decoded.is_staff });
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
