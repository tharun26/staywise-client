import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function LoginModal({ open, onOpenChange }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { signup } = useContext(AuthContext);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      await signup(userData);
      onOpenChange(false);
      toast.success("SignUp Successful", {
        description: "Welcome!",
        duration: 3000,
      });
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Login to Your Account</DialogTitle>
          <DialogDescription>
            Enter your credentials or login with Google
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            name="email"
            placeholder="Email"
            type="text"
            value={userData.email}
            onChange={handleOnchange}
            required
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={userData.password}
            onChange={handleOnchange}
            required
          />

          <Input
            name="name"
            placeholder="username"
            type="text"
            value={userData.name}
            onChange={handleOnchange}
            required
          />

          <Button className="w-full" variant="outline" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
