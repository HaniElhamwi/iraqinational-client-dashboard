// AuthContext.js
import { useRefreshToken } from '@/hooks';
import { paths } from '@/paths';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  login: (accessToken, user) => {},
  logout: () => {},
  user: {
    id: '',
    email: '',
    name: '',
    picture: '',
    role: '',
    phone: '',
    username: '',
    image: '',
  },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { refreshToken } = useRefreshToken();
  const router = useRouter();

  const handleRefresh = async () => {
    const refreshRed = await refreshToken();

    if (refreshRed?.message === 'Forbidden resource') {
      router.push(paths.login);
      return;
    }
    if (refreshRed?.user) {
      setUser(refreshRed.user);
      if (refreshRed?.accessToken) {
        localStorage.setItem('access_token', refreshRed.accessToken);
      }
    }
    if (router.pathname.includes('login')) router.replace('/products');
  };

  useEffect(() => {
    handleRefresh();

    // setUser(null);
    // router.push('/login');
  }, []);

  const login = (accessToken, userData) => {
    setUser(userData);
    localStorage.setItem('access_token', accessToken);
  };

  const logout = () => {
    // Perform logout logic (e.g., clear user data and token)
    // Update the user state when the user logs out
    // Example:
    // localStorage.removeItem('authToken');
    // setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
