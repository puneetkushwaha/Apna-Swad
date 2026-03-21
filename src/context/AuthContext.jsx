import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';

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
          // The api instance should handle setting the header via an interceptor
          // or it will be set on subsequent requests.
          // No need to set api.defaults.headers.common here if an interceptor is used.
          // If not using an interceptor, this line would be needed, but the instruction implies
          // relying on the api instance's interceptor.
          // For now, removing the global axios usage.
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
    
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    setToken(res.data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    return res.data;
  };

  const signup = async (name, email, password) => {
    
    const res = await api.post('/auth/signup', { name, email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    setToken(res.data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    return res.data;
  };

  const googleLogin = async (credential) => {
    
    const res = await api.post('/auth/google', { credential });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    setToken(res.data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userPincode');
    setUser(null);
    setToken(null);
    delete api.defaults.headers.common['Authorization'];
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
