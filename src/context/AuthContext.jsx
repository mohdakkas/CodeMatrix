import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const getStoredUser = () => {
  const rawUser = localStorage.getItem("codeforgeUser");
  return rawUser ? JSON.parse(rawUser) : null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const saveSession = (authResponse) => {
    localStorage.setItem("codeforgeToken", authResponse.token);
    localStorage.setItem("codeforgeUser", JSON.stringify(authResponse.user));
    setUser(authResponse.user);
  };

  const logout = () => {
    localStorage.removeItem("codeforgeToken");
    localStorage.removeItem("codeforgeUser");
    setUser(null);
  };

  const value = useMemo(() => ({ user, saveSession, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
