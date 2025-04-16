// auth.js
import { jwtDecode } from 'jwt-decode';

export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

export const isLoggedIn = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch (e) {
    console.error('Invalid token', e);
    return false;
  }
};

export const logout = () => removeToken();
