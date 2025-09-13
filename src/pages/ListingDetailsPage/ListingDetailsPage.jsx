import { useParams } from "react-router-dom";
import { fetchListing } from "@/hooks/useListing";
import { useQuery } from "@tanstack/react-query";
import ListingImages from "./components/ListingImages";
import ListingInfo from "./components/ListingInfo";
import ListingMap from "./ListingMap";
import Reviews from "./components/Reviews";

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
            <ListingImages photos={listing.photos} title={listing.title} />
            {listing.description && (
              <div className="bg-white rounded-2xl border border-blue-100 px-6 py-5 shadow-sm">
                <h2 className="text-lg font-semibold mb-2">About this space</h2>
                <p className="text-gray-900 text-base leading-relaxed">
                  {listing.description}
                </p>
              </div>
            )}

            {listing.amenities && listing.amenities.length > 0 && (
              <div className="bg-white rounded-2xl border border-blue-100 px-6 py-5 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.slice(0, 15).map((am) => (
                    <span
                      key={am}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {am}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Location Section */}
            {listing.address && (
              <div className="bg-white rounded-2xl border border-blue-100 px-6 py-5 shadow-sm flex flex-col lg:flex-row gap-6 items-stretch">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold mb-2">Location</h2>
                  <div className="text-xl font-normal mb-4">
                    {listing.address.line1}
                    {listing.address.line2 ? `, ${listing.address.line2}` : ""}
                    {listing.address.city ? `, ${listing.address.city}` : ""}
                    {listing.address.state ? `, ${listing.address.state}` : ""}
                    {listing.address.postalCode
                      ? `, ${listing.address.postalCode}`
                      : ""}
                    {listing.address.country
                      ? `, ${listing.address.country}`
                      : ""}
                  </div>
                  <div className="flex flex-wrap gap-4 mb-2">
                    {listing.address.neighborhood && (
                      <span className="bg-blue-50 text-blue-500 px-5 py-2 rounded-full text-base font-medium">
                        Neighborhood: {listing.address.neighborhood}
                      </span>
                    )}
                    {listing.address.transit && (
                      <span className="bg-blue-50 text-blue-500 px-5 py-2 rounded-full text-base font-medium">
                        Transit: {listing.address.transit}
                      </span>
                    )}
                  </div>
                </div>
                {listing.address.location &&
                  Array.isArray(listing.address.location.coordinates) &&
                  listing.address.location.coordinates.length === 2 && (
                    <div className="flex-shrink-0 w-full lg:w-[400px] h-[250px] rounded-2xl overflow-hidden bg-blue-50 flex items-center justify-center">
                      <ListingMap
                        lat={listing.address.location.coordinates[1]}
                        lng={listing.address.location.coordinates[0]}
                      />
                    </div>
                  )}
              </div>
            )}

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
