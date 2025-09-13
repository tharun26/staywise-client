import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

export const AuthContext = createContext(null);
function AuthContextProvider({ children }) {
  const { user, signup, login, verify, setUser } = useAuth();

  const logout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged-Out Successfully");
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
