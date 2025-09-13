import { useParams } from "react-router-dom";
import { fetchListing } from "@/hooks/useListing";
import { useQuery } from "@tanstack/react-query";
import ListingImages from "./components/ListingImages";
import ListingInfo from "./components/ListingInfo";
import Reviews from "./components/Reviews";
import ListingDescription from "./components/ListingDescription";
import ListingAmenities from "./components/ListingAmenities";
import ListingAddress from "./components/ListingAddress";

function ListingDetailsPage() {
  const { listingid } = useParams();
  const { data: listing, isLoading } = useQuery({
    queryKey: ["listing", listingid],
    queryFn: () => fetchListing(listingid),
  });

  if (isLoading) {
    return <div>Loading!!!</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {listing.photos && (
              <ListingImages photos={listing.photos} title={listing.title} />
            )}

            {listing.description && <ListingDescription listing={listing} />}

            {listing.amenities && listing.amenities.length > 0 && (
              <ListingAmenities listing={listing} />
            )}
            {listing.address && <ListingAddress listing={listing} />}
            <Reviews listingid={listingid} />
          </div>

          <div className="lg:col-span-1 min-w-[380px]">
            <ListingInfo listing={listing} listingid={listingid} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ListingDetailsPage;
