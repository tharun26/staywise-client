import ListingMap from "./ListingMap";

function ListingAddress({ listing }) {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 px-6 py-5 shadow-sm flex flex-col lg:flex-row gap-6 items-stretch">
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold mb-2">Location</h2>
        <div className="text-xl font-normal mb-4">
          {listing.address.line1}
          {listing.address.line2 ? `, ${listing.address.line2}` : ""}
          {listing.address.city ? `, ${listing.address.city}` : ""}
          {listing.address.state ? `, ${listing.address.state}` : ""}
          {listing.address.postalCode ? `, ${listing.address.postalCode}` : ""}
          {listing.address.country ? `, ${listing.address.country}` : ""}
        </div>
      </div>
      {listing.address.location &&
        listing.address.location.coordinates &&
        listing.address.location.coordinates.length === 2 && (
          <div className="flex-shrink-0 w-full lg:w-[400px] h-[250px] rounded-2xl overflow-hidden bg-blue-50 flex items-center justify-center">
            <ListingMap
              lat={listing.address.location.coordinates[1]}
              lng={listing.address.location.coordinates[0]}
            />
          </div>
        )}
    </div>
  );
}

export default ListingAddress;
