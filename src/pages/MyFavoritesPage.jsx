import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/hooks/useUser";
import { fetchListingByIds } from "@/hooks/useListing";
import ListingCard from "@/components/components/ListingCard";

function MyFavoritesPage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: () => fetchUser(),
  });

  const favorites = user?.favorites || [];

  // Fetch favorite listings only when favorites are available
  const { data: favoriteListings = [], isLoading: favLoading } = useQuery({
    queryKey: ["favoriteListings", favorites],
    queryFn: () => fetchListingByIds(favorites),
    enabled: favorites.length > 0,
  });

  if (isLoading || favLoading) {
    return <p className="flex justify-center items-center">Loading...</p>;
  }

  return favoriteListings && favoriteListings.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6 ml-4">
      {favoriteListings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} isFav={true} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-64 text-xl text-gray-500 my-[20%]">
      You have no Favorite Listing!!!
    </div>
  );
}

export default MyFavoritesPage;
