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
    return (
      <div className="flex justify-center items-center h-64 text-xl text-gray-500 my-[20%]">
        Kindly Login to view your Listing
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6 py-8 bg-slate-50 min-h-screen">
        <Button
          variant="secondary"
          size="sm"
          className="w-48 flex items-center justify-center text-blue-600 border-2 border-blue-700 bg-white"
          onClick={handleCreateListing}
        >
          <Plus className="mr-2" size={20} />
          <span>Create New Listing</span>
        </Button>

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
