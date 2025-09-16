import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

export const AuthContext = createContext(null);
function AuthContextProvider({ children }) {
  const { user, signup, login, verify, setUser, loading } = useAuth();

  const logout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged-Out Successfully", {
      description: "You are now Logged Out",
      duration: 3000,
    });
    setUser("");
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, verify, logout, setUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
