import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/hooks/useUser";
import { fetchListings } from "@/hooks/useListing";
import ListingCard from "@/components/components/ListingCard";

function MyFavoritesPage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: () => fetchUser(),
  });

  const { data: listings } = useQuery({
    queryKey: ["listing"],
    queryFn: fetchListings,
  });

  const favorites = user?.favorites || [];

  const favoriteListings =
    listings?.filter((listing) => favorites.includes(listing._id)) || [];

  if (isLoading) {
    return <p className="flex justify-center items-center">Loading...</p>;
  }

  return favoriteListings && favoriteListings.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6 ml-4">
      {favoriteListings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} isFav={true} />
      ))}
    </div>
  ) : (
    <div className="font-bold flex justify-center items-center my-[30%]">
      You have no Favorite Listing!!!
    </div>
  );
}

export default MyFavoritesPage;
