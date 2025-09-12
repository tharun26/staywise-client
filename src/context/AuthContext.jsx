import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext(null);
function AuthContextProvider({ children }) {
  const { user, signup, login, verify, setUser } = useAuth();

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser("");
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, verify, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
