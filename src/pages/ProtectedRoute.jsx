import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ setShowLoginModal }) {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      setShowLoginModal(false);
    } else {
      setShowLoginModal(true);
    }
  }, [user, setShowLoginModal, loading]);
  return user ? <Outlet /> : null;
}

export default ProtectedRoute;
