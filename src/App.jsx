import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage/HomePage";
import SideBar from "@/components/components/SideBar";
import LoginModal from "./components/components/LoginModal";
import SignupModal from "./components/components/SignupModal";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import MyFavoritesPage from "./pages/MyFavoritesPage";
import ListingDetailsPage from "./pages/ListingDetailsPage/ListingDetailsPage";
import MyBookingsPage from "./pages/MyBookingsPage/MyBookingsPage";
import HostListingsPage from "./pages/HostListingsPage/HostListingsPage";
import HostBookingPage from "./pages/HostBookingPage/HostBookingPage";
import CreateListing from "./pages/HostListingsPage/CreateListing";
import EditListing from "./pages/HostListingsPage/EditListing";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
          <SignupModal
            open={showSignupModal}
            onOpenChange={setShowSignupModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  setShowLoginModal={setShowLoginModal}
                  setShowSignupModal={setShowSignupModal}
                />
              }
            />
            <Route
              path="/listing/:listingid"
              element={<ListingDetailsPage />}
            />
            <Route path="/user/favorites" element={<MyFavoritesPage />} />
            <Route path="/user" element={<UserProfilePage />} />
            <Route path="/myBookings" element={<MyBookingsPage />} />
            <Route path="/host/myListings" element={<HostListingsPage />} />
            <Route path="/host/myBookings" element={<HostBookingPage />} />
            <Route path="/createListing" element={<CreateListing />} />
            <Route path="/edit/:listingId" element={<EditListing />} />
          </Routes>
          <Toaster position="top-center" />
        </div>
      </div>
    </>
  );
}

export default App;
