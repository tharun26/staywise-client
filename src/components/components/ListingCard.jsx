import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFavourite, removeFavourite } from "@/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Heart, VenetianMask } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

function ListingCard({ listing, isFav }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(isFav);
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const MakeAListingFavourite = useMutation({
    mutationFn: () => addFavourite(listing._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

  const removeAListingFromFavourite = useMutation({
    mutationFn: () => removeFavourite(listing._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

  const handleOnClick = () => {
    navigate(`/listing/${listing._id}`);
  };

  const handleFavouriteClick = (e) => {
    e.stopPropagation();
    if (!liked) {
      MakeAListingFavourite.mutate(listing.listingid);
    }
    if (liked) {
      removeAListingFromFavourite.mutate(listing.listingid);
    }
    setLiked((prev) => !prev);
  };

  return (
    <div
      className="w-full max-w-xs bg-white rounded-lg shadow-sm overflow-hidden flex flex-col relative"
      onClick={handleOnClick}
    >
      <div className="w-full h-[225px] bg-gray-200 flex items-center justify-center relative">
        <img
          src={listing.photos[0]}
          className="w-full h-full object-cover"
          alt={listing.title}
        />
        {user && (
          <button
            className="absolute top-3 right-3 bg-white/80 rounded-full p-1 hover:bg-white shadow"
            onClick={handleFavouriteClick}
          >
            <Heart
              size={28}
              fill={liked ? "#ef4444" : "none"}
              color={liked ? "#ef4444" : "#374151"}
            />
          </button>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold truncate" title={listing.title}>
          {listing.title}
        </h3>
        <div className="flex justify-between items-center">
          <div className="text-gray-800 font-medium flex items-center">
            €{listing.pricePerNight} per Night
          </div>
          <div title="Guests Allowed" className="flex gap-2 items-center">
            <VenetianMask color="#d7bf1d" />
            <span>{listing.maxGuests}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
