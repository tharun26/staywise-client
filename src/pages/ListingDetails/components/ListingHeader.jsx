import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function ListingHeader() {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <h1 className="text-xl font-bold text-blue-600">StayWise</h1>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back to Listings
        </Button>
        <Button>Sign In</Button>
      </div>
    </header>
  );
}

export default ListingHeader;
