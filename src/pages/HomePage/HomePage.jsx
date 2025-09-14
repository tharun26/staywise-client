import ListingGrid from "./components/ListingGrid";
import React from "react";
import TopBar from "./components/TopBar";

function HomePage({ setShowLoginModal, setShowSignupModal }) {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <TopBar
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
      />
      <ListingGrid />
    </main>
  );
}

export default HomePage;
