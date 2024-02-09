// AuthContext.js
import { useRefreshToken } from '@/hooks';
import { paths } from '@/paths';
import { onAuthStateChanged } from '@firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';

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
  const nextRouter = useRouter();

  const handleRefresh = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // nextRouter.push(paths.home);
        nextRouter.push(paths.index);
        const uid = user.uid;
        // ...
      } else {
        setUser(null);
        nextRouter.push(paths.login);
        // User is signed out
        // ...
      }
    });
  };

  useEffect(() => {
    handleRefresh();
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
