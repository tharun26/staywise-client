import React from "react";
import { useNavigate } from "react-router-dom";

function ListingCard({ listing }) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/listing/${listing._id}`);
  };
  return (
    <div
      className="w-full max-w-xs bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
      onClick={handleOnClick}
    >
      <div className="w-full h-[225px] bg-gray-200 flex items-center justify-center">
        <img
          src={listing.photos[0]}
          className="w-full h-full object-cover"
          alt={listing.title}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold truncate" title={listing.title}>
          {listing.title}
        </h3>
        <div className="mt-2 text-gray-800 font-medium">
          €{listing.pricePerNight} per Night
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
