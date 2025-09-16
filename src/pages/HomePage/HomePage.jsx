import ListingGrid from "./components/ListingGrid";
import { useState } from "react";
import React from "react";
import TopBar from "./components/TopBar";

function HomePage({ setShowLoginModal, setShowSignupModal }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <TopBar
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <ListingGrid searchValue={searchValue} />
    </main>
  );
}

export default HomePage;
