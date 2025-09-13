import React from "react";

function ListingDescription({ listing }) {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 px-6 py-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">About this space</h2>
      <p className="text-gray-900 text-base leading-relaxed">
        {listing.description}
      </p>
    </div>
  );
}

export default ListingDescription;
