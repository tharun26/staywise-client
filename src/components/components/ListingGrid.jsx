import { fetchListings } from "@/hooks/useListing";
import { useQuery } from "@tanstack/react-query";
import ListingCard from "./ListingCard";
import { getFavourites } from "@/hooks/useUser";

const ListingGrid = () => {
  const { data: listings } = useQuery({
    queryKey: ["listing"],
    queryFn: fetchListings,
  });

  const { data: favouritesList } = useQuery({
    queryKey: ["userData"],
    queryFn: getFavourites,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings &&
        favouritesList &&
        listings.map((listing) => {
          return (
           
            <ListingCard
              listing={listing}
              key={listing._id}
              isFav={favouritesList.includes(listing._id)}
            />
           
          );
        })}
    </div>
  );
};

export default ListingGrid;
