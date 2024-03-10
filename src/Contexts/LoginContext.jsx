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

  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');

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
