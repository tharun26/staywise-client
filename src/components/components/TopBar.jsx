import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TopBarButton from "./TopBarButton";

const TopBar = ({ setShowLoginModal, setShowSignupModal }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const handleCityClick = (city) => {
    setSearchValue(city);
  };
  return (
    <div className="flex items-center justify-between w-full mb-6 my-5 px-6">
      <div className="flex-1 flex justify-center">
        <div
          className="flex items-center bg-white rounded-xl shadow-sm px-2 py-1 gap-2 border border-gray-200"
          style={{ minWidth: 480 }}
        >
          <Input
            placeholder="Search city or country"
            className="w-[340px] focus:ring-0 border-0 shadow-none text-base"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ background: "transparent" }}
          />
          <Button variant="outline" onClick={() => handleCityClick("New York")}>
            New York
          </Button>
          <Button variant="outline" onClick={() => handleCityClick("Tokyo")}>
            Tokyo
          </Button>
          <Button variant="outline" onClick={() => handleCityClick("Italy")}>
            Italy
          </Button>
        </div>
      </div>
      <div className="flex-shrink-0">
        <TopBarButton
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
        />
      </div>
    </div>
  );
};

export default TopBar;
