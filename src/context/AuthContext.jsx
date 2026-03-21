import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setToken(storedToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const res = await axios.post(`${apiUrl}/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    setToken(res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    return res.data;
  };

  const signup = async (name, email, password) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const res = await axios.post(`${apiUrl}/auth/signup`, { name, email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    setToken(res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    return res.data;
  };

  const googleLogin = async (credential) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const res = await axios.post(`${apiUrl}/auth/google`, { credential });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    setToken(res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userPincode');
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    if (updatedUser.pincode) {
      localStorage.setItem('userPincode', updatedUser.pincode);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, googleLogin, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
