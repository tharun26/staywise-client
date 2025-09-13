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
    {/* <div className="flex gap-3 mt-4">
      {photos.map((photo, idx) => (
        <div
          key={idx}
          className="w-28 h-20 rounded-lg overflow-hidden bg-gray-200"
        >
          <img
            src={photo}
            alt="Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div> */}
  </div>
);

export default ListingImages;
