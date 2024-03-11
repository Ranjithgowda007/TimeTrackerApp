import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });
  

  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', true);
    toast.success("Logged In successfully");
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    toast.warning("You have been logged out");
  };

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
