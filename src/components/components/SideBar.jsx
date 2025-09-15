import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, CalendarCheck, Heart, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import HostSideBar from "./HostSideBar";
import { AuthContext } from "@/context/AuthContext";

const SideBar = () => {
  const [isHost, setIsHost] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  if (isHost) {
    return <HostSideBar isHost={isHost} setIsHost={setIsHost} />;
  }

  return (
    <aside className="w-64 h-screen bg-white border-r px-4 py-6 flex flex-col relative">
      <div className="flex items-center mb-8">
        <img
          src="/staywise_favicon.png"
          alt="StayWise Logo"
          className="h-10 w-10 mr-3 rounded-full"
          style={{ minWidth: "2.5rem" }}
        />
        <h1 className="text-xl font-semibold text-blue-600 cursor-pointer select-none">
          StayWise
        </h1>
      </div>
      <nav className="flex flex-col flex-1 justify-between">
        <div className="space-y-6">
          <div
            onClick={() => navigate("/")}
            className={`flex items-center gap-3 font-semibold text-lg cursor-pointer ${
              isActive("/") ? "text-blue-600" : "text-gray-700"
            }`}
          >
            <Home className="w-6 h-6" />
            Home
          </div>
          {user && (
            <>
              <div
                onClick={() => navigate("/myBookings")}
                className={`flex items-center gap-3 font-semibold text-lg cursor-pointer ${
                  isActive("/myBookings") ? "text-blue-600" : "text-gray-700"
                }`}
              >
                <CalendarCheck className="w-6 h-6" />
                My Bookings
              </div>
              <div
                className={`flex items-center gap-3 font-semibold text-lg cursor-pointer ${
                  isActive("/user/favorites")
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => navigate("/user/favorites")}
              >
                <Heart className="w-6 h-6" />
                My Favourites
              </div>
              <div
                className={`flex items-center gap-3 font-semibold text-lg cursor-pointer ${
                  isActive("/user") ? "text-blue-600" : "text-gray-700"
                }`}
                onClick={() => navigate("/user")}
              >
                <User className="w-6 h-6 " />
                User Profile
              </div>
            </>
          )}
        </div>
      </nav>
      <div className="fixed bottom-8 left-0 w-64 flex justify-center z-50">
        <div className="flex items-center gap-3 font-semibold text-lg bg-white border rounded-lg px-4 py-2 shadow">
          <span className="mr-2">Guest</span>
          <Switch
            checked={isHost}
            onCheckedChange={setIsHost}
            className="data-[state=checked]:bg-blue-600"
          />
          <span className="ml-2">Host</span>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
