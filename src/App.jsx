import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import ListingDetailsPage from "./pages/ListingDetails/ListingDetailsPage";
import SideBar from "@/components/components/SideBar";

import LoginModal from "./components/components/LoginModal";
import SignupModal from "./components/components/SignupModal";
import UserProfilePage from "./pages/UserProfilePage";
import MyFavoritesPage from "./pages/MyFavoritesPage";

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
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
