import { fetchListingsHost } from "@/hooks/useListing";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import HostListingCard from "./components/HostListingCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ListingGrid = () => {
  const navigate = useNavigate();

  const {
    data: listings,
    isLoading: listingsLoading,
    isError: listingsError,
  } = useQuery({
    queryKey: ["hostlisting"],
    queryFn: () => fetchListingsHost(),
  });

  const handleCreateListing = (e) => {
    e.stopPropagation();
    navigate("/createListing");
  };

  if (listingsLoading) {
    return <div>Loading data.</div>;
  }

  if (listingsError) {
    return <div>Error loading data.</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-4 mt-20">
        <div className="flex justify-center mr-40">
          <Button
            variant="secondary"
            size="sm"
            className="w-48 flex items-center justify-center text-blue-600 border-2 border-blue-700 bg-white"
            onClick={handleCreateListing}
          >
            <Plus className="mr-2" size={20} />
            <span>Create New Listing</span>
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          {listings &&
            listings.map((listing) => {
              return <HostListingCard listing={listing} key={listing._id} />;
            })}
        </div>
      </div>
    </>
  );
};

export default ListingGrid;
