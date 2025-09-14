import { fetchListings } from "@/hooks/useListing";
import { useQuery } from "@tanstack/react-query";
import ListingCard from "../../../components/components/ListingCard";
import { getFavourites } from "@/hooks/useUser";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

const ListingGrid = () => {
  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 12;
  const { user } = useContext(AuthContext);

  const {
    data: listingsData,
    isLoading: listingsLoading,
    isError: listingsError,
  } = useQuery({
    queryKey: ["listing", page, limit],
    queryFn: () => fetchListings({ page, limit }),
    keepPreviousData: true,
  });

  const {
    data: favoritesList,
    isLoading: favoritesListLoading,
    isError: favoritesListError,
  } = useQuery({
    queryKey: ["favoritesList"],
    queryFn: getFavourites,
    enabled: !!user,
  });

  if (listingsLoading || favoritesListLoading) {
    return <div>Loading...</div>;
  }

  if (listingsError || favoritesListError) {
    return <div>Error loading data.</div>;
  }

  // listingsData: { data, total, page, limit, totalPages }
  const { data: listings = [], totalPages = 1 } = listingsData || {};

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings &&
          listings.map((listing) => {
            const isFav = favoritesList
              ? favoritesList.includes(listing._id)
              : false;
            return (
              <ListingCard listing={listing} key={listing._id} isFav={isFav} />
            );
          })}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ListingGrid;
