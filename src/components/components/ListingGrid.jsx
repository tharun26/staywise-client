import { fetchListings } from "@/hooks/useListing";
import { useQuery } from "@tanstack/react-query";
import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";

const ListingGrid = () => {
  const { data: listings } = useQuery({
    queryKey: ["listing"],
    queryFn: fetchListings,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings &&
        listings.map((listing) => (
          // <div className="bg-white rounded-lg shadow hover:shadow-md transition">
          <ListingCard listing={listing} key={listing._id} />
          // </div>
        ))}
    </div>
  );
};

export default ListingGrid;
