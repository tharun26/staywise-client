import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, CalendarCheck, Heart, User } from "lucide-react";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <aside className="w-64 h-screen bg-white border-r px-4 py-6">
      <h1 className="text-xl font-semibold mb-8 text-blue-600 cursor-pointer select-none">
        StayWise
      </h1>
      <nav className="space-y-6">
        <div
          onClick={() => navigate("/")}
          className={`flex items-center gap-3 font-semibold text-lg cursor-pointer ${
            isActive("/") ? "text-blue-600" : "text-gray-700"
          }`}
        >
          <Home className="w-6 h-6" />
          Home
        </div>
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
            isActive("/user/favorites") ? "text-blue-600" : "text-gray-700"
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
      </nav>
    </aside>
  );
};

export default SideBar;
