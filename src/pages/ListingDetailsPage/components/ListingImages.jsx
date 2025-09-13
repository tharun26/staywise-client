import React from "react";

const ListingImages = ({ photos, title }) => (
  <div>
    <div className="rounded-xl overflow-hidden">
      <img
        src={photos[0]}
        alt={title}
        className="w-full h-[400px] object-cover"
      />
    </div>
  </div>
);

export default ListingImages;
