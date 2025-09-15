import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ setShowLoginModal }) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setShowLoginModal(true);
    }
  }, [user, setShowLoginModal]);
  return user ? <Outlet /> : null;
}

export default ProtectedRoute;
