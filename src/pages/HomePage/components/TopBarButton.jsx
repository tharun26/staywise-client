import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

function TopBarButton({ setShowLoginModal, setShowSignupModal }) {
  const { user, logout } = useContext(AuthContext);

  const onLogin = () => {
    setShowLoginModal(true);
  };
  const onSignup = () => {
    setShowSignupModal(true);
  };

  const onLogout = () => {
    logout();
  };
  return user == "" ? (
    <div className="flex gap-2">
      <Button
        onClick={onLogin}
        variant="default"
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Login
      </Button>
      <Button
        onClick={onSignup}
        variant="default"
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Sign Up
      </Button>
    </div>
  ) : (
    <Button
      onClick={onLogout}
      variant="default"
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      Logout
    </Button>
  );
}

export default TopBarButton;
