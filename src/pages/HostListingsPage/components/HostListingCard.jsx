import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { deleteListingsHost } from "@/hooks/useListing";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function HostListingCard({ listing }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteAListing = useMutation({
    mutationFn: (listingid) => deleteListingsHost(listingid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hostlisting"] });
    },
  });

  const handleDelete = () => {
    deleteAListing.mutate(listing._id);
  };

  const handleEdit = () => {
    navigate(`/edit/${listing._id}`);
  };

  return (
    <Card className="flex flex-row items-center justify-between p-8 rounded-3xl shadow-sm border border-gray-200 bg-white max-w-7xl w-full mb-4 mx-5">
      <div className="flex items-center gap-8 flex-1 min-w-0">
        <div className="w-40 h-32 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
          <img
            src={listing.photos?.[0]}
            className="w-full h-full object-cover"
            alt={listing.title}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="font-semibold truncate mb-2" title={listing.title}>
            {listing.title}
          </h3>
          <div className="text-gray-800 font-medium">
            €{listing.pricePerNight} per Night
          </div>
          <div className="text-gray-500 text-sm  max-w-xs">
            {listing.address && typeof listing.address === "object"
              ? [
                  listing.address.line1,
                  listing.address.line2,
                  listing.address.city,
                  listing.address.state,
                  listing.address.country,
                  listing.address.postalCode,
                ]
                  .filter(Boolean)
                  .join(", ")
              : listing.address}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-4 min-w-[120px] ml-8 self-stretch justify-center">
        <Button
          variant="secondary"
          size="sm"
          className="w-20"
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="w-20"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}
