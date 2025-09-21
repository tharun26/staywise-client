import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await verify();
      setLoading(false);
    };
    checkAuth();
  }, []);

  const signup = async (userData) => {
    try {
      await api.post("/signup", userData);
      toast.success("Sign-up Successful", {
        description: "You have Signed-Up Successfully",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (userData) => {
    try {
      const response = await api.post("/login", userData);
      localStorage.setItem("authToken", response.data.authToken);
      setUser(response.data.user);
      toast.success("Log-in Successful", {
        description: "You have Logged-in Successfully",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const verify = async () => {
    try {
      const response = await api.post("/verify");
      setUser(response.data);
    } catch (error) {
      setUser("");
      console.log(error);
    }
  };

  return { user, signup, login, verify, setUser, loading };
};
