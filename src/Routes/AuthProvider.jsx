import React, { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const handleLogin = () => {
    setToken(null);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
